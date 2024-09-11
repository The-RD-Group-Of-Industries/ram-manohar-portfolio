/**
 * Renders a page component that displays a single blog post.
 *
 * This component fetches the blog post data using the `getBlogByID` function, and displays the content using the `DataPresent` component.
 * If the data is still being fetched, a `Loading` component is displayed.
 *
 * The blog post ID is obtained from the URL search parameters.
 */
"use client"

import { getBlogByID } from "@/core/actions/Dashboard/Blog/getBlog";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {Blog} from "@prisma/client";
import Loading from "@/components/Reusable/loadingPage";
import DataPresent from "@/components/Reusable/DataPresent";

function EachBlogs() {
    const route = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(false);
    const [data, seBlogsata] = useState<Blog | null>(null);

    useEffect(() => {
        const geBlogsata = async () => {
            try {
                setLoading(true);
                const BlogsData = await getBlogByID(id ?? "");
                seBlogsata(BlogsData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        geBlogsata();
    }, [id]);

    if (loading) {
        return <Loading/>;
    }

    return (
        <div>
           <DataPresent data={data} />
        </div>
    )
}
export default EachBlogs;
