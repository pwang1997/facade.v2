"use client";

import { useEffect, useState } from "react";
import PostCard from "~/app/_components/post-card";
import { type Post } from "~/app/admin/posts/_components/data-table";
import { api } from "~/trpc/react";

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  // const [associatedTags ,setAssociatedTags] = useState<unknown[]>();

  const getPostsByCategories = api.post.list.useQuery({});

  useEffect(() => {
    if (!getPostsByCategories.isLoading && getPostsByCategories.isSuccess) {
      setPosts(getPostsByCategories.data as unknown as Post[]);
      // setAssociatedTags(associatedTags as unknown[]);
    }
  }, [getPostsByCategories.data, getPostsByCategories.isLoading, getPostsByCategories.isSuccess])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {
        posts?.map((item, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return

          return (
            <div key={item.id} className="animate-fadeIn rounded-md shadow-md" style={{ animationDelay: `${(idx + 1) * 200}ms ` }}>
              <PostCard title={item.title} description="" lastUpdatedAt={item.updatedAt.toDateString()} associatedTags={[]} views={0} />
            </div>
          )
        })
      }
    </div>
  );
}
