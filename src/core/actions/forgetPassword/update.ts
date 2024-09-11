/**
 * Updates the password for a user with the provided email address.
 *
 * @param email - The email address of the user whose password should be updated.
 * @param previousPassword - The user's current password.
 * @param newPassword - The new password to be set for the user.
 * @returns An object with either a `success` or `error` property, indicating the result of the password update operation.
 */
"use server";
import { db } from "@/resourse";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const UpdatePassword = async ({ email,previousPassword, newPassword }: { email:string,previousPassword:string, newPassword: string }) => {
  try {

    // Fetch the user with the provided email
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "User not found." };
    }

    // Compare the provided previousPassword with the stored previousPassword
    if (previousPassword !== user.password) {
      return { error: "Incorrect previous previousPassword." };
    }

    // Update the previousPassword
    const updatedUser = await db.user.update({
      where: { email },
      data: { password: newPassword },
    });

    // Revalidate paths after the update
    revalidatePath(`/forgotPassword`);
    revalidatePath(`/`);

    return { success: "Password updated successfully." };
  } catch (error: unknown) {
    console.error("Failed to update Password:", error);
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
        const fieldNameMatch = error.message.match(/fields: \(`(.*?)`\)/);
        const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown field';

        return { error: `Failed to update: A record with this ${fieldName} already exists.` };
      }
      return { error: `Failed to update: ${error.message}` };
    }
  }
};
