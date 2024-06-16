"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useState } from "react";

import { Button } from "~/app/components/ui/button";
import { api } from "~/trpc/react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export function CreateTagForm() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createTag = api.tag.create.useMutation({
    onSuccess: () => {
      router.push('/admin/tags');
      setName("");
    },
  });

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTag.mutate({ name });
  }, [createTag, name])

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
    >
      <Label htmlFor="name">Name</Label>
      <Input value={name} name="name" onChange={(e) => setName(e.target.value)} placeholder="tag name" required />
      <div>
        <Button type="submit" disabled={createTag.isPending}
        >
          {createTag.isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
