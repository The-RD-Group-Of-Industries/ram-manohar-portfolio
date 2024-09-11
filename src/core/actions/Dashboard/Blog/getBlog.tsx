"use server";
import { db } from "@/resourse"; 
import { revalidatePath } from "next/cache";

export const getBlog = async () => {
    const res = await db.blog.findMany({
        orderBy: {
            trending: 'asc',
        }
    });
    revalidatePath(`/dashboard/Blog`); 
    revalidatePath(`/`); 
    return res
};


export const getBlogByType = async (type:string) => {
    const res = await db.blog.findMany({
        where:{
            type: type
        }
    });

    return res
};

export const getBlogByID = async (id:string) => {
    const res = await db.blog.findFirst({
        where:{
            id: id
        }
    });

    return res
};

