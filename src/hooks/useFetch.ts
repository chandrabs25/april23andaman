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
// T = Type of data expected in the RESPONSE
// R = Type of data being SUBMITTED (request payload)
export function useSubmit<T, R = any>(initialUrl: string) {
  console.log('[useSubmit] Hook initialized/re-rendered. Initial URL:', initialUrl);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<LoadingState>('idle');

  // Add overrideUrl parameter
  const submit = async (payload: R, method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'POST', overrideUrl?: string): Promise<{ success: boolean; data?: T | null; error?: string }> => {
    // --- FIX: Use overrideUrl if provided, else initialUrl ---
    const targetUrl = overrideUrl || initialUrl;
    // --- End FIX ---

    console.log('[useSubmit] submit function called. Target URL:', targetUrl, 'Method:', method);
    console.log('[useSubmit] Resetting state and setting status=loading.');
    setStatus('loading');
    setData(null);
    setError(null);

    if (!targetUrl) {
        console.error('[useSubmit] No URL provided (initial or override). Aborting submission.');
        setError(new Error('No URL specified for submission.'));
        setStatus('error');
        return { success: false, error: 'No URL specified for submission.' };
    }

    try {
      const fetchOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: method !== 'DELETE' ? JSON.stringify(payload) : undefined, // Payload is now just the data
        credentials: 'include' as RequestCredentials,
      };
      console.log('[useSubmit] Attempting fetch. URL:', targetUrl, 'Options:', fetchOptions);
      const response = await fetch(targetUrl, fetchOptions);
      console.log('[useSubmit] Fetch completed. URL:', targetUrl, 'Status:', response.status);

      // Declare result with the expected successful structure (using T for response data)
      let result: ApiResponse<T>;

      try {
        console.log('[useSubmit] Attempting response.json(). URL:', targetUrl);
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            console.log('[useSubmit] Received 204 No Content or empty body. Assuming success.');
            result = { success: true };
        } else {
            result = await response.json() as ApiResponse<T>; // Expect ApiResponse<T>
        }
        console.log('[useSubmit] response.json() successful or handled empty. URL:', targetUrl, 'Result:', result);
      } catch (jsonError) {
        console.error("[useSubmit] response.json() FAILED. URL:", targetUrl, "Error:", jsonError);
        throw new Error(`Request failed with status ${response.status} and non-JSON response.`);
      }

      console.log('[useSubmit] Checking response.ok and result.success. URL:', targetUrl);
      if (response.ok && (result.success === undefined || result.success === true)) {
        console.log('[useSubmit] Response OK and result.success is true/undefined. URL:', targetUrl);
        if (result.data !== undefined) {
          console.log('[useSubmit] Setting data and status=success. URL:', targetUrl, 'Data:', result.data);
          setData(result.data); // Set data with type T
          setStatus('success');
          return { success: true, data: result.data }; // Return data with type T
        } else {
          setData(null);
          setStatus('success');
          console.warn(`[useSubmit] Submit successful (result.success=true/undefined) but result.data is undefined. Setting data=null, status=success. URL: ${targetUrl}`);
          return { success: true, data: null };
        }
      } else {
        const errorMessage = result.message || `API Error: Status ${response.status}, Success Flag: ${result.success}`;
        console.warn('[useSubmit] Response NOT OK or result.success is false. URL:', targetUrl, 'Throwing error:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('[useSubmit] CATCH block error. URL:', targetUrl, 'Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown submit error occurred';
      console.log('[useSubmit] Setting error state and status=error. URL:', targetUrl);
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

  console.log('[useSubmit] Returning state. Initial URL:', initialUrl, 'Status:', status);
  return { submit, data, error, status, isLoading: status === 'loading', reset };
}