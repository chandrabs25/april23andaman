'use client';
export const dynamic = 'force-dynamic'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, Check, AlertTriangle, Loader2, Trash2, Edit, Power, PowerOff, Package } from 'lucide-react';
// --- FIX: Import useFetch and useSubmit ---
import { useFetch, useSubmit } from '@/hooks/useFetch';
// --- End FIX ---

// --- Interfaces ---
interface AvailabilitySlot { day: string; time: string; }
// --- FIX: Update Service interface to match API/DB (is_active is number from DB initially) ---
interface Service {
  id: number; name: string; description: string | null; type: string;
  provider_id: number; island_id: number; price: number;
  availability: string | null; // Raw JSON string from DB/API
  images: string | null; // Raw comma-separated string or single URL from DB/API
  amenities: string | null; cancellation_policy: string | null;
  is_active: number; // 0 or 1 from DB
  created_at: string;
  updated_at: string;
  // Derived/Client-side state:
  image_url?: string; // Derived: First image URL
  parsedAvailability?: AvailabilitySlot[]; // Derived: Parsed availability
  isActive: boolean; // Derived: Boolean representation of is_active
  bookings?: number; // Optional stats from API (if added later)
  rating?: number; // Optional stats from API (if added later)
}
// --- End FIX ---
interface ServiceFormData {
  name: string; description: string; price: string; image_url: string;
  availability: AvailabilitySlot[]; type: string;
  // --- FIX: Add island_id to form data ---
  island_id: string; // Assuming you'll add a dropdown/input for this
  // --- End FIX ---
}
interface FormErrors {
    name?: string; description?: string; price?: string;
    availability?: string; type?: string;
    // --- FIX: Add island_id error ---
    island_id?: string;
    // --- End FIX ---
    general?: string; // For API errors
}
// --- Add Island Interface ---
interface Island {
  id: number;
  name: string;
  // Add other relevant fields if needed
}
// --- Define Payload Types ---
interface ServiceSubmissionPayload {
    name: string;
    description: string;
    price: number;
    type: string;
    island_id: number | null;
    availability: AvailabilitySlot[];
    images: string | null;
    // Add other fields if they are part of the submission
}
interface ToggleStatusPayload {
    isActive: boolean;
}
// --- End Define Payload Types ---
// --- End Interfaces ---

// --- LoadingSpinner Component ---
const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
    <p className="text-gray-500">{text}</p>
  </div>
);

// --- Helper Functions ---
const getServiceStatusColor = (isActive: boolean): string => {
  return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
};

const tryParseJson = (jsonString: string | null, defaultValue: any = null): any => {
  // --- FIX: Check if string looks like JSON before parsing ---
  if (!jsonString || (typeof jsonString === 'string' && !jsonString.trim().startsWith('[') && !jsonString.trim().startsWith('{'))) {
    // If it's null, empty, or doesn't start with [ or {, return default
    return defaultValue;
  }
  // --- End FIX ---
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse JSON:", e, "Input:", jsonString); // Log input on error
    return defaultValue;
  }
};
// --- End Helper Functions ---


