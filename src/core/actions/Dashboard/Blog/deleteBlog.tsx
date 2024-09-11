/**
 * Deletes a blog post from the database.
 *
 * @param id - The unique identifier of the blog post to delete.
 * @returns An object with either a `success` or `error` property, indicating the result of the deletion operation.
 */
"use server"
import { db } from "@/resourse";
import { revalidatePath } from "next/cache";

export const deleteBlog = async (id:string) => {
  try {
    const existingRecord = await db.blog.findUnique({
      where: { id }
    });

    if (!existingRecord) {
      return {
        error: "Record not found."
      };
    }

    await db.blog.delete({
      where: { id }
    });
   revalidatePath(`/dashboard/Blog`); 
   revalidatePath(`/`); 
   window.location.reload()
    return {
      success : "Delete success"
  }
  } catch (error) {
    console.error("Error deleting Blog:", error);
    return {
      error: "Failed to delete data."
    };
  }
};
