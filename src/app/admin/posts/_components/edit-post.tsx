"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import MarkdownEditor from "~/components/markdown-editor";
import { MultiSelect } from "~/components/multi-select";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { api } from "~/trpc/react";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { type Category } from "../../categories/_components/data-table";
import { type Tag } from "../../tags/_components/data-table";
import { getIdsByNames } from "./create-post";

export function EditPostForm({ id }: { id: string }) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [published, setPublished] = useState(false);
    const [content, setContent] = useState("");
    const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);
    const [selectedCategoryNames, setSelectedCategoryNames] = useState<string[]>([]);

    const getTags = api.tag.list.useQuery({ offset: 0, limit: 1000 });
    const getCategories = api.category.list.useQuery({ offset: 0, limit: 1000 });
    const getPost = api.post.getById.useQuery({ id: id });

    const getPostTagAssn = api.tag.getPostTagAssn.useQuery({ postId: id });
    const getPostCategoryAssn = api.category.getPostCategoryAssn.useQuery({ postId: id });

    const updatePost = api.post.update.useMutation({
        onSuccess: () => {
            router.push("/admin/posts");
        },
    })


    useEffect(()=> {
        if (!getPostTagAssn.isLoading && getPostTagAssn.isSuccess && getTags.isSuccess) {
            const tagIds = getPostTagAssn.data.map((item) => String(item.tagId));
            const tagNames = getTags.data.filter((item) => tagIds.includes(String(item.id))).map(item => item.name);
            setSelectedTagNames(tagNames)
        }
    },[getPostTagAssn.data, getPostTagAssn.isLoading, getPostTagAssn.isSuccess, getTags.data, getTags.isSuccess])

    useEffect(()=> {
        if (!getPostCategoryAssn.isLoading && getPostCategoryAssn.isSuccess && getCategories.isSuccess) {
            const categoryIds = getPostCategoryAssn.data.map((item) => String(item.categoryId));
            const categoryNames = getCategories.data.filter((item) => categoryIds.includes(String(item.id))).map(item => item.name);
            setSelectedCategoryNames(categoryNames);
        }
    },[getCategories.data, getCategories.isSuccess, getPostCategoryAssn.data, getPostCategoryAssn.isLoading, getPostCategoryAssn.isSuccess])

    useEffect(() => {
        if (!getPost.isLoading && getPost.isSuccess) {
            const data = getPost.data;
            if (!!data[0]) {
                setTitle(data[0]?.title);
                setPublished(data[0]?.published ?? false);
                setContent(data[0]?.content);
            }
        }
    }, [getPost.data, getPost.isLoading, getPost.isSuccess])


    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updatePost.mutate({
            id,
            title, published, content,
            categoryIds: getIdsByNames(getCategories?.data as unknown as Category[], selectedCategoryNames) as unknown as number[],
            tagIds: getIdsByNames(getTags?.data as unknown as Tag[], selectedTagNames) as unknown as number[],
        });
    }, [content, getCategories?.data, getTags?.data, id, published, selectedCategoryNames, selectedTagNames, title, updatePost])


    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
        >
            <Label htmlFor="title">Title</Label>
            <Input value={title} name="title" onChange={(e) => setTitle(e.target.value)} placeholder="Post title" required />

            <Label htmlFor="published">Published</Label>
            <Switch name="published" checked={published} onCheckedChange={() => setPublished(!published)} />

            <MultiSelect label="tags" values={selectedTagNames} onValuesChange={setSelectedTagNames} data={getTags?.data as unknown[] as Tag[]} />

            <MultiSelect label="category" values={selectedCategoryNames} onValuesChange={setSelectedCategoryNames} data={getCategories?.data as unknown[] as Category[]} />

            <Label htmlFor="content">Content</Label>
            <MarkdownEditor content={content} setContent={setContent} />

            <div>
                <Button type="submit" disabled={updatePost.isPending}
                >
                    {updatePost.isPending ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
}
