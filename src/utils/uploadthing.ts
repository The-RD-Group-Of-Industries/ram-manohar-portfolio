/**
 * Generates an upload button component that can be used to trigger file uploads.
 * The button is connected to the `OurFileRouter` type, which defines the available file upload routes.
 */



import {
  generateUploadButton,
  generateUploadDropzone,
  } from "@uploadthing/react";
  
  import type { OurFileRouter } from "@/app/api/uploadthing/core";
  
  export const UploadButton = generateUploadButton<OurFileRouter>();
  /**
   * Generates an upload dropzone component that can be used to accept file drops for uploading.
   * The dropzone is connected to the `OurFileRouter` type, which defines the available file upload routes.
   */
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();