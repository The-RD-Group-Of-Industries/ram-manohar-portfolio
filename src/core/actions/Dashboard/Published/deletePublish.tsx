/**
 * Deletes a published record from the database and revalidates the `/dashboard/Published` and `/` paths.
 *
 * @param id - The ID of the published record to delete.
 * @returns An object with either a `success` or `error` property, indicating the result of the operation.
 */
"use server"
import { db } from "@/resourse";
import { revalidatePath } from "next/cache";

export const deletePublish = async (id:string) => {
  try {
    const existingRecord = await db.published.findUnique({
      where: { id }
    });

    if (!existingRecord) {
      return {
        error: "Record not found."
      };
    }

    await db.published.delete({
      where: { id }
    });
    revalidatePath(`/dashboard/Published`); 
   revalidatePath(`/`); 


    return {
      
      success: "Successfully Deleted"
    };
  } catch (error) {
    console.error("Error deleting Published:", error);
    return {
      error: "Failed to delete data."
    };
  }
};
