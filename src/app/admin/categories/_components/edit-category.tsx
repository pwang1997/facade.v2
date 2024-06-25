"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { MultiSelect } from "~/components/multi-select";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { type Category } from "./data-table";

export function EditCategoryForm({ id }: { id: string }) {
    const router = useRouter();
    
    const [name, setName] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
     const [selectedParentCategoryName, setSelectedParentCategoryName] = useState<string[]>([]);

    const getCategories = api.category.list.useQuery({ offset: 0, limit: 1000 });
    const getCategoryById = api.category.getById.useQuery({ id: id });
    
    const updateCategory = api.category.update.useMutation({
        onSuccess: () => {
            router.push("/admin/categories");
        },
    })

    useEffect(() => {
        if(!getCategories.isLoading && getCategories.isSuccess) {
          setCategories(getCategories.data as unknown as Category[]);
        }
      },[getCategories.data, getCategories.isLoading, getCategories.isSuccess])

    useEffect(() => {
        if (!getCategoryById.isLoading && getCategoryById.isSuccess) {
            const data = getCategoryById.data;
            if (!!data[0]) {
                const {name, parentId} = data[0];
                setName(name)

                const parentCategoryName = categories.filter((category => category.id == String(parentId))).map(item => item.name);
                setSelectedParentCategoryName(!!parentId ? parentCategoryName : [] );
            }
        }
    }, [categories, getCategoryById.data, getCategoryById.isLoading, getCategoryById.isSuccess])

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
      <MultiSelect label="category" values={selectedParentCategoryName} onValuesChange={setSelectedParentCategoryName} data={categories} />

            <div>
                <Button type="submit" disabled={updateCategory.isPending}
                >
                    {updateCategory.isPending ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
}
