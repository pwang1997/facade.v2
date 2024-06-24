/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import { Fragment, type KeyboardEvent, useState } from "react";
import { api } from "~/trpc/react";
import { Command, CommandEmpty, CommandInput, CommandList } from "../ui/command";
import SearchResult from "./SearchResult";

export type SearchDataProps = {
  postId: number;
  title: string;
  content: string;
  category: string;
}

export function CommandLine() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<Record<string, SearchDataProps[]>>();
  const searchPosts = api.post.search.useQuery({ query: query }, {
    enabled: !!query
  });

  const handleOnKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await searchPosts.refetch();

      const data = searchPosts?.data as SearchDataProps[];

      const groupByCategory  =  data?.reduce((acc, post) => {
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



  return (
    <Command className="rounded-lg border shadow-md " shouldFilter={false}>
      <CommandInput placeholder="Type a command or search..." value={query}  onChangeCapture={(e) => setQuery((e.currentTarget as HTMLInputElement).value)}
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
  )
}
