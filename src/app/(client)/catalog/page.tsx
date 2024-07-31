import Link from "next/link";
import { api } from "~/trpc/server";
import { buildNestedStructure, groupPostsByCategoryId } from "./utils";

export default async function CatelogsPage() {

  const getPostCatelogs = await api.post.getPostCatelogs({});

  const postsGroupByCategoryId = groupPostsByCategoryId(getPostCatelogs as {
    postId: number;
    title: string;
    categoryId: number;
  }[]);

  const getCategories = await api.category.list({ limit: 1000, offset: 0 });

  const nestedCategories = buildNestedStructure(getCategories);

  return (
    <div className="">
      {
        nestedCategories.map((categories) => {
          return (
            <div className="capitalize" key={categories.name}>
              <Link href={`/categories/${categories.name}`}>
                <p className=" text-2xl">{categories.name}</p>
              </Link>
              <ul className="list-disc">
                {
                  categories.children?.map((category) => {
                    return (
                      <li className="ml-5" key={category.name}>
                        <Link href={`/categories/${category.name}`}>
                          <p className=" text-lg">{category.name}</p>
                        </Link>
                        <ul className="list-disc" key={category.id}>
                          {
                            postsGroupByCategoryId[category.id]?.map((post, key) => {
                              return (
                                <li className="ml-5 hover:bg-secondary" key={key}>
                                  <Link href={`/posts/${post.title}`}>{post.title}</Link>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        })
      }
    </div>
  );
}
