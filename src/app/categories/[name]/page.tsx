import PostCard from "~/app/_components/post-card";
import { api } from "~/trpc/server";

export default async function CategoryPage({ params }: { params: { name: string } }) {
    const { name } = params;

    const postsByCategoryName = await api.post.getPostsByCategoryName({ categoryName: name });
    const { results, associatedTags } = postsByCategoryName;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
                results?.map((item, idx) => {
                    const tagNames = associatedTags?.filter((associatedTag) => associatedTag.postId === item.id).map(associatedTag => associatedTag?.tagName);

                    return (
                        <div key={item.id} className="animate-fadeIn rounded-md shadow-md" style={{ animationDelay: `${(idx + 1) * 200}ms ` }}>
                            <PostCard title={item.title} description="" lastUpdatedAt={item.updatedAt.toDateString()} associatedTags={tagNames} views={0} />
                        </div>
                    )
                })
            }
        </div>
    )
}