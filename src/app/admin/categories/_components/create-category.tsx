"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useEffect, useState } from "react";

import { MultiSelect } from "~/components/multi-select";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { type Category } from "./data-table";

export function CreateCategoryForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedParentCategoryName, setSelectedParentCategoryName] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const getCategories = api.category.list.useQuery({ offset: 0, limit: 1000 });
  
  const createCategory = api.category.create.useMutation({
    onSuccess: () => {
      router.push('/admin/categories');
    },
  });

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parentCategoryId = categories.filter((category => category.name === selectedParentCategoryName[0])).map(item => item.id)[0];

    createCategory.mutate({ name : name, parentId : !!parentCategoryId ? Number(parentCategoryId) : undefined});
  }, [categories, createCategory, name, selectedParentCategoryName])

  useEffect(() => {
    if(!getCategories.isLoading && getCategories.isSuccess) {
      setCategories(getCategories.data as unknown as Category[]);
    }
  },[getCategories.data, getCategories.isLoading, getCategories.isSuccess])

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
    >
      <Label htmlFor="name">Name</Label>
      <Input value={name} name="name" onChange={(e) => setName(e.target.value)} placeholder="Category name" required />
      <MultiSelect label="category" values={selectedParentCategoryName} onValuesChange={setSelectedParentCategoryName} data={categories} />
      
      <div>
        <Button type="submit" disabled={createCategory.isPending}
        >
          {createCategory.isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
