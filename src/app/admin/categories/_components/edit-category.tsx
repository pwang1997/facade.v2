"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

export function EditCategoryForm({ id }: { id: string }) {
    const [name, setName] = useState<string>("");

    const getCategoryById = api.category.getById.useQuery({ id: id });
    const router = useRouter();
    const updateCategory = api.category.update.useMutation({
        onSuccess: () => {
            router.push("/admin/categories");
        },
    })

    useEffect(() => {
        if (!getCategoryById.isLoading && getCategoryById.isSuccess) {
            const data = getCategoryById.data;
            if (!!data[0]) {
                setName(data[0]?.name)
            }
        }
    }, [getCategoryById.data, getCategoryById.isLoading, getCategoryById.isSuccess, setName])

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateCategory.mutate({ id, name });
    }, [id, name, updateCategory])


    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
        >
            <Label htmlFor="name">Name</Label>
            <Input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="category name" required />
            <div>
                <Button type="submit" disabled={updateCategory.isPending}
                >
                    {updateCategory.isPending ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
}
