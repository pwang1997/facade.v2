"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/ui/data-table";
import { api } from "~/trpc/react";
import { columns, type Tag } from "./data-table";


export default function ListTags() {
    const listTags = api.tag.list.useQuery({ offset: 0, limit: 20 });

    if (listTags.isLoading) {
        return <div>Loading..</div>
    }

    return (
        <div>
            <DataTable data={listTags.data as unknown as Tag[]} columns={columns as ColumnDef<unknown>[]} />
        </div>
    )
}