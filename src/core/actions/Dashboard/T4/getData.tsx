/**
 * Retrieves a list of TD (Technical Debt) items of type "WEB" from the database.
 * @returns {Promise<Array<TD>>} An array of TD items, or an error object if the operation fails.
 */





"use server";
import { db } from "@/resourse"; 
import { revalidatePath } from "next/cache";

export const getTDWeb = async () => {
  try { 
    const res = await db.tD.findMany({
      where:{
        type : "WEB"
      }
    
    });
  
    revalidatePath(`/dashboard/TD`);  
    revalidatePath(`/`); 
    return res;
  } catch (error: any) {
    console.log(error);
    return {
      error: "Fail to get data",
    };
  }
};
/**
 * Retrieves a list of TD (Technical Debt) items of type "STATISTICAL" from the database.
 * @returns {Promise<Array<TD>>} An array of TD items, or an error object if the operation fails.
 */

export const getTDResearch = async () => {
    try { 
      const res = await db.tD.findMany({
        where:{
          type : "STATISTICAL"
        }
      
      });
      revalidatePath(`/dashboard/TD`); 
    revalidatePath(`/`); 
      return res;
    } catch (error: any) {
      console.log(error);
      return {
        error: "Fail to get data of Research",
      };
    }
  };
  /**
 * Retrieves a single TD (Technical Debt) item by its ID from the database.
 * @param {string} id - The ID of the TD item to retrieve.
 * @returns {Promise<TD|null>} The TD item, or null if not found.
 */

  export const getTDByID = async (id:string) => {
    const res = await db.tD.findFirst({
        where:{
            id: id
        }
    });

  
    return res
  };
  