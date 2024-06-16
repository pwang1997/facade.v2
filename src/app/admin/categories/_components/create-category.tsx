"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useState } from "react";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

export function CreateCategoryForm() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createCategory = api.category.create.useMutation({
    onSuccess: () => {
      router.push('/admin/categories');
    },
  });

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createCategory.mutate({ name });
  }, [createCategory, name])

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
    >
      <Label htmlFor="name">Name</Label>
      <Input value={name} name="name" onChange={(e) => setName(e.target.value)} placeholder="Category name" required />
      <div>
        <Button type="submit" disabled={createCategory.isPending}
        >
          {createCategory.isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
