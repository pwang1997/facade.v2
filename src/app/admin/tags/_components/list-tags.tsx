"use client";

import { DataTable } from "~/app/components/ui/data-table";
import { api } from "~/trpc/react";
import { columns, data } from "./data-table";


export default function ListTags() {
    const listTags = api.tag.list.useQuery({ offset: 0, limit: 20 });

    console.log(listTags.data);

    if (listTags.isLoading) {
        return <div>Loading..</div>
    }

    return (
        <div>
            <DataTable data={data} columns={columns} />
        </div>
    )
}