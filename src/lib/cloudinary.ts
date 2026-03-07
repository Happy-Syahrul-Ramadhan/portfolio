import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Upload file to Cloudinary
 * @param file - File to upload
 * @param folder - Optional folder path (e.g., 'portfolio/blogs', 'portfolio/projects')
 * @returns Cloudinary upload result with URL
 */
export async function uploadToCloudinary(
  file: File,
  folder: string = "portfolio/general"
): Promise<{ url: string; publicId: string }> {
  // Convert File to Buffer
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const isPDF = file.type === "application/pdf"

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: folder,
          resource_type: isPDF ? "raw" : "auto",
          // Only apply transformations to images, not PDFs
          ...(isPDF ? {} : {
            transformation: [
              { quality: "auto:good" },
              { fetch_format: "auto" },
            ],
          }),
        },
        (error, result) => {
          if (error) {
            reject(new Error(`Cloudinary upload failed: ${error.message}`))
          } else if (result) {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
            })
          }
        }
      )
      .end(buffer)
  })
}

/**
 * Delete file from Cloudinary
 * @param publicId - Public ID of the file to delete
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    throw new Error(
      `Cloudinary delete failed: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

/**
 * Get optimized image URL with transformations
 * @param publicId - Public ID of the image
 * @param width - Desired width
 * @param height - Desired height (optional)
 */
export function getOptimizedImageUrl(
  publicId: string,
  width: number,
  height?: number
): string {
  return cloudinary.url(publicId, {
    transformation: [
      { width, height, crop: "limit" },
      { quality: "auto:good" },
      { fetch_format: "auto" },
    ],
  })
}

export default cloudinary
