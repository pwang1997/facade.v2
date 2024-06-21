"use client";

import Link from "next/link";
import { Fragment, type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { CommandLine } from "~/components/command-line";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "~/components/ui/navigation-menu";
import CommandLineIcon from "~/icons/CommandLineIcon";
import GitHubIcon from "~/icons/GitHubIcon";
import { api } from "~/trpc/react";

export default function TopNav() {
  const getCategories = api.category.list.useQuery({ offset: 0, limit: 1000 });

  const draggableRef = useRef(null);

  const [categories, setCategories] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);


  useEffect(() => {
    if (!getCategories.isLoading && getCategories.isSuccess) {
      const names = getCategories.data.map((item) => item.name);
      setCategories(names);
    }
  }, [getCategories.data, getCategories.isLoading, getCategories.isSuccess])


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
    <header className='w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0 flex justify-center z-10 pt-4'>
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
              <Link href="/posts" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Posts
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
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