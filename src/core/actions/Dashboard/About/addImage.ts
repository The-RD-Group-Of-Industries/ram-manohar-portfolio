/**
 * Adds a new image to the "About" section of the application.
 *
 * @param image - The URL of the image to be added.
 * @param imageKey - A unique identifier for the image.
 * @returns An object with a `success` property indicating whether the operation was successful, or an `error` property with an error message if the operation failed.
 */
"use server"
import { db } from "@/resourse"
import { revalidatePath } from "next/cache";
export const addImageAbout = async ( image: string,imageKey:string
) => {
    try {
        await db.about.create({
            data: {
                imageUrl: image,
                imageKey: imageKey
              },  
        });
   revalidatePath(`/dashboard/About`); 
   revalidatePath(`/`); 
        return { success: true }
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Unique constraint failed')) {
                const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
                const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown field';
        
                return { error: `Failed to Create: A Image with this ${fieldName} already exists.` };
            }
            return { error: `Failed to Create: ${error.message}` };
        }
    }
}