/**
 * Deletes a work record from the database.
 *
 * @param id - The ID of the work record to delete.
 * @returns An object with either a `success` or `error` property, indicating the result of the deletion operation.
 */
"use server"
import { db } from "@/resourse";
import { revalidatePath } from "next/cache";

export const deleteWorks = async (id:string) => {
  try {
    const existingRecord = await db.works.findUnique({
      where: { id }
    });

    if (!existingRecord) {
      return {
        error: "Record not found."
      };
    }

    await db.works.delete({
      where: { id }
    });
    revalidatePath(`/dashboard/Expericence`); 
    revalidatePath(`/`); 
   console.log("ii am herer")
    return {
      
      success: "Successfully Deleted"
    };
  } catch (error) {
    console.error("Error deleting TD:", error);
    return {
      error: "Failed to delete data."
    };
  }
};

