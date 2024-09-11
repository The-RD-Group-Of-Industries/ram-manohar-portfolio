/**
 * Removes an image from the database and the associated file storage.
 *
 * @param imageKey - The key of the image to be removed.
 * @returns An object with a `success` property indicating whether the operation was successful.
 */
"use server"
import { db } from "@/resourse"
import { utapi } from "@/resourse/Uploadthings/server"
import { revalidatePath } from "next/cache"
export const imageRemove = async (imageKey:string) => {
    try {
        await utapi.deleteFiles(imageKey)
        await db.banner.delete({
            where: {
                imageKey,
            },
        });
        revalidatePath(`/dashboard/Banner`); 
        revalidatePath(`/`); 

        return { success: true }
    } catch (error) {
        return { success: false }
    }
}