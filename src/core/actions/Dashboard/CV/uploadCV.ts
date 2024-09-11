/**
 * Uploads a CV to the database and revalidates the `/dashboard/CV` and `/` paths.
 *
 * @param image - The URL of the CV PDF file.
 * @param imageKey - The unique key for the CV PDF file.
 * @returns An object with a `success` property if the upload was successful, or an `error` property if there was a failure.
 */
"use server"
import { db } from "@/resourse"
import { revalidatePath } from "next/cache";
export const uploadCV = async ( image: string,imageKey:string
) => {
    try {
        await db.cV.create({
            data: {
                pdfUrl: image,
                pdfKey: imageKey
              },  
        });
   revalidatePath(`/dashboard/CV`); 
   revalidatePath(`/`); 
        return { success: true }
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Unique constraint failed')) {
                const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
                const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown field';
        
                return { error: `Failed to Create: A CV with this ${fieldName} already exists.` };
            }
            return { error: `Failed to Create: ${error.message}` };
        }
    }
}