export default function VendorServiceManagement() {
  const [services, setServices] = useState<Service[]>([]);
  // --- FIX: Use useFetch for loading services ---
  const { data: fetchedServices, error: fetchErrorData, status: fetchStatus } = useFetch<Service[]>('/api/vendor/services');
  const isLoading = fetchStatus === 'loading' || fetchStatus === 'idle';
  const fetchError = fetchErrorData?.message || null;
  // --- End FIX ---

  // --- Fetch Islands ---
  const { data: islands, error: islandsError, status: islandsStatus } = useFetch<Island[]>('/api/islands');
  const isLoadingIslands = islandsStatus === 'loading' || islandsStatus === 'idle';
  // --- End Fetch Islands ---

  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  // --- FIX: Initialize island_id in formData ---
  const [formData, setFormData] = useState<ServiceFormData>({ name: '', description: '', price: '', image_url: '', availability: [], type: 'activity', island_id: '' });
  // --- End FIX ---
  const [errors, setErrors] = useState<FormErrors>({});
  // --- FIX: Use useSubmit for mutations ---
  // T = Response type, R = Request Payload type
  const { submit: submitService, status: submitStatus, error: submitError, reset: resetSubmit } =
    useSubmit<Service, ServiceSubmissionPayload>('/api/vendor/services'); // Initial URL for POST

  const { submit: deleteServiceSubmit, status: deleteStatus, error: deleteError, reset: resetDelete } =
    useSubmit<any, {}>(''); // No payload for DELETE, URL always overridden

  const { submit: toggleStatusSubmit, status: toggleStatus, error: toggleError, reset: resetToggle } =
    useSubmit<any, ToggleStatusPayload>(''); // Payload is { isActive }, URL always overridden

  const isSubmitting = submitStatus === 'loading';
  // --- End FIX ---
  const [successMessage, setSuccessMessage] = useState('');

  // --- FIX: useEffect to process fetched services ---
  useEffect(() => {
    if (fetchStatus === 'success' && fetchedServices) {
      const processedServices = fetchedServices.map(s => ({
        ...s,
        isActive: s.is_active === 1, // Convert DB 0/1 to boolean
        image_url: s.images?.split(',')[0]?.trim(),
        parsedAvailability: tryParseJson(s.availability, [])
      }));
      setServices(processedServices);
    }
  }, [fetchStatus, fetchedServices]);
  // --- End FIX ---

  // Form Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field if it exists
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAvailabilityChange = (day: string, timeSlot: string, isAvailable: boolean) => {
    setFormData(prev => {
      let newAvailability = [...prev.availability];
      
      if (isAvailable) {
        // Add the slot if it doesn't exist
        if (!newAvailability.some(slot => slot.day === day && slot.time === timeSlot)) {
          newAvailability.push({ day, time: timeSlot });
        }
      } else {
        // Remove the slot if it exists
        newAvailability = newAvailability.filter(
          slot => !(slot.day === day && slot.time === timeSlot)
        );
      }
      
      return { ...prev, availability: newAvailability };
    });
    
    // Clear availability error if it exists
    if (errors.availability) {
      setErrors(prev => ({ ...prev, availability: undefined }));
    }
  };

  const isTimeSlotAvailable = (day: string, timeSlot: string): boolean => {
    return formData.availability.some(
      slot => slot.day === day && slot.time === timeSlot
    );
  };

  // Edit/Add Handlers
  const handleEditService = (service: Service) => {
    // Prepare form data from service
    setFormData({
      name: service.name,
      description: service.description || '',
      price: service.price.toString(),
      image_url: service.image_url || '',
      type: service.type,
      availability: service.parsedAvailability || [],
      // --- FIX: Set island_id ---
      island_id: service.island_id.toString() // Assuming island_id exists
      // --- End FIX ---
    });
    setCurrentService(service);
    setIsEditing(true);
    setErrors({});
    setSuccessMessage('');
    resetSubmit(); // Reset any previous submit errors

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNewService = () => {
    // --- FIX: Reset island_id ---
    setFormData({ name: '', description: '', price: '', image_url: '', availability: [], type: 'activity', island_id: '' });
    // --- End FIX ---
    setCurrentService(null);
    setIsEditing(true);
    setErrors({});
    setSuccessMessage('');
    resetSubmit(); // Reset any previous submit errors
  };

  // --- Form Validation (FIXED return and added island_id) ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Service name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price.trim()) { newErrors.price = 'Price is required'; }
    else { const priceNum = parseFloat(formData.price); if (isNaN(priceNum) || priceNum <= 0) newErrors.price = 'Price must be a positive number'; }
    if (!formData.type.trim()) newErrors.type = 'Service type is required';
    // --- FIX: Validate island_id ---
    if (!formData.island_id.trim() || isNaN(parseInt(formData.island_id))) newErrors.island_id = 'Please select a valid island';
    // --- End FIX ---
    if (!Array.isArray(formData.availability) || formData.availability.length === 0) { newErrors.availability = 'Select at least one availability slot'; }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };
  // --- End Form Validation ---

  // --- Form Submission (Using useSubmit with overrideUrl) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSuccessMessage('');
    setErrors({});

    const priceNumber = parseFloat(formData.price);
    const islandIdNumber = parseInt(formData.island_id, 10);

    // Data to send to the API
    const submissionData: ServiceSubmissionPayload = { // Use the defined type
        name: formData.name,
        description: formData.description,
        price: isNaN(priceNumber) ? 0 : priceNumber,
        type: formData.type,
        island_id: isNaN(islandIdNumber) ? null : islandIdNumber,
        availability: formData.availability,
        images: formData.image_url || null,
    };

    console.log("Submitting Service Data:", submissionData);

    let result;
    if (currentService) { // Update (PUT)
      // --- FIX: Pass URL as third argument, remove from payload ---
      result = await submitService(submissionData, 'PUT', `/api/vendor/services/${currentService.id}`);
      // --- End FIX ---
    } else { // Add new (POST)
      // --- FIX: Pass payload only (uses initialUrl from hook) ---
      result = await submitService(submissionData, 'POST'); // No overrideUrl needed for POST
      // --- End FIX ---
    }

    if (result.success) {
      setSuccessMessage(currentService ? `Service "${formData.name}" updated successfully!` : `New service "${formData.name}" added successfully!`);
      setIsEditing(false);
      // --- FIX: Refetch or update local state ---
      const updatedServiceData = result.data;
      if (updatedServiceData) {
          const processedService = {
              ...updatedServiceData,
              isActive: updatedServiceData.is_active === 1,
              image_url: updatedServiceData.images?.split(',')[0]?.trim(),
              parsedAvailability: tryParseJson(updatedServiceData.availability, [])
          };
          if (currentService) {
              setServices(prev => prev.map(s => s.id === currentService.id ? processedService : s));
          } else {
              setServices(prev => [...prev, processedService]);
          }
      } else {
          console.warn("API success but no data returned for immediate state update.");
          // Consider adding a refetch mechanism here if the API doesn't return the created/updated object
      }
      // --- End FIX ---
    } else {
      setErrors({ general: result.error || 'An unknown error occurred during submission.' });
    }
  };
  // --- End Form Submission ---

  // Cancel Edit
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentService(null);
    setErrors({});
  };

  // --- Delete/Toggle Status (Using useSubmit with overrideUrl) ---
  const handleDeleteService = async (serviceId: number) => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      setSuccessMessage('');
      resetDelete();

      // --- FIX: Pass empty payload {} and URL as third argument ---
      const result = await deleteServiceSubmit({}, 'DELETE', `/api/vendor/services/${serviceId}`);
      // --- End FIX ---

      if (result.success) {
        setServices(prev => prev.filter(s => s.id !== serviceId));
        setSuccessMessage('Service deleted successfully');
      } else {
        alert(`Failed to delete service: ${result.error || 'Unknown error'}`);
      }
    }
  };

  const handleToggleServiceStatus = async (serviceId: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setSuccessMessage('');
    resetToggle();

    // --- FIX: Pass payload { isActive } and URL as third argument ---
    const payload: ToggleStatusPayload = { isActive: newStatus };
    const overrideUrl = `/api/vendor/services/${serviceId}/status`;

    console.log(`[handleToggleServiceStatus] Attempting PATCH request to: ${overrideUrl} with body:`, payload);

    const result = await toggleStatusSubmit(payload, 'PATCH', overrideUrl);
    // --- End FIX ---

    if (result.success) {
      setServices(prev =>
        prev.map(service =>
          service.id === serviceId
            ? { ...service, isActive: newStatus, is_active: newStatus ? 1 : 0 }
            : service
        )
      );
      setSuccessMessage(`Service status updated successfully`);
    } else {
      alert(`Failed to update service status: ${result.error || 'Unknown error'}`);
    }
  };
  // --- End Delete/Toggle Status ---

  // Constants for Availability Grid
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Manage Services</h1>
          <Link href="/vendor/dashboard" className="text-sm text-blue-600 hover:text-blue-800"> ← Back to Dashboard </Link>
        </div>

        {/* Messages */}
        {successMessage && ( <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert"> <span className="block sm:inline">{successMessage}</span> </div> )}
        {/* --- FIX: Display fetch and submit errors --- */}
        {fetchError && !isLoading && ( <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"> <span className="block sm:inline">Error loading services: {fetchError}</span> </div> )}
        {errors.general && ( <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"> <span className="block sm:inline">{errors.general}</span> </div> )}
        {/* --- End FIX --- */}


        {/* Add/Edit Form */}
        {isEditing ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 border border-blue-200">
                 <div className="px-6 py-4 border-b bg-gray-50"> <h2 className="font-semibold text-lg">{currentService ? 'Edit Service' : 'Add New Service'}</h2> </div>
                 <div className="p-6">
                   <form onSubmit={handleSubmit} noValidate>
                      {/* Form Fields */}
                       <div className="mb-4"> <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1"> Name* </label> <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500`} required/> {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>} </div>
                       <div className="mb-4"> <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1"> Description* </label> <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={3} className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500`} required></textarea> {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>} </div>
                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                           <div> <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1"> Price (₹)* </label> <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} min="0" step="0.01" className={`w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500`} required/> {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>} </div>
                           <div> <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1"> Service Type* </label> <select id="type" name="type" value={formData.type} onChange={handleInputChange} required className={`w-full border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 bg-white`}> <option value="activity">Activity</option> <option value="accommodation">Accommodation</option> <option value="transport">Transport</option> <option value="tour">Tour Package</option> <option value="other">Other</option> </select> {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>} </div>
                           {/* --- FIX: Add Island Select (Fetch Real Data) --- */}
                           <div>
                               <label htmlFor="island_id" className="block text-sm font-medium text-gray-700 mb-1"> Island* </label>
                               <select
                                   id="island_id"
                                   name="island_id"
                                   value={formData.island_id}
                                   onChange={handleInputChange}
                                   required
                                   disabled={isLoadingIslands} // Disable while loading
                                   className={`w-full border ${errors.island_id ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100`}
                               >
                                   <option value="">{isLoadingIslands ? 'Loading islands...' : 'Select Island'}</option>
                                   {islands && islands.map((island) => (
                                       <option key={island.id} value={island.id.toString()}>
                                           {island.name}
                                       </option>
                                   ))}
                               </select>
                               {errors.island_id && <p className="mt-1 text-sm text-red-600">{errors.island_id}</p>}
                               {islandsError && !isLoadingIslands && (
                                   <p className="mt-1 text-sm text-red-600">Error loading islands: {islandsError.message}</p>
                               )}
                           </div>
                           {/* --- End FIX --- */}
                           <div> <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1"> Image URL </label> <input type="url" id="image_url" name="image_url" value={formData.image_url} onChange={handleInputChange} placeholder="https://..." className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"/> </div>
                      </div>
                      {/* Availability Grid */}
                      <div className="mb-6">
                           <label className="block text-sm font-medium text-gray-700 mb-2"> Availability* <span className="text-xs text-gray-500">(Select available time slots)</span> </label>
                           {errors.availability && <p className="mb-2 text-sm text-red-600">{errors.availability}</p>}
                           <div className="border border-gray-300 rounded-md overflow-hidden"> <div className="overflow-x-auto"> <table className="min-w-full divide-y divide-gray-200 text-xs"> <thead className="bg-gray-50"> <tr> <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase sticky left-0 bg-gray-50 z-10"> Day </th> {timeSlots.map((ts) => <th key={ts} className="px-1 py-2 text-center font-medium text-gray-500 uppercase whitespace-nowrap"> {ts.replace(' AM','a').replace(' PM','p')} </th>)} </tr> </thead> <tbody className="bg-white divide-y divide-gray-200"> {daysOfWeek.map((day) => ( <tr key={day}> <td className="px-2 py-2 whitespace-nowrap font-medium text-gray-900 sticky left-0 bg-white z-10"> {day} </td> {timeSlots.map((ts) => ( <td key={`${day}-${ts}`} className="px-1 py-2 whitespace-nowrap text-center"> <input type="checkbox" checked={isTimeSlotAvailable(day, ts)} onChange={(e) => handleAvailabilityChange(day, ts, e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" /> </td> ))} </tr> ))} </tbody> </table> </div> </div>
                      </div>
                      {/* Form Actions */}
                      <div className="flex justify-end space-x-3 pt-4 border-t"> <button type="button" onClick={handleCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"> Cancel </button> <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50 flex items-center"> {isSubmitting && <Loader2 className="animate-spin h-4 w-4 mr-2"/>} {isSubmitting ? 'Saving...' : currentService ? 'Update Service' : 'Add Service'} </button> </div>
                   </form>
                 </div>
            </div>
        ) : (
          <div className="mb-6">
            <button onClick={handleAddNewService} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"> + Add New Service </button>
          </div>
        )}

        {/* Services List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
           <div className="px-6 py-4 border-b bg-gray-50"> <h2 className="font-semibold">Your Services</h2> </div>
            {isLoading ? (
                <LoadingSpinner text="Loading your services..." />
            ) : services.length === 0 && !fetchError ? ( // Added !fetchError check
               <div className="p-8 text-center text-gray-500"> You haven't added any services yet. </div>
           ) : !isLoading && services.length > 0 ? ( // Added !isLoading check
             <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                    {/* Table Headers */}
                    <tr>
                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Service </th>
                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Price </th>
                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Status </th>
                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Bookings </th>
                       <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Actions </th>
                    </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                   {services.map((service) => (
                     <tr key={service.id} className="hover:bg-gray-50">
                       {/* Service Column */}
                       <td className="px-4 py-4 whitespace-nowrap">
                           <div className="flex items-center">
                               <div className="h-10 w-10 bg-gray-100 rounded-md flex-shrink-0 mr-3 flex items-center justify-center">
                                    {service.image_url ? ( <Image src={service.image_url} alt={service.name} width={40} height={40} className="object-cover rounded-md" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).style.display = 'none'; }}/> ) : ( <Package size={20} className="text-gray-400"/> )}
                               </div>
                               <div> <div className="text-sm font-medium text-gray-900">{service.name}</div> <div className="text-xs text-gray-500 truncate max-w-xs">{service.description || 'No description'}</div> </div>
                           </div>
                       </td>
                       {/* Price Column */}
                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900"> {typeof service.price === 'number' ? `₹${service.price.toLocaleString('en-IN')}` : service.price} </td>
                       {/* Status Column */}
                       <td className="px-4 py-4 whitespace-nowrap"> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getServiceStatusColor(service.isActive)}`}> {service.isActive ? 'Active' : 'Inactive'} </span> </td>
                       {/* Bookings Column */}
                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"> {service.bookings ?? 'N/A'} </td>
                       {/* Actions Column */}
                       <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                           <button onClick={() => handleEditService(service)} className="text-blue-600 hover:text-blue-900 disabled:opacity-50" title="Edit" disabled={deleteStatus === 'loading' || toggleStatus === 'loading'}><Edit size={16}/></button>
                           {/* --- FIX: Pass currentStatus to toggle handler --- */}
                           <button onClick={() => handleToggleServiceStatus(service.id, service.isActive)} className={`${service.isActive ? "text-yellow-600 hover:text-yellow-900" : "text-green-600 hover:text-green-900"} disabled:opacity-50`} title={service.isActive ? 'Deactivate' : 'Activate'} disabled={deleteStatus === 'loading' || toggleStatus === 'loading'}>
                               {toggleStatus === 'loading' && currentService?.id === service.id ? <Loader2 className="animate-spin h-4 w-4"/> : service.isActive ? <PowerOff size={16}/> : <Power size={16}/>}
                           </button>
                           {/* --- End FIX --- */}
                           <button onClick={() => handleDeleteService(service.id)} className="text-red-600 hover:text-red-900 disabled:opacity-50" title="Delete" disabled={deleteStatus === 'loading' || toggleStatus === 'loading'}>
                               {deleteStatus === 'loading' && currentService?.id === service.id ? <Loader2 className="animate-spin h-4 w-4"/> : <Trash2 size={16}/>}
                           </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           ) : null /* Handle case where fetch failed but wasn't loading */ }
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"> <h3 className="text-lg font-medium text-blue-800 mb-4">Service Management Tips</h3> <ul className="space-y-2 text-sm text-blue-700 list-disc list-inside"> <li>Keep descriptions clear and accurate.</li> <li>Ensure availability is up-to-date to avoid conflicts.</li> <li>Upload high-quality images to attract customers.</li> <li>Respond promptly to booking inquiries.</li> </ul> </div>

      </div>
    </div>
  );
} // End of VendorServiceManagement component