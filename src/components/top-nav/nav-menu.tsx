"use client";

import { Fragment, useCallback, useRef, useState } from "react";
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
    const draggableRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState<boolean>(false);

    const handleClose = useCallback((event: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = event;

        const isWithinComponent = (x: number, y: number) => {
            if (!!draggableRef.current) {
                const rect = draggableRef.current?.getBoundingClientRect();
                return (
                    x >= rect?.left && x <= rect?.right && y >= rect?.top && y <= rect?.bottom
                );
            }
            return false;
        };

        if (!isWithinComponent(clientX, clientY)) {
            setShow(false);
        }
    }, [setShow])

    return (
        <nav className='mx-auto flex max-w-4xl items-center justify-between  rounded-[24px] pl-4 pr-4 pt-2 pb-2
        bg-neutral-100 dark:bg-dark dark:text-white
        ' aria-label='Global'>
            {
                show && (
                    <div className={`hidden fixed inset-0 bg-gray-800 bg-opacity-75 sm:flex items-center z-50 w-screen  h-screen flex-col`} onClick={handleClose}
                        onKeyDown={(e) => { if (e.key === 'Escape') setShow(false) }}>
                        <div ref={draggableRef}>
                            <div className="bg-white overflow-hidden transition-all sm:max-w-lg sm:w-full hover:cursor-pointer mx-auto w-xl rounded-lg mt-16" style={{ width: "100vw" }}>
                                <CommandLine />
                            </div>
                        </div>
                    </div>
                )
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
    )
}