/**
 * Renders a page for a published item, fetching the data for the published item with the provided ID.
 * 
 * The component first fetches the published item data using the `getPublishedById` function, and then renders the `PublishedRP` component with the fetched data.
 * 
 * If the data is still being fetched, the component renders a `Loading` component instead.
 */
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Published } from "@prisma/client";
import Loading from "@/components/Reusable/loadingPage";
import { getPublishedById } from "@/core/actions/Dashboard/Published/getPublish";
import PublishedRP from "./renderPage";

function EachPublication() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Published | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const blogData:any = await getPublishedById(id ?? "");
                console.log(blogData)
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
        return <Loading />;
    }

    return (
        <div>
          <PublishedRP data={data}/>
        </div>
    );
}

export default EachPublication;
