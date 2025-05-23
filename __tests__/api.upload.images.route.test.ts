// @ts-nocheck - To allow for Jest global types if not explicitly configured
import { POST } from '@/app/api/upload/images/route'; // Adjust this path if your project structure is different
import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

// Mock external dependencies
jest.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: jest.fn(),
}));

// Mock 'fs/promises' and 'fs' to control file system operations
let mockFsPromises: { writeFile: jest.Mock; mkdir: jest.Mock };
let mockFs: { existsSync: jest.Mock };

jest.mock('fs/promises', () => {
  mockFsPromises = {
    writeFile: jest.fn().mockResolvedValue(undefined),
    mkdir: jest.fn().mockResolvedValue(undefined),
  };
  return mockFsPromises;
});

jest.mock('fs', () => {
  mockFs = {
    existsSync: jest.fn().mockReturnValue(false), // Default to directory not existing to test creation
  };
  return mockFs;
});

// Mock NextResponse for consistent testing environment
jest.mock('next/server', () => {
  const originalModule = jest.requireActual('next/server');
  return {
    ...originalModule,
    NextResponse: {
      json: jest.fn((body, init) => ({
        body: JSON.stringify(body),
        status: init?.status || 200,
        ok: (init?.status || 200) < 300,
        json: async () => body,
        text: async () => JSON.stringify(body),
        clone: () => ({ ...this })
      })),
    },
  };
});


describe('POST /api/upload/images', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset specific mock implementations if necessary for each test
    mockFs.existsSync.mockReturnValue(false); // Default: path does not exist
    mockFsPromises.mkdir.mockResolvedValue(undefined);
    mockFsPromises.writeFile.mockResolvedValue(undefined);
  });

  it('should process uploads for type "package_category" with correct path (simulating local FS)', async () => {
    // Simulate non-R2 environment (local FS)
    (getCloudflareContext as jest.Mock).mockResolvedValue({ env: {} }); // No IMAGES_BUCKET

    const mockFile = new File(['dummy category image content'], 'test_category_image.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    const parentId = 'temp-cat-789';
    formData.append('parentId', parentId);
    formData.append('type', 'package_category');
    formData.append('images', mockFile); // 'images' should be the field name used by the client

    const request = new NextRequest('http://localhost/api/upload/images', {
      method: 'POST',
      body: formData,
      // Headers are not strictly necessary for body parsing if FormData is used correctly by NextRequest
    });
    
    // Simulate that the base 'public/images' directory exists, but type-specific ones don't
    mockFs.existsSync.mockImplementation((path) => {
      if (path.endsWith('public/images')) return true;
      if (path.endsWith(`public/images/package_categories`)) return false; // Test creation of this
      if (path.endsWith(`public/images/package_categories/${parentId}`)) return false; // Test creation of this
      return false;
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(200); // Assuming 200 for success
    expect(responseBody.success).toBe(true);
    expect(responseBody.imageUrls).toHaveLength(1);
    
    const expectedFileNameRegex = /^\/images\/package_categories\/temp-cat-789\/\d+-test_category_image\.jpg$/;
    expect(responseBody.imageUrls[0]).toMatch(expectedFileNameRegex);

    // Verify directory creation
    // Expected paths: 'public/images', 'public/images/package_categories', 'public/images/package_categories/temp-cat-789'
    // mkdir is called recursively, so it might be called for the full path directly.
    // Let's check the final target directory.
    const expectedTargetDir = `public/images/package_categories/${parentId}`;
    
    // Check that mkdir was called to create the necessary directories.
    // Because mkdir is recursive, we expect it to be called for the full path if intermediate dirs don't exist.
    // Based on the mockFs.existsSync setup, 'public/images/package_categories' and 'public/images/package_categories/temp-cat-789'
    // will be reported as not existing, so mkdir should be called for them.
    // process.cwd() will be part of the path module's resolution.
    const path = await import('path'); // Import path for join
    
    expect(mockFsPromises.mkdir).toHaveBeenCalledWith(
      path.join(process.cwd(), "public", "images", "package_categories"), 
      { recursive: true }
    );
    expect(mockFsPromises.mkdir).toHaveBeenCalledWith(
      path.join(process.cwd(), "public", "images", "package_categories", parentId), 
      { recursive: true }
    );
    
    // Verify file writing
    const writtenFilePath = mockFsPromises.writeFile.mock.calls[0][0];
    const expectedWrittenFileNameRegex = new RegExp(`public/images/package_categories/temp-cat-789/\\d+-test_category_image\\.jpg$`);
    expect(writtenFilePath).toMatch(expectedWrittenFileNameRegex);

    // Ensure getCloudflareContext was called to check for R2 env
    expect(getCloudflareContext).toHaveBeenCalled();
  });

  it('should process uploads for type "package_category" with correct R2 path (simulating R2)', async () => {
    const mockR2Bucket = {
      put: jest.fn().mockResolvedValue({ httpMetadata: { contentType: 'image/jpeg' } }),
    };
    // Simulate R2 environment
    (getCloudflareContext as jest.Mock).mockResolvedValue({ 
      env: { IMAGES_BUCKET: mockR2Bucket } 
    });

    const mockFile = new File(['dummy r2 category image'], 'r2_category_image.png', { type: 'image/png' });
    const formData = new FormData();
    const parentId = 'r2-cat-001';
    formData.append('parentId', parentId);
    formData.append('type', 'package_category');
    formData.append('images', mockFile);

    const request = new NextRequest('http://localhost/api/upload/images', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.success).toBe(true);
    expect(responseBody.imageUrls).toHaveLength(1);

    // The R2_PUBLIC_DOMAIN is hardcoded in the route as "pub-861b68dd53c047e0a06b7164e95ccc43.r2.dev"
    const expectedR2PathRegex = /^https:\/\/pub-861b68dd53c047e0a06b7164e95ccc43\.r2\.dev\/images\/package_categories\/r2-cat-001\/\d+-r2_category_image\.png$/;
    expect(responseBody.imageUrls[0]).toMatch(expectedR2PathRegex);

    // Verify R2 put call
    expect(mockR2Bucket.put).toHaveBeenCalledTimes(1);
    const r2PutArgs = mockR2Bucket.put.mock.calls[0];
    expect(r2PutArgs[0]).toMatch(/^images\/package_categories\/r2-cat-001\/\d+-r2_category_image\.png$/); // R2 Key
    expect(r2PutArgs[1]).toBeInstanceOf(ArrayBuffer); // File content
    expect(r2PutArgs[2]).toEqual({ httpMetadata: { contentType: 'image/png' } });

    // Ensure local FS methods were not called
    expect(mockFsPromises.mkdir).not.toHaveBeenCalled();
    expect(mockFsPromises.writeFile).not.toHaveBeenCalled();
  });
  
  // Add test for invalid type
  it('should return 400 for an invalid upload type', async () => {
    (getCloudflareContext as jest.Mock).mockResolvedValue({ env: {} }); // Local FS mode

    const formData = new FormData();
    formData.append('parentId', 'test-parent-invalid');
    formData.append('type', 'invalid_type_group'); // This type is not in the union
    formData.append('images', new File(['dummy'], 'test.jpg', { type: 'image/jpeg' }));

    const request = new NextRequest('http://localhost/api/upload/images', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody.success).toBe(false); // Assuming success is false for errors
    expect(responseBody.error).toBe('Invalid upload type specified');
  });

});
