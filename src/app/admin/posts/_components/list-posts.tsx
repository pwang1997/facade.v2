"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/ui/data-table";
import { api } from "~/trpc/react";
import { columns, type Post } from "./data-table";


export default function ListPosts() {
    const listPosts = api.post.list.useQuery({ offset: 0, limit: 20 });

    if (listPosts.isLoading) {
        return <div>Loading..</div>
    }

    return (
        <div>
            <DataTable data={listPosts.data as unknown as Post[]} columns={columns as ColumnDef<unknown>[]} />
        </div>
    )
}