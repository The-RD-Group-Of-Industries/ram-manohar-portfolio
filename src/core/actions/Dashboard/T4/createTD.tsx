/**
 * Creates a new TD (Task or Deliverable) in the database.
 *
 * @param values - An object containing the properties of the new TD, excluding the `id` property.
 * @returns An object with either a `success` message or an `error` message.
 */
"use server";
import { db } from "@/resourse"; 
import { TD } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createTD = async (
  values: Omit<TD, "id" >
) => {
  try { 
    const res = await db.tD.create({
      data: { ...values },
    });
    revalidatePath(`/dashboard/TD`); 
    revalidatePath(`/`); 
    
    return { success: "Add sent successfully." };
  } catch (error: any) {
    console.log(error);

    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
          const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
          const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown field';
  
          return { error: `Failed to Create: A T4D with this ${fieldName} already exists.` };
      }
      return { error: `Failed to Create: ${error.message}` };
  }
  


  return { error: "Failed to Create: An unknown error occurred." };
  }
};
