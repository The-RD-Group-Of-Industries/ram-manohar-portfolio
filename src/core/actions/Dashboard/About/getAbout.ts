/**
 * Retrieves the "About" data from the database and revalidates the "/dashboard/About" and "/" paths.
 *
 * @returns {Promise<any>} The "About" data from the database.
 */
"use server";
import { db } from "@/resourse"; 
import { revalidatePath } from "next/cache";

export const getAbout = async () => {
    const res = await db.about.findFirst();
    revalidatePath(`/dashboard/About`); 
   revalidatePath(`/`); 
    return res
};