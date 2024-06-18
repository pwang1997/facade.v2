"use client";

import { Fragment, useEffect, useState } from "react";
import MarkdownRender from "~/app/_components/markdown-render";
import { type Post } from "~/app/admin/posts/_components/data-table";
import { type Tag } from "~/app/admin/tags/_components/data-table";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/react";

export default function PostPage({ params }: { params: { name: string } }) {
    const { name } = params;

    const [post, setPost] = useState<Post>();
    const [associatedTags, setAssociatedTags] = useState<Tag[]>();

    const getPostsByCategories = api.post.getPostByName.useQuery({ postName: decodeURIComponent(name) });

    useEffect(() => {
        if (!getPostsByCategories.isLoading && getPostsByCategories.isSuccess) {
            const { result, associatedTags } = getPostsByCategories.data;

            setPost(result as unknown as Post);
            setAssociatedTags(associatedTags as unknown[]);
        }
    }, [getPostsByCategories.data, getPostsByCategories.isLoading, getPostsByCategories.isSuccess])
    return (
        <div className="container flex flex-col gap-y-4">
            <div>
                <p className='text-5xl font-bold'>{post?.title}</p>
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

            <div className="flex gap-x-1 dark:text-accent">
                <div>Zhengliang Wang edited at {post?.updatedAt.toDateString()}</div>
            </div>
            <div className="">
                <MarkdownRender content={post?.content ?? ''} />
            </div >
        </div>
    )
}