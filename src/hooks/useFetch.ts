// src/hooks/useFetch.ts
'use client';

import { useState, useEffect } from 'react'; // Removed unused useCallback

// Define loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Define a generic interface for API responses
interface ApiResponse<T> {
  success: boolean;
  data?: T; // Data is optional and generic
  message?: string; // Optional error/status message
}

// Generic hook for data fetching with loading states
// The hook itself is generic over the expected data type T
export function useFetch<T>(url: string | null, options?: RequestInit) { // Allow URL to be null to prevent fetching initially
  console.log('[useFetch] Hook initialized/re-rendered. URL:', url);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<LoadingState>('idle');

  // Memoize options using JSON.stringify to handle object changes
  const memoizedOptions = JSON.stringify(options);

  useEffect(() => {
    console.log('[useFetch] useEffect triggered. URL:', url); // Log effect run

    // Function to perform the fetch
    const fetchData = async () => {
      console.log('[useFetch] fetchData started. URL:', url);

      // Don't fetch if URL is null or empty
      if (!url) {
        console.log('[useFetch] URL is null, setting status to idle.');
        setStatus('idle');
        setData(null); // Ensure data is cleared if URL becomes null
        setError(null);
        return;
      }

      // Reset state for new fetch
      console.log('[useFetch] Resetting state and setting status to loading.');
      setStatus('loading');
      setData(null);
      setError(null);

      try {
        const currentOptions = JSON.parse(memoizedOptions || '{}'); // Parse memoized options
        console.log('[useFetch] Attempting fetch. URL:', url, 'Options:', currentOptions);
        const response = await fetch(url, {
          ...currentOptions,
          // --- FIX: Correct type for credentials ---
          credentials: 'include' as RequestCredentials, // Cast to the specific type
          // --- End FIX ---
        });
        console.log('[useFetch] Fetch completed. URL:', url, 'Status:', response.status);

        // Try parsing the body regardless of status first to get potential error messages
        let result: ApiResponse<T>;
        try {
          console.log('[useFetch] Attempting response.json(). URL:', url);
          result = await response.json() as ApiResponse<T>;
          console.log('[useFetch] response.json() successful. URL:', url, 'Result:', result);
        } catch (jsonError) {
          console.error('[useFetch] response.json() FAILED. URL:', url, 'Error:', jsonError);
          // Handle cases where response is not JSON
          throw new Error(`Request failed with status ${response.status} and non-JSON response.`);
        }

        if (!response.ok) {
          // Use message from parsed body if available, otherwise use status text
          const errorMessage = result?.message || response.statusText || `HTTP error! Status: ${response.status}`;
          console.warn('[useFetch] Response not OK. Status:', response.status, 'URL:', url, 'Throwing error:', errorMessage);
          throw new Error(errorMessage);
        }

        // Process successful response
        console.log('[useFetch] Response OK. Checking result.success. URL:', url);
        if (result.success) {
          console.log('[useFetch] result.success is true. URL:', url);
          if (result.data !== undefined) {
            console.log('[useFetch] Setting data and status=success. URL:', url, 'Data:', result.data);
            setData(result.data);
            setStatus('success');
          } else {
            // Success reported, but no data (could be valid)
            setData(null);
            setStatus('success');
            console.warn(`[useFetch] Fetch successful (result.success=true) but result.data is undefined. Setting data=null, status=success. URL: ${url}`);
          }
        } else {
          // API reported success: false
          const apiErrorMessage = result.message || 'API returned success: false';
          console.warn('[useFetch] result.success is false. URL:', url, 'Throwing error:', apiErrorMessage);
          throw new Error(apiErrorMessage);
        }
      } catch (err) {
        console.error(`[useFetch] CATCH block error for URL ${url}:`, err);
        console.log('[useFetch] Setting error state and status=error. URL:', url);
        setError(err instanceof Error ? err : new Error('Unknown fetch error occurred'));
        setStatus('error');
      }
    };

    fetchData();

    // No AbortController added here as requested

  }, [url, memoizedOptions]); // Depend on URL and memoized options

  console.log('[useFetch] Returning state. URL:', url, 'Status:', status);
  return { data, error, status, isLoading: status === 'loading' };
}


// Hook for submitting data with loading states
// T = Type of data being submitted (formData)
// R = Type of data expected in the response
export function useSubmit<T, R>(url: string) {
  console.log('[useSubmit] Hook initialized/re-rendered. URL:', url);
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<LoadingState>('idle');

  const submit = async (formData: T, method: 'POST' | 'PUT' | 'DELETE' = 'POST') => {
    console.log('[useSubmit] submit function called. URL:', url, 'Method:', method);
    console.log('[useSubmit] Resetting state and setting status=loading.');
    setStatus('loading');
    setData(null); // Reset previous data/error on new submission
    setError(null);

    try {
      const fetchOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Good practice to include Accept header
        },
        body: JSON.stringify(formData),
        // --- FIX: Correct type for credentials ---
        credentials: 'include' as RequestCredentials, // Cast to the specific type
        // --- End FIX ---
      };
      console.log('[useSubmit] Attempting fetch. URL:', url, 'Options:', fetchOptions);
      const response = await fetch(url, fetchOptions);
      console.log('[useSubmit] Fetch completed. URL:', url, 'Status:', response.status);

      // Declare result with the expected successful structure
      let result: ApiResponse<R>;

      try {
        console.log('[useSubmit] Attempting response.json(). URL:', url);
        result = await response.json() as ApiResponse<R>; // Assert the expected type
        console.log('[useSubmit] response.json() successful. URL:', url, 'Result:', result);
      } catch (jsonError) {
        console.error("[useSubmit] response.json() FAILED. URL:", url, "Error:", jsonError);
        // If parsing fails, throw an error immediately.
        throw new Error(`Request failed with status ${response.status} and non-JSON response.`);
      }

      // Check response.ok and result properties
      console.log('[useSubmit] Checking response.ok and result.success. URL:', url);
      if (response.ok && result.success) {
        console.log('[useSubmit] Response OK and result.success is true. URL:', url);
        // Handle success cases
        if (result.data !== undefined) {
          console.log('[useSubmit] Setting data and status=success. URL:', url, 'Data:', result.data);
          setData(result.data); // Set the data of type R
          setStatus('success');
          return { success: true, data: result.data };
        } else {
          // Handle success with no data returned
          setData(null);
          setStatus('success');
          console.warn(`[useSubmit] Submit successful (result.success=true) but result.data is undefined. Setting data=null, status=success. URL: ${url}`);
          return { success: true, data: null };
        }
      } else {
        // Handle API error (response.ok might be true but result.success false, or response.ok false)
        const errorMessage = result.message || `API Error: Status ${response.status}, Success Flag: ${result.success}`;
        console.warn('[useSubmit] Response NOT OK or result.success is false. URL:', url, 'Throwing error:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('[useSubmit] CATCH block error. URL:', url, 'Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown submit error occurred';
      console.log('[useSubmit] Setting error state and status=error. URL:', url);
      setError(new Error(errorMessage));
      setStatus('error');
      return { success: false, error: errorMessage };
    }
  };

  const reset = () => {
    console.log('[useSubmit] reset function called.');
    setData(null);
    setError(null);
    setStatus('idle');
  };

  console.log('[useSubmit] Returning state. URL:', url, 'Status:', status);
  return { submit, data, error, status, isLoading: status === 'loading', reset };
}