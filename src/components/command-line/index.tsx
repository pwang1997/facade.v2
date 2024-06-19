"use client";

import { type KeyboardEvent, useState } from "react";
import { api } from "~/trpc/react";
import { Command } from "../ui/command";
import SearchResult from "./SearchResult";


export function CommandLine() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<unknown[]>([]);
  const searchPosts = api.post.search.useQuery({ query: query }, {
    enabled: !!query
  });

  const handleOnKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await searchPosts.refetch();
      setPosts(searchPosts?.data);
    }
  };

  


  return (
    <Command className="rounded-lg border shadow-md ">
      {/* <CommandInput placeholder="Type a command or search..." onKeyDown={handleOnKeyDown} value={query} onChangeCapture={(e) => setQuery(e.currentTarget.value)} /> */}

      <div className="bg-white">
        <div className="sm:flex sm:items-start">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} id="search"
            className="bg-gray-50  block w-full p-2.5  dark:bg-gray-700  dark:placeholder-gray-400  outline-none"
            placeholder="Enter keyword for search..." onKeyDown={handleOnKeyDown} />
        </div>
      </div>
      <hr />

      {posts?.length > 0 && (
        <SearchResult keyword={query} results={posts} />
      )}

      {posts?.length === 0 && (
        <p className="flex justify-center text-md text-opacity-40">No Results Found</p>
      )}
      <hr />
      <div id="instructions" className="flex justify-end pb-4">
        <span className="text-sm">
          Confirm <kbd className="mr-5 rounded border ml-1  text-gray-600 shadow-sm  items-center"> Enter </kbd>
        </span>
      </div>
    </Command>
  )
}
