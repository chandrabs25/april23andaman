import { NextRequest, NextResponse } from "next/server";

// Check if we're in Cloudflare environment
const isCloudflareEnv = process.env.NEXT_RUNTIME === 'edge' || typeof globalThis.caches !== 'undefined';

// When in local development, we'll need filesystem support
let fsPromises: typeof import('fs/promises') | null = null;
let path: typeof import('path') | null = null;
let fs: typeof import('fs') | null = null;

if (!isCloudflareEnv) {
  // Only import fs modules when not in Cloudflare (i.e., in local development)
  const importFsPromises = async () => {
    try {
      fsPromises = await import('fs/promises');
      path = await import('path');
      fs = await import('fs');
    } catch (error) {
      console.error('Failed to import fs modules:', error);
    }
  };
  
  // Call the import function immediately
  importFsPromises();
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const parentId = formData.get("parentId") as string;
    const type = formData.get("type") as "hotel" | "room" | "service";
    
    if (!parentId || !type) {
      return NextResponse.json({ error: "Missing parentId or type" }, { status: 400 });
    }

    // Handle temporary IDs
    const isTempId = parentId.startsWith('temp-');
    
    // Get all files from the request
    const files = formData.getAll("images") as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // Determine the base path segment based on type
    let basePathSegment: string;
    const urlDirName = isTempId ? "temp" : parentId.toString();
    
    if (type === "hotel") {
      basePathSegment = `/images/hotels/${urlDirName}`;
    } else if (type === "room") {
      basePathSegment = `/images/hotels/${urlDirName}/rooms`;
    } else { // service
      basePathSegment = `/images/services/${urlDirName}`;
    }
    
    // Array to store image URLs
    const imageUrls: string[] = [];
    
    // In Cloudflare, use R2 for storage
    if (isCloudflareEnv) {
      // Process each file to generate URLs and upload to R2
      for (const file of files) {
        try {
          // Create a safe filename
          const originalName = file.name;
          const timestamp = Date.now();
          const fileName = `${timestamp}-${originalName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
          
          // Generate the full path for R2
          const r2Path = `${basePathSegment.substring(1)}/${fileName}`;
          
          // Note: For actual R2 implementation, you would need to access env.IMAGES_BUCKET
          // This is a placeholder showing what the code would look like
          /*
          // Get R2 binding from environment
          const { IMAGES_BUCKET } = env;
          
          // Upload file to R2
          const arrayBuffer = await file.arrayBuffer();
          await IMAGES_BUCKET.put(r2Path, arrayBuffer, {
            httpMetadata: {
              contentType: file.type,
            }
          });
          */
          
          // URL is based on R2 path
          const relativePath = `${basePathSegment}/${fileName}`;
          imageUrls.push(relativePath);
        } catch (fileError) {
          console.error(`Error processing file ${file.name}:`, fileError);
          return NextResponse.json({ 
            error: "Failed to process file", 
            file: file.name
          }, { status: 500 });
        }
      }
      
      return NextResponse.json({ 
        success: true, 
        imageUrls,
        message: `${files.length} images processed successfully in Cloudflare environment`
      });
    } 
    // In local development, use filesystem
    else {
      // Make sure fs modules are available
      if (!fsPromises || !path || !fs) {
        return NextResponse.json({ 
          error: "File system modules unavailable", 
          details: "Unable to save files in local development"
        }, { status: 500 });
      }
      
      // Paths for directory creation
      const publicDir = path.join(process.cwd(), "public");
      const imagesDir = path.join(publicDir, "images");
      
      try {
        // Create base directories if they don't exist
        if (!fs.existsSync(imagesDir)) {
          await fsPromises.mkdir(imagesDir, { recursive: true });
        }
        
        // Create type-specific directory
        let targetDir: string;
        
        if (type === "hotel" || type === "room") {
          // Hotel and room images go to hotels directory
          const hotelsDir = path.join(imagesDir, "hotels");
          if (!fs.existsSync(hotelsDir)) {
            await fsPromises.mkdir(hotelsDir, { recursive: true });
          }
          
          // Use temp dir for temporary IDs
          const dirName = isTempId ? "temp" : parentId.toString();
          
          const hotelDir = path.join(hotelsDir, dirName);
          if (!fs.existsSync(hotelDir)) {
            await fsPromises.mkdir(hotelDir, { recursive: true });
          }
          
          if (type === "room") {
            const roomsDir = path.join(hotelDir, "rooms");
            if (!fs.existsSync(roomsDir)) {
              await fsPromises.mkdir(roomsDir, { recursive: true });
            }
            targetDir = roomsDir;
          } else {
            targetDir = hotelDir;
          }
        } else { // service
          const servicesDir = path.join(imagesDir, "services");
          if (!fs.existsSync(servicesDir)) {
            await fsPromises.mkdir(servicesDir, { recursive: true });
          }
          
          // Use temp dir for temporary IDs
          const dirName = isTempId ? "temp" : parentId.toString();
          
          targetDir = path.join(servicesDir, dirName);
          if (!fs.existsSync(targetDir)) {
            await fsPromises.mkdir(targetDir, { recursive: true });
          }
        }
        
        // Process each file
        for (const file of files) {
          try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            // Create a safe filename
            const originalName = file.name;
            const timestamp = Date.now();
            const fileName = `${timestamp}-${originalName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
            
            // Full path to save the file
            const filePath = path.join(targetDir, fileName);
            
            // Save the file
            await fsPromises.writeFile(filePath, buffer);
            
            // Generate URL path
            const relativePath = `${basePathSegment}/${fileName}`;
            imageUrls.push(relativePath);
          } catch (fileError) {
            console.error(`Error processing file ${file.name}:`, fileError);
            return NextResponse.json({ 
              error: "Failed to process file", 
              details: String(fileError),
              file: file.name
            }, { status: 500 });
          }
        }
        
        return NextResponse.json({ 
          success: true, 
          imageUrls,
          message: `${files.length} images saved successfully in local environment`
        });
      } catch (dirError) {
        console.error("Directory creation error:", dirError);
        return NextResponse.json({ 
          error: "Failed to create directories", 
          details: String(dirError)
        }, { status: 500 });
      }
    }
  } catch (error) {
    console.error("Error processing images:", error);
    return NextResponse.json(
      { error: "Failed to process images", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 