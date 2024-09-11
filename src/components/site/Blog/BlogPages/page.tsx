/**
 * Renders a single blog page with the blog data fetched from the server.
 * 
 * This component is responsible for fetching the blog data based on the `id` query parameter in the URL,
 * and then rendering the blog content using the `BlogRP` component.
 * 
 * If the blog data is still being fetched, a loading indicator is displayed.
 */
"use client"

import { getBlogByID } from "@/core/actions/Dashboard/Blog/getBlog";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import BlogRP from "./renderPage";
import { Blog } from "@prisma/client";
import Loading from "@/components/Reusable/loadingPage";

function EachBlog() {
    const route = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Blog | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const blogData = await getBlogByID(id ?? "");
                setData(blogData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [id]);

    if (loading) {
        return <Loading/>;
    }

    return (
        <div>
           <BlogRP data={data} />
        </div>
    )
}
export default EachBlog;
