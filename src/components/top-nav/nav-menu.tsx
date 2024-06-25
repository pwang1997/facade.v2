"use client";

import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import CommandLineIcon from "~/icons/CommandLineIcon";
import GitHubIcon from "~/icons/GitHubIcon";
import { CommandLine } from "../command-line";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";

const defaultRoutes = [
    { label: "posts", href: "posts" },
    { label: "about", href: "about" },
    { label: "dev notes", href: "developer-notes" }
]
export default function NavMenu({ categories }: { categories: string[] }) {
    const paths = usePathname();

    const [show, setShow] = useState<boolean>(false);

    if (paths.includes("admin")) return null;

    return (
        <header className='w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0 flex justify-center z-10 pt-4'>
            <nav className='mx-auto flex max-w-4xl items-center justify-between  rounded-[24px] pl-4 pr-4 pt-2 pb-2
        bg-neutral-100 dark:bg-dark dark:text-white
        ' aria-label='Global'>
                {
                    show && <CommandLine setShow={setShow} />
                }
                <NavigationMenu >
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        {
                            categories.map((category) => {
                                return (
                                    <Fragment key={category}>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink href={`/categories/${category}`} className={navigationMenuTriggerStyle()}>
                                                {category}
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    </Fragment>
                                )
                            })
                        }

                        {
                            defaultRoutes.map((route) => {
                                return (
                                    <NavigationMenuItem key={route.href}>
                                        <NavigationMenuLink href={`/${route.href}`} className={navigationMenuTriggerStyle()}>
                                            {route.label}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                )
                            })
                        }

                        <NavigationMenuItem>
                            <NavigationMenuLink href="https://github.com/pwang1997" className={navigationMenuTriggerStyle()}>
                                <GitHubIcon />
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem className="hover:cursor-pointer" onClick={() => setShow(!show)}>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <CommandLineIcon />
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </nav>
        </header>
    )
}