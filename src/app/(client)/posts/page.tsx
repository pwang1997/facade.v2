import PostCard from "~/app/_components/post-card";
import { api } from "~/trpc/server";

export default async function PostsPage() {
  const getPostsByCategories = await api.post.list({});
  const postIds = getPostsByCategories.map(post => String(post.id));
  const postTagAssnsGroupByPostId = await api.tag.getPostTagAssnsGroupByPostId({postIds : postIds});

  const getAssociatedTagNames = (postId : number) => {
    return postTagAssnsGroupByPostId[postId]?.map(item => item.tagName);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {
        getPostsByCategories?.map((item, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return (
            <div key={item.id} className="animate-fadeIn rounded-md shadow-md" style={{ animationDelay: `${(idx + 1) * 200}ms ` }}>
              <PostCard title={item.title} description="" lastUpdatedAt={item.updatedAt.toDateString()} associatedTags={getAssociatedTagNames(item.id)!} views={0} />
            </div>
          )
        })
      }
    </div>
  );
}
