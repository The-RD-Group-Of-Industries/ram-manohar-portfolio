/**
 * Removes a PDF file and its associated record from the database.
 *
 * @param pdfKey - The unique identifier of the PDF file to be removed.
 * @returns An object with a `success` property indicating whether the operation was successful.
 */
"use server"
import { db } from "@/resourse"
import { utapi } from "@/resourse/Uploadthings/server"
import { revalidatePath } from "next/cache"
export const RemoveCV = async (pdfKey:string) => {
    try {
        await utapi.deleteFiles(pdfKey)
        await db.cV.delete({
            where: {
                pdfKey,
            },
        });
        revalidatePath(`/dashboard/CV`); 
        revalidatePath(`/`); 

        return { success: true }
    } catch (error) {
        return { success: false }
    }
}