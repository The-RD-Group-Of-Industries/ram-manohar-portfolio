/**
 * Indicates that this module is intended to be used on the server-side.
 * This directive is used by Next.js to ensure that the code in this module
 * is only executed on the server and not on the client.
 */
"use server";
import { db } from "@/resourse"; 
import { Works } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createWorks = async (
  values: Omit<Works, "id">
) => {
  try { 
    const res = await db.works.create({
      data: { ...values },
    });

    revalidatePath(`/dashboard/Expericence`); 
    revalidatePath(`/`); 
    return { success: "Add sent successfully." };
  } catch (error: any) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
          const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
          const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown field';
  
          return { error: `Failed to Create: A Works with this ${fieldName} already exists.` };
      }
      return { error: `Failed to Create: ${error.message}` };
  }
  }
};
