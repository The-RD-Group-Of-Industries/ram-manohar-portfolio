/**
 * Creates a new blog post in the database.
 *
 * @param values - An object containing the blog post data, excluding the `id` field.
 * @returns An object with either a `success` message or an `error` message.
 */
"use server";
import { db } from "@/resourse"; 
import { Blog} from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createBlog = async (
  values: Omit<Blog, "id" >
) => {
  try { 
    const res = await db.blog.create({
      data: { ...values },
    });
   revalidatePath(`/dashboard/Blog`); 
   revalidatePath(`/`); 

    
    return { success: "Add sent successfully." };
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
          const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
          const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown field';
  
          return { error: `Failed to Create: A Blog with this ${fieldName} already exists.` };
      }
      return { error: `Failed to Create: ${error.message}` };
  }
  }
};
