/**
 * Deletes a record from the `tD` table in the database.
 *
 * @param id - The unique identifier of the record to be deleted.
 * @returns An object with either a `success` or `error` property, indicating the result of the operation.
 */
"use server"
import { db } from "@/resourse";
import { revalidatePath } from "next/cache";

export const deleteTD = async (id:string) => {
  try {
    const existingRecord = await db.tD.findUnique({
      where: { id }
    });

    if (!existingRecord) {
      return {
        error: "Record not found."
      };
    }

    await db.tD.delete({
      where: { id }
    });
    revalidatePath(`/dashboard/TD`); 
    revalidatePath(`/`); 


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
