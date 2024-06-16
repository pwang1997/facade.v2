"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useState } from "react";

import MarkdownEditor from "~/components/markdown-editor";
import { MultiSelect } from "~/components/multi-select";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { api } from "~/trpc/react";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { type Category } from "../../categories/_components/data-table";
import { type Tag } from "../../tags/_components/data-table";


export const getIdsByNames = (data: Category[] | Tag[], names: string[]) => {
  return data?.filter((item) => names.includes(String(item?.name))).map(item => item?.id);
}

export function CreatePostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(false);
  const [content, setContent] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const getTags = api.tag.list.useQuery({ offset: 0, limit: 1000 });
  const getCategories = api.category.list.useQuery({ offset: 0, limit: 1000 });

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.push('/admin/posts');
    },
  });

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createPost.mutate({
      title, published, content,
      categoryIds: getIdsByNames(getCategories?.data as unknown as Category[], selectedCategoryIds) as unknown as number[],
      tagIds: getIdsByNames(getTags?.data as unknown as Tag[], selectedTagIds) as unknown as number[],
    });
  }, [content, createPost, getCategories?.data, getTags?.data, published, selectedCategoryIds, selectedTagIds, title])

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
    >
      <Label htmlFor="title">Title</Label>
      <Input value={title} name="title" onChange={(e) => setTitle(e.target.value)} placeholder="Post title" required />

      <Label htmlFor="published">Published</Label>
      <Switch name="published" checked={published} onCheckedChange={() => setPublished(!published)} />

      <MultiSelect label="tags" values={selectedTagIds} onValuesChange={setSelectedTagIds} data={getTags?.data as unknown[] as Tag[]} />

      <MultiSelect label="category" values={selectedCategoryIds} onValuesChange={setSelectedCategoryIds} data={getCategories?.data as unknown[] as Category[]} />

      <Label htmlFor="content">Content</Label>
      <MarkdownEditor content={content} setContent={setContent} />

      <div>
        <Button type="submit" disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
