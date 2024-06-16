"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "~/app/components/ui/button";
import { api } from "~/trpc/react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export function EditTagForm({ id }: { id: string }) {
    const [name, setName] = useState<string>("");

    const getTagById = api.tag.getById.useQuery({ id: id });
    const router = useRouter();
    const updateTag = api.tag.update.useMutation({
        onSuccess: () => {
            router.push("/admin/tags");
        },
    })

    useEffect(() => {
        if (!getTagById.isLoading && getTagById.isSuccess) {
            const data = getTagById.data;
            if (!!data[0]) {
                setName(data[0]?.name)
            }
        }
    }, [getTagById.data, getTagById.isLoading, getTagById.isSuccess, setName])

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateTag.mutate({ id, name });
    }, [id, name, updateTag])


    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
        >
            <Label htmlFor="name">Name</Label>
            <Input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="tag name" required />
            <div>
                <Button type="submit" disabled={updateTag.isPending}
                >
                    {updateTag.isPending ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
}
