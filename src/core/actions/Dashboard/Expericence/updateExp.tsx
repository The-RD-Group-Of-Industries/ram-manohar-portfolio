/**
 * Updates an existing work experience record in the database.
 *
 * @param values - The updated work experience data to be saved.
 * @returns An object with either a 'success' message or an 'error' message if the update failed.
 */
"use server";
import { db } from "@/resourse"; 
import { Works } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const UpdateWorks = async (values: Works) => {
  try { 
    const { id, ...updateData } = values;

    const res = await db.works.update({
      where: { id },
      data: updateData,
    });
    
    // Revalidate paths after the update
    revalidatePath(`/dashboard/Expericence`); 
    revalidatePath(`/`); 

    return { success: "Update sent successfully." };
  } catch (error: unknown) {
    console.error("Failed to update Expericence:", error);
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
        const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
        const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown field';

        return { error: `Failed to Create: A Expericence with this ${fieldName} already exists.` };
      }
      return { error: `Failed to Create: ${error.message}` };
    }
  }
};
