"use client";

import { type Dispatch, Fragment, type KeyboardEvent, type MouseEvent, type SetStateAction, useCallback, useRef, useState } from "react";
import { api } from "~/trpc/react";
import { Command, CommandEmpty, CommandInput, CommandList } from "../ui/command";
import SearchResult from "./SearchResult";

export type SearchDataProps = {
  postId: number;
  title: string;
  content: string;
  category: string;
}

export function CommandLine({ setShow }: { setShow: Dispatch<SetStateAction<boolean>> }) {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<Record<string, SearchDataProps[]>>();

  const draggableRef = useRef<HTMLDivElement>(null);


  const searchPosts = api.post.search.useQuery({ query: query }, {
    enabled: !!query
  });

  const handleOnKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await searchPosts.refetch();

      const data = searchPosts?.data as SearchDataProps[];

      const groupByCategory = data?.reduce((acc, post) => {
        const { category } = post;
        if (!Object.keys(acc).includes(category)) {
          acc[category] = [];
        }
        acc[category]?.push(post);
        return acc;
      }, {} as Record<string, SearchDataProps[]>);

      setPosts(groupByCategory);
    }
  };

  const handleClose = useCallback((event: MouseEvent) => {
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
    <div className={`hidden fixed inset-0 bg-gray-800 bg-opacity-75 sm:flex items-center z-50 w-screen  h-screen flex-col`} onClick={handleClose}
      onKeyDown={(e) => { if (e.key === 'Escape') setShow(false) }}>
      <div ref={draggableRef}>
        <div className="bg-white overflow-hidden transition-all sm:max-w-lg sm:w-full hover:cursor-pointer mx-auto w-xl rounded-lg mt-16" style={{ width: "100vw" }}>


          <Command className="rounded-lg border shadow-md " shouldFilter={false}>
            <CommandInput placeholder="Type a command or search..." value={query} onChangeCapture={(e) => setQuery((e.currentTarget as HTMLInputElement).value)}
              onKeyDown={handleOnKeyDown}
            />

            <CommandList>
              {!!posts && Object.keys(posts)?.length > 0 && (
                Object.keys(posts ?? {}).map((category) => {
                  return (
                    <Fragment key={category}>
                      <SearchResult keyword={query} category={category} results={posts[category]!} />
                    </Fragment>

                  )
                })
              )}

              {Object.keys(posts ?? {})?.length === 0 && (
                <CommandList >
                  <CommandEmpty>No results found.</CommandEmpty>
                </CommandList>
              )}

            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  )
}
