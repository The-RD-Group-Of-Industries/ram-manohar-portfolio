/**
 * Deletes an image from the database and the associated file from the upload service.
 *
 * @param imageKey - The unique identifier of the image to be deleted.
 * @returns An object with a `success` property indicating whether the operation was successful.
 */
"use server"
import { db } from "@/resourse"
import { utapi } from "@/resourse/Uploadthings/server"
import { revalidatePath } from "next/cache"
export const imageRemoveAbout = async (imageKey:string) => {
    try {
        await utapi.deleteFiles(imageKey)
        await db.about.delete({
            where: {
                imageKey,
            },
        });
        revalidatePath(`/dashboard/About`); 
        revalidatePath(`/`); 

        return { success: true }
    } catch (error) {
        return { success: false }
    }
}