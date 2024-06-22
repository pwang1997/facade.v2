import { useCallback } from "react";
import { type SearchDataProps } from ".";
import { CommandGroup, CommandItem } from "../ui/command";
import HighlightAndTruncateText from "./HighlightAndTruncateText";

export default function SearchResult({ keyword, category, results }: { keyword: string, category: string, results: SearchDataProps[] }) {

    const researchResultItem = useCallback((post: SearchDataProps) => {
        return (
            <a href={`/posts/${post.title}`} className="flex flex-col px-4 py-2 hover:bg-bright-second">
                <div className="font-bold">
                    <HighlightAndTruncateText text={post.title} keyword={keyword} maxLength={20} />
                </div>

                <div className="line-clamp-2">
                    <HighlightAndTruncateText text={post.content} keyword={keyword} maxLength={100} />
                </div>
            </a>
        )
    }, [keyword]);


    return (
        <CommandGroup heading={category.toUpperCase()}>
            {
                results?.map((post, idx) => {
                    return (
                        <CommandItem key={idx}>
                            {researchResultItem(post)}
                        </CommandItem>
                    )
                })
            }

        </CommandGroup>
    )
}


