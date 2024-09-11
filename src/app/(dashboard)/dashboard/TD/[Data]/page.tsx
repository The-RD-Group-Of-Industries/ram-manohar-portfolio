/**
 * Renders a page component that displays the details of a specific TD (Technical Directive) based on the ID provided in the URL query parameters.
 *
 * The component fetches the TD data using the `getTDByID` function, and displays the data using the `DataPresent` component. If the data is still being fetched, a `Loading` component is displayed.
 *
 * @returns {JSX.Element} The rendered page component.
 */
"use client"

import { getTDByID } from "@/core/actions/Dashboard/T4/getData";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {TD} from "@prisma/client";
import Loading from "@/components/Reusable/loadingPage";
import DataPresent from "@/components/Reusable/DataPresent";

function EachTD() {
    const route = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<TD | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const TDData = await getTDByID(id ?? "");
                setData(TDData);
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
           <DataPresent data={data} />
        </div>
    )
}
export default EachTD;
