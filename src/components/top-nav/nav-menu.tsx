"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import CommandLineIcon from "~/icons/CommandLineIcon";
import GitHubIcon from "~/icons/GitHubIcon";
import { type NestedCategory } from ".";
import { CommandLine } from "../command-line";
import { ListItem, NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../ui/navigation-menu";

const defaultRoutes = [
    { label: "posts", href: "posts" },
    { label: "about", href: "about" },
    { label: "dev notes", href: "developer-notes" }
]

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export default function NavMenu({ categories, }: { categories: NestedCategory[] }) {
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
                                if (category?.children?.length === 0) {
                                    return (
                                        <NavigationMenuItem key={category.id}>
                                            <NavigationMenuLink href={`/categories/${category.name}`} className={navigationMenuTriggerStyle()}>
                                                {category.name}
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    )
                                } else {
                                    return (
                                        <NavigationMenuItem key={category.id}>
                                            <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                                    {category.children.map((component) => (
                                                        <ListItem
                                                            key={component.id}
                                                            title={component.name}
                                                            href={`/categories/${component.name}`}
                                                        />
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    )
                                }
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