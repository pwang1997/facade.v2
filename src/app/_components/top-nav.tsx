"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "~/components/ui/navigation-menu";
import GitHubIcon from "~/icons/GitHubIcon";
import { api } from "~/trpc/react";

export default function TopNav() {
  const getCategories = api.category.list.useQuery({ offset: 0, limit: 1000 });

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!getCategories.isLoading && getCategories.isSuccess) {
      const names = getCategories.data.map((item) => item.name);
      setCategories(names);
    }
  }, [getCategories.data, getCategories.isLoading, getCategories.isSuccess])

  return (
    <header className='w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0 flex justify-center z-10 pt-4'>
      <nav className='mx-auto flex max-w-4xl items-center justify-between  rounded-[24px] pl-4 pr-4 pt-2 pb-2
        bg-neutral-100 dark:bg-dark dark:text-white
        ' aria-label='Global'>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {
              categories.map((category) => {
                return (
                  <Fragment key={category}>
                    <NavigationMenuItem>
                      <Link href={`/categories/${category}`} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {category}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </Fragment>
                )
              })
            }
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/developer-notes" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dev Notes
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="https://github.com/pwang1997" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <GitHubIcon />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  )
}