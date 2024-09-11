/**
 * Provides a reusable `UploadImage` component that handles image uploads and removal for the "About" and "Banner" sections of the application.
 *
 * The `UploadImage` component uses the `UploadDropzone` utility to handle the file upload process, and calls the appropriate action functions (`addImageAbout`, `addImage`, `imageRemoveAbout`, `imageRemove`) to update the application state.
 *
 * The `RemoveButton` component is a separate component that provides a button to remove a previously uploaded image. It calls the appropriate image removal action function based on the `type` prop.
 *
 * @param {string} type - Indicates whether the image is for the "About" or "Banner" section.
 * @returns {JSX.Element} - The `UploadImage` component.
 */

/**
 * Provides a button to remove a previously uploaded image.
 *
 * @param {string} imageUrl - The URL of the image to be removed.
 * @param {string} imageKey - The unique key of the image to be removed.
 * @param {string} type - Indicates whether the image is for the "About" or "Banner" section.
 * @returns {JSX.Element} - The `RemoveButton` component.
 */
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addImage } from "@/core/actions/Dashboard/Banner/addImage";
import { imageRemove } from "@/core/actions/Dashboard/Banner/imageRemove";
import { UploadDropzone } from "@/utils/uploadthing"; 
import { Banner } from "@/resourse/types";
import { useState } from "react";
import { addImageAbout } from "@/core/actions/Dashboard/About/addImage";
import { imageRemoveAbout } from "@/core/actions/Dashboard/About/imageRemove";

export default function UploadImage({type}:{type:string}) {
 
  const { toast } = useToast();

  return (
    <div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          console.log("Files: ", res);
          if (res.length > 0) {
            if(type==="About"){
              await addImageAbout(res[0].url, res[0].key);
            }else{
              await addImage(res[0].url, res[0].key);
            }
            toast({
              description: 'Image uploaded successfully',
            });
          }
        }}
        onUploadError={(error: Error) => {
          toast({
            description: 'Image cannot be uploaded',
            variant: 'destructive',
          });
        }}
      />
    </div>
  );
}


export function RemoveButton({imageUrl,imageKey,type}:{imageUrl:string,imageKey:string,type:string}) {
  const { toast } = useToast();
  const handleRemove = async () => {
    let res;
    if(type==="About"){
      res = await imageRemoveAbout(imageKey);
    }else{
      res = await imageRemove(imageKey);
    }
    if (res.success) {
      toast({
        description: 'Previous Image is Removed Successfully'
      });
    }else {
      toast({
        description: 'Image cannot be removed',
        variant: 'destructive',
      });
    }
  };
  return (
    <Button
      className="bg-red-500 m-4 relative z-50 hover:bg-red-700 hover:animate-pulse text-white font-bold py-2 px-4 rounded cursor-pointer"
      onClick={handleRemove}
    >
      Remove
    </Button>
  );
};