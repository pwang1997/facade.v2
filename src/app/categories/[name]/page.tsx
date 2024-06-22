"use client";

import { useEffect, useState } from "react";
import PostCard from "~/app/_components/post-card";
import { type Post } from "~/app/admin/posts/_components/data-table";
import { type AssociatedTagProps } from "~/server/api/routers/post";
import { api } from "~/trpc/react";


export default function CategoryPage({ params }: { params: { name: string } }) {
    const { name } = params;

    const [posts, setPosts] = useState<Post[]>([]);
    const [associatedTags ,setAssociatedTags] = useState<AssociatedTagProps[]>();

    const getPostsByCategories = api.post.getPostsByCategoryName.useQuery({ categoryName: name });

    useEffect(() => {
        if (!getPostsByCategories.isLoading && getPostsByCategories.isSuccess) {
            setPosts(getPostsByCategories.data?.results as unknown as Post[]);
            setAssociatedTags(getPostsByCategories.data?.associatedTags as AssociatedTagProps[]);
        }
    }, [getPostsByCategories.data, getPostsByCategories.isLoading, getPostsByCategories.isSuccess])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
               posts?.map((item, idx) => {
                const tagNames = associatedTags?.filter((associatedTag) => associatedTag.postId === item.id).map(associatedTag => associatedTag?.tagName);

                    return (
                        <div key={item.id} className="animate-fadeIn rounded-md shadow-md" style={{ animationDelay: `${(idx + 1) * 200}ms ` }}>
                            <PostCard title={item.title} description="" lastUpdatedAt={item.updatedAt.toDateString()} associatedTags={tagNames!} views={0} />
                        </div>
                    )
                })
            }
        </div>
    )
}