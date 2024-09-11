/**
 * Creates a new published record in the database.
 *
 * @param values - An object containing the data for the new published record, excluding the `id` field.
 * @returns An object with either a `success` message or an `error` message if the creation failed.
 */
"use server";
import { db } from "@/resourse"; 
import { Published} from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createPublish = async (
  values: Omit<Published, "id" >
) => {
  try { 
    const res = await db.published.create({
      data: { ...values },
    });
   revalidatePath(`/dashboard/Published`); 
   revalidatePath(`/`); 

    
    return { success: "Add sent successfully." };
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
          const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
          const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown field';
  
          return { error: `Failed to Create: A publish with this ${fieldName} already exists.` };
      }
      return { error: `Failed to Create: ${error.message}` };
  }
  }
};
