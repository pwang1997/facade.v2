"use client";

import { Fragment, useEffect, useState } from "react";
import MarkdownRender from "~/app/_components/markdown-render";
import { type Post } from "~/app/admin/posts/_components/data-table";
import TableOfContents from "~/components/table-of-content";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { type AssociatedTagProps } from "~/server/api/routers/post";
import { api } from "~/trpc/react";

interface ToCHeadingProps {
    id: string
    level: number
    title: string
}
const extractHeadings = (markdown: string): ToCHeadingProps[] => {
    const headingRegex = /^(#{2,6})\s+(.+)$/gm;
    const headings: ToCHeadingProps[] = [];
    let match;
    while ((match = headingRegex.exec(markdown)) !== null) {
        if (!!match[1] && !!match[2]) {
            headings.push({ level: match[1].length, title: match[2], id: match[2].toLowerCase().replace(/\s+/g, '-') });
        }
    }
    return headings;
};


export default function PostPage({ params }: { params: { name: string } }) {
    const { name } = params;

    const [post, setPost] = useState<Post>();
    const [associatedTags, setAssociatedTags] = useState<AssociatedTagProps[]>();
    const [tocHeadings, setTocHeadings] = useState<ToCHeadingProps[]>([]);

    const getPostsByCategories = api.post.getPostByName.useQuery({ postName: decodeURIComponent(name) });

    useEffect(() => {
        if (!getPostsByCategories.isLoading && getPostsByCategories.isSuccess) {
            setPost(getPostsByCategories.data?.result as unknown as Post);
            setAssociatedTags(getPostsByCategories.data?.associatedTags);
        }
    }, [getPostsByCategories.data, getPostsByCategories.isLoading, getPostsByCategories.isSuccess])

    useEffect(() => setTocHeadings(extractHeadings(post?.content ?? '')), [post?.content]);

    return (
        <div className="container grid  grid-cols-12 ">
            <div className="container col-span-9 flex flex-col gap-y-4">
                <div className='text-5xl font-bold'>
                    {post?.title}
                </div>
                <div className="flex gap-x-1 dark:text-accent">
                    Zhengliang Wang edited at {post?.updatedAt.toDateString()}
                </div>
                <div className="flex flex-col gap-y-2">
                    <div className="flex gap-x-2">
                        {
                            associatedTags?.map((associatedTag) => {
                                return (
                                    <Fragment key={associatedTag.tagName}>
                                        <Badge>{associatedTag.tagName}</Badge>
                                    </Fragment>
                                )
                            })
                        }
                    </div>

                    <Separator />
                </div>
                <div>
                    <MarkdownRender content={post?.content ?? ''} />
                </div>
            </div>
            <div className="container mx-auto col-span-3 p-4">
                <TableOfContents headings={tocHeadings} />
            </div>
        </div>

    )
}