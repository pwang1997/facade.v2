"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../../components/ui/breadcrumb";

export default function AdminTopNav() {

    const pathName = usePathname();
    const paths = pathName.split("/").slice(1);

    const breadcrumHref = (idx: number) => paths.slice(0, idx + 1).join("/");

    return (
        <div className="h-16 flex flex-row justify-between items-center px-8 border-b">
            <div className="capitalize">
                <Breadcrumb>
                    <BreadcrumbList>
                        {
                            paths.map((path, idx) => {
                                return (
                                    <Fragment key={path}>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href={`/${breadcrumHref(idx)}`}>{path}</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        {idx < paths.length - 1 && <BreadcrumbSeparator />}
                                    </Fragment>
                                )
                            })
                        }
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    )
}