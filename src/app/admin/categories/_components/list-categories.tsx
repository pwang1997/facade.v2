"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/ui/data-table";
import { api } from "~/trpc/react";
import { type Category, columns, } from "./data-table";


export default function ListCategories() {
    const listCategories= api.category.list.useQuery({ offset: 0, limit: 20 });

    if (listCategories.isLoading) {
        return <div>Loading..</div>
    }

    return (
        <>
            <DataTable data={listCategories.data as unknown as Category[]} columns={columns as ColumnDef<unknown>[]} />
        </>
    )
}