/**
 * Retrieves a list of works ordered by the start date in descending order.
 * This function also revalidates the `/dashboard/Expericence` and `/` paths to update the cached data.
 * @returns {Promise<{ error?: string; }>} - An object containing the list of works or an error message if the operation fails.
 */



"use server";
import { db } from "@/resourse"; 
import { revalidatePath } from "next/cache";

export const getWorks = async () => {
  try { 
    const res = await db.works.findMany({
      orderBy:{
        start: "desc"
      }
      
    });
    revalidatePath(`/dashboard/Expericence`); 
    revalidatePath(`/`); 
    console.log(res)
    return res;
  } catch (error: any) {
    console.log(error);
    return {
      error: "Fail to get data works",
    };
  }
};
/**
 * Retrieves a single work item by its ID.
 * @param {string} id - The ID of the work item to retrieve.
 * @returns {Promise<any>} - The work item with the specified ID.
 */

export const getWorkByID = async (id:string) => {
  const res = await db.works.findFirst({
      where:{
          id: id
      }
  });
  
  return res
};
