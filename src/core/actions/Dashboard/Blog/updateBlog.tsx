/**
 * Updates a blog post in the database.
 *
 * @param values - The updated blog post data.
 * @param values.id - The unique identifier of the blog post.
 * @param values - The updated fields of the blog post, excluding the id.
 * @returns An object with either a success message or an error message.
 */
"use server";
import { db } from "@/resourse"; 
import { Blog } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const UpdateBlog = async (values: Blog) => {
  try { 
    const { id, ...updateData } = values;

    const res = await db.blog.update({
      where: { id },
      data: updateData,
    });
    
    // Revalidate paths after the update
    revalidatePath(`/dashboard/Blog`); 
    revalidatePath(`/`); 

    return { success: "Update sent successfully." };
  } catch (error: unknown) {
    console.error("Failed to update blog:", error);
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
