/**
 * Indicates that this file is a Next.js client-side component, which means it will be executed on the client-side rather than the server-side.
 */
"use client"

import { getPublishedById } from "@/core/actions/Dashboard/Published/getPublish";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {Published} from "@prisma/client";
import Loading from "@/components/Reusable/loadingPage";
import DataPresent from "@/components/Reusable/DataPresent";

function EachPublished() {
    const route = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(false);
    const [data, sePublishedata] = useState<Published | null>(null);

    useEffect(() => {
        const gePublishedata = async () => {
            try {
                setLoading(true);
                const PublishedData = await getPublishedById(id ?? "");
                sePublishedata(PublishedData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        gePublishedata();
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
export default EachPublished;
