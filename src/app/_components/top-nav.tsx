"use client";

import Link from "next/link";
import { api } from "~/trpc/react";

export default function TopNav() {
    const categories = api.category.list.useQuery({ offset: 0, limit: 1000 });

    console.log(categories.data);

    return (
        <div className="h-16 flex flex-row justify-between items-center px-8 border-b">
            {
                categories.data?.map((category) => {
                    return (
                        <Link  href={`/categories/${category.name}`} className="capitalize" key={category.id}>
                            {category.name}
                        </Link>
                    )
                })
            }
        </div>
    )
}