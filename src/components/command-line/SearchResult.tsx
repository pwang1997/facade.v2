import { Fragment, useCallback } from "react";
import HighlightAndTruncateText from "./HighlightAndTruncateText";

export default function SearchResult({ keyword, results }: { keyword: string, results: unknown[] }) {

    const researchResultItem = useCallback((post: unknown) => {
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
        <div className="bg-white overflow-hidden transition-all sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div
                    className="rounded-md shadow-lg bg-whitering-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <div className="py-1 flex flex-col gap-2" role="none">
                        {
                            results.map((result) => {
                                return (
                                    <Fragment key={result.postId}>
                                        {researchResultItem(result)}
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


