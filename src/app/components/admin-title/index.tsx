"use client";

import { usePathname } from "next/navigation";

export default function AdminTitle() {
    const paths = usePathname();

    const title = () => {
        if (paths.includes("create")) return "create";
        else if (paths.includes("edit")) return "edit";
    }

    return (
        <p className=" text-4xl mb-4 capitalize">{title()}</p>
    )
}