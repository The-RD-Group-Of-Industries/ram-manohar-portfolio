/**
 * Updates a TD (Task/Deadline) record in the database.
 *
 * @param values - An object containing the updated TD data, including the `id` field.
 * @returns An object with either a `success` message or an `error` message if the update failed.
 */
"use server";
import { db } from "@/resourse"; 
import { TD } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const UpdateTD = async (values: TD) => {
  try { 
    const { id, ...updateData } = values;

    const res = await db.tD.update({
      where: { id },
      data: updateData,
    });
    
    // Revalidate paths after the update
    revalidatePath(`/dashboard/TD`); 
    revalidatePath(`/`); 

    return { success: "Update sent successfully." };
  } catch (error: unknown) {
    console.error("Failed to update tD:", error);
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
        const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
        const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown field';

        return { error: `Failed to Create: A TD with this ${fieldName} already exists.` };
      }
      return { error: `Failed to Create: ${error.message}` };
    }
  }
};
