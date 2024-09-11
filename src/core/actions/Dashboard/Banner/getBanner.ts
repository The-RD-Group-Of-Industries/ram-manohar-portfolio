/**
 * Retrieves the banner data from the database and revalidates the `/dashboard/Banner` and `/` paths.
 *
 * @returns {Promise<any>} The banner data from the database.
 */
"use server";
import { db } from "@/resourse"; 
import { revalidatePath } from "next/cache";

export const getBanner = async () => {
    const res = await db.banner.findFirst();
    revalidatePath(`/dashboard/Banner`); 
   revalidatePath(`/`); 
    return res
};