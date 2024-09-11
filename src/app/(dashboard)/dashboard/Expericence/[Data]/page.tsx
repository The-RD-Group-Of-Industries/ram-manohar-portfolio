/**
 * Renders a component that displays the details of a specific work item.
 *
 * This component uses the `getWorkByID` function from `@/core/actions/Dashboard/Expericence/getExp` to fetch the data for a work item based on the `id` query parameter in the URL. It then renders the fetched data using the `DataPresent` component.
 *
 * If the data is still being fetched, the component will render a `Loading` component instead.
 *
 * @returns {JSX.Element} The rendered component.
 */
"use client"

import { getWorkByID } from "@/core/actions/Dashboard/Expericence/getExp";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {Works} from "@prisma/client";
import Loading from "@/components/Reusable/loadingPage";
import DataPresent from "@/components/Reusable/DataPresent";

function EachWorks() {
    const route = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [loading, setLoading] = useState(false);
    const [data, seWorksata] = useState<Works | null>(null);

    useEffect(() => {
        const geWorksata = async () => {
            try {
                setLoading(true);
                const WorksData = await getWorkByID(id ?? "");
                seWorksata(WorksData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        geWorksata();
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
export default EachWorks;
