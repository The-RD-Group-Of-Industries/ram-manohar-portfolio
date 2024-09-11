/**
 * Retrieves a list of published research items from the database.
 * @returns {Promise<any[]>} - An array of published research items.
 */




"use server";
import { db } from "@/resourse"; 
import { revalidatePath } from "next/cache";

export const getPublishResearch = async () => {

    const res = await db.published.findMany({
      where:{
        type : "RESEARCH"
      }
    
    });
    revalidatePath(`/dashboard/Published`); 
    revalidatePath(`/`); 
    return res;
 
};
/**
 * Retrieves a list of published government items from the database.
 * @returns {Promise<any[]>} - An array of published government items.
 */

export const getPublishedGovt = async () => {
   
      const res = await db.published.findMany({
        where:{
          type : "GOVT"
        }
      
      });
    
      revalidatePath(`/dashboard/Published`); 
      revalidatePath(`/`); 
      return res;
   
  
  };
/**
 * Retrieves a published item by its ID.
 * @param {string} id - The ID of the published item to retrieve.
 * @returns {Promise<any>} - The published item with the specified ID.
 */


export const getPublishedById = async (id:string) => {
  const res = await db.published.findFirst({
      where:{
          id:id
      }
  });

  return res
};