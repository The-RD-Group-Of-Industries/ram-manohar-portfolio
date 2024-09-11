/**
 * This component is responsible for rendering a blog page based on the specified blog type.
 * It fetches the blog data for the given type using the `getBlogByType` function, and displays the blog content using the `BlogType` component.
 * The component also includes a `Footer` component at the end of the page.
 * If the data is still being fetched, a `Loading` component is displayed.
 */
"use client";

import { getBlogByType } from "@/core/actions/Dashboard/Blog/getBlog";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Blog } from "@prisma/client";
import Loading from "@/components/Reusable/loadingPage";
import BlogType from "@/components/site/Blog/BlogPages/type/page";
import AOS from "aos";
import Footer from "@/components/site/Footer/page";

function TypeBlog() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Blog[] | null>(null);
    useEffect(() => {
        AOS.init({
          duration: 800, // Animation duration in milliseconds
          once: true,    // Whether animation should happen only once - while scrolling down
        });
      }, []);
      useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true); 
                console.log(type)
                const blogData = await getBlogByType(type ?? "");
                console.log(blogData)
                console.log("runding")
                setData(blogData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [type]);

    if (loading) {
        return <Loading/>;
    }

    return (
        <div>
        
           <BlogType data={data} />
           <Footer/>

        </div>
    )
}

export default TypeBlog;
