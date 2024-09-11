/**
 * Configures an Uploadthing file router with two file types: 'image' and 'pdf'.
 * The 'image' file type has a maximum file size of 8MB, and the 'pdf' file type has a maximum file size of 4MB.
 * When a file is uploaded successfully, the `onUploadComplete` callback is called, which logs the file URL to the console.
 */
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } , pdf:{maxFileSize:"4MB"}})
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:");
 
      console.log("file url", file.url);
 
    
    }),
} 
export type OurFileRouter = typeof ourFileRouter;