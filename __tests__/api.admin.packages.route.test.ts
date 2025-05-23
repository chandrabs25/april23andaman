// @ts-nocheck - To allow for Jest global types if not explicitly configured
import { POST } from '@/app/api/admin/packages/route'; // Adjust path if necessary based on actual root
import { DatabaseService } from '@/lib/database';
import { requireAuth, verifyAuth } from '@/lib/auth';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Mock dependencies
jest.mock('@/lib/database');
jest.mock('@/lib/auth');

// Mock NextResponse as well if it's used internally by the POST handler for responses
jest.mock('next/server', () => {
  const originalModule = jest.requireActual('next/server');
  return {
    ...originalModule,
    NextResponse: {
      json: jest.fn((body, init) => ({ // Mock the json static method
        body: JSON.stringify(body), 
        status: init?.status || 200,
        json: async () => body, // Add a json method to the mock response object
      })),
    },
  };
});


describe('POST /api/admin/packages', () => {
  let mockDbServiceInstance: jest.Mocked<DatabaseService>;
  let mockRequest: NextRequest;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock requireAuth and verifyAuth to allow the request
    (requireAuth as jest.Mock).mockImplementation(async (req, res, callback) => callback(null)); // Simulates successful auth check
    (verifyAuth as jest.Mock).mockResolvedValue({ user: { id: '1', role: 'admin' } }); // Mock admin user

    // Setup mock for DatabaseService
    mockDbServiceInstance = {
      createPackage: jest.fn().mockResolvedValue({ success: true, meta: { last_row_id: 123 } }),
      // Add other methods if they are called in the POST handler
      // For example, if it checks for existing package name:
      // query: jest.fn().mockResolvedValue({ rows: [] }), 
    } as any; // Use 'any' to simplify if not all methods are mocked

    // @ts-ignore - Because DatabaseService is a class, and we are mocking its instance behavior
    (DatabaseService as jest.Mock).mockImplementation(() => mockDbServiceInstance);

    // Mock NextResponse.json to ensure it returns a value that can be awaited
     (NextResponse.json as jest.Mock).mockImplementation((body, init) => {
      return {
        body: JSON.stringify(body),
        status: init?.status || 200,
        headers: new Headers(init?.headers),
        ok: (init?.status || 200) < 300,
        json: async () => body, // Ensure the returned object also has a json method
        text: async () => JSON.stringify(body),
        // Add other methods like clone() if your code uses them
        clone: () => ({ ...this }) 
      } as any; // Cast to any to satisfy the return type if it's complex
    });
  });

  it('should correctly process and stringify the itinerary when creating a package', async () => {
    const mockItinerary = [
      { day_number: 1, title: 'Arrival', description: 'Welcome to the island!' },
      { day_number: 2, title: 'Exploring', description: 'Visit famous landmarks.' },
    ];
    const requestBody = {
      name: 'Adventure Package',
      description: 'An exciting adventure.',
      duration: '3 Days',
      base_price: 500,
      max_people: 4,
      itinerary: mockItinerary,
      included_services: 'Flights, Hotel',
      images: 'image1.jpg,image2.jpg',
      cancellation_policy: 'Full refund 7 days prior.',
      is_active: true,
      package_categories: [
        { 
          category_name: 'Standard', 
          price: 500, 
          hotel_details: 'Standard Hotel', 
          category_description: 'Standard room',
          max_pax_included_in_price: 2
        }
      ],
    };

    // Create a mock NextRequest
    // The URL can be a dummy URL as it's not typically used directly in this kind of unit test
    mockRequest = new NextRequest('http://localhost/api/admin/packages', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    });

    // Call the POST handler
    const response = await POST(mockRequest);
    const responseBody = await response.json(); // Make sure to await json() if it's a promise

    // Assertions
    expect(requireAuth).toHaveBeenCalledTimes(1);
    // verifyAuth is called inside requireAuth, so direct call count might be 0 if requireAuth handles it
    // or 1 if requireAuth calls it explicitly and we mock requireAuth to just call its callback.
    // Based on the mock: (requireAuth as jest.Mock).mockImplementation(async (req, res, callback) => callback(null));
    // verifyAuth might not be directly called if requireAuth's callback is immediately invoked.
    // Let's adjust this expectation based on typical requireAuth flow.
    // If requireAuth is a wrapper that calls verifyAuth, then verifyAuth should be called.
    // (verifyAuth as jest.Mock).mockResolvedValue({ user: { id: '1', role: 'admin' } });
    // For now, let's assume requireAuth calls verifyAuth internally.
    // If requireAuth is just a passthrough in this test, then verifyAuth might not be hit.
    // Given the prompt implies requireAuth and verifyAuth are mocked, we'll assume they are part of the auth flow.
    // The important part is that the request proceeds as an authenticated admin.

    expect(DatabaseService).toHaveBeenCalledTimes(1); // Check if DB service was instantiated
    expect(mockDbServiceInstance.createPackage).toHaveBeenCalledTimes(1);
    
    const createPackageArgs = mockDbServiceInstance.createPackage.mock.calls[0][0];
    
    expect(createPackageArgs.name).toBe(requestBody.name);
    expect(createPackageArgs.description).toBe(requestBody.description);
    expect(createPackageArgs.duration).toBe(requestBody.duration);
    expect(createPackageArgs.base_price).toBe(requestBody.base_price);
    expect(createPackageArgs.max_people).toBe(requestBody.max_people);
    expect(createPackageArgs.itinerary).toBe(JSON.stringify(mockItinerary)); // Key assertion
    expect(createPackageArgs.included_services).toBe(requestBody.included_services);
    expect(createPackageArgs.images).toBe(requestBody.images); // Assuming images are passed as string
    expect(createPackageArgs.cancellation_policy).toBe(requestBody.cancellation_policy);
    expect(createPackageArgs.is_active).toBe(requestBody.is_active);
    expect(createPackageArgs.package_categories).toEqual(requestBody.package_categories); // Assuming categories are passed as is

    // Check the response from the POST handler
    expect(response.status).toBe(201); // Or 200, depending on actual implementation
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toBe('Package created successfully');
    expect(responseBody.data.id).toBe(123); // From the mockResolvedValue of createPackage
  });

  it('should return 400 if required fields are missing', async () => {
    const requestBody = {
      // Missing 'name', 'duration', 'base_price', 'package_categories'
      itinerary: [],
    };

    mockRequest = new NextRequest('http://localhost/api/admin/packages', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody.success).toBe(false);
    expect(responseBody.message).toContain('Missing required fields'); // Adjust message as per actual implementation
    expect(mockDbServiceInstance.createPackage).not.toHaveBeenCalled();
  });

  // Add more tests:
  // - Test for unauthorized user (if requireAuth/verifyAuth mock is changed to simulate this)
  // - Test for database error during package creation
});
