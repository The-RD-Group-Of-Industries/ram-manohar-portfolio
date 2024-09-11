/**
 * Updates the published data in the database and revalidates the relevant paths.
 *
 * @param values - The updated published data to be saved.
 * @returns An object with either a 'success' message or an 'error' message.
 */
"use server";
import { db } from "@/resourse"; 
import { Published } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const UpdatePublished = async (values: Published) => {
  try { 
    const { id, ...updateData } = values;

    const res = await db.published.update({
      where: { id },
      data: updateData,
    });
    
    // Revalidate paths after the update
    revalidatePath(`/dashboard/Published`); 
    revalidatePath(`/`); 

    return { success: "Update sent successfully." };
  } catch (error: unknown) {
    console.error("Failed to update published:", error);
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
        const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
        const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown field';

        return { error: `Failed to Create: A Publish with this ${fieldName} already exists.` };
      }
      return { error: `Failed to Create: ${error.message}` };
    }
  }
};
