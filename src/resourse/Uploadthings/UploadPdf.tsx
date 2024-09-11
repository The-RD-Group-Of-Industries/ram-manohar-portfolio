/**
 * Provides a file upload dropzone and a button to remove a previously uploaded PDF file.
 *
 * The `UploadPdf` component renders a file upload dropzone that allows the user to upload a PDF file.
 * When a file is successfully uploaded, the `uploadCV` function is called to save the file.
 * If an error occurs during the upload, a toast message is displayed.
 *
 * The `RemoveButton` component renders a button that, when clicked, calls the `RemoveCV` function
 * to remove the previously uploaded PDF file. If the removal is successful, a toast message is
 * displayed. If an error occurs, a destructive toast message is displayed.
 */
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@/utils/uploadthing"; 
import { uploadCV } from "@/core/actions/Dashboard/CV/uploadCV";
import { RemoveCV } from "@/core/actions/Dashboard/CV/removePdf";

export default function UploadPdf({type}:{type:string}) {
 
  const { toast } = useToast();

  return (
    <div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          console.log("Files: ", res);
          if (res.length > 0) {
           uploadCV(res[0].url,res[0].key);
            toast({
              description: 'CV uploaded successfully',
            });
          }
        }}
        onUploadError={(error: Error) => {
          toast({
            description: 'CV cannot be uploaded',
            variant: 'destructive',
          });
        }}
      />
    </div>
  );
}


export function RemoveButton({imageUrl,imageKey}:{imageUrl:string,imageKey:string}) {
  const { toast } = useToast();
  const handleRemove = async () => {
   
   let res = await RemoveCV(imageKey);
    if ((await res).success) {
      toast({
        description: 'Previous CV is Removed Successfully'
      });
    }else {
      toast({
        description: 'CV cannot be removed',
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