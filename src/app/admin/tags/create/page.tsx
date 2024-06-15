import { CreateTagForm } from "../_components/create-tag";

export default async function CreateTagPage() {

  return (
    <main className="container pt-10 w-full bg-second">
      <p className=" text-4xl mb-4">Create</p>
      <CreateTagForm />
    </main>
  );
}
