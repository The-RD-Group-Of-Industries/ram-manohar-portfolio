/**
 * Retrieves the user's CV from the database and revalidates the `/dashboard/CV` and `/` paths.
 *
 * @returns {Promise<any>} The user's CV data from the database.
 */
"use server";
import { db } from "@/resourse"; 
import { revalidatePath } from "next/cache";

export const getCV = async () => {
    const res = await db.cV.findFirst();
    revalidatePath(`/dashboard/CV`); 
   revalidatePath(`/`); 
    return res
};