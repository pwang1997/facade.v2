"use client"

import {
  type ColumnDef
} from "@tanstack/react-table"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { api } from "~/trpc/react"

export type Post = {
  id: string
  title: string
  published : boolean
  content : string
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<Post>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const tag = row.original;
      return (
        <DataTableAction id={tag.id} />
      )
    },
  },
]


function DataTableAction({ id }: { id: string }) {
  const deleteTag = api.tag.delete.useMutation();
  const pathName = usePathname();

  const handleDelete = (id: number) => {
    deleteTag.mutate({ id });
  };
  return (
    <>
      <Button variant="ghost" onClick={() => handleDelete(Number(id))}>delete</Button>
      <Link href={`${pathName}/edit/${id}`}>
        <Button variant="ghost">edit</Button>
      </Link>
    </>
  )
}