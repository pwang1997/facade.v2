import AdminTitle from "~/app/components/admin-title";
import { CreateTagForm } from "../_components/create-tag";

export default async function CreateTagPage() {

  return (
    <main className="container pt-10 w-full bg-second">
      <AdminTitle />
      <CreateTagForm />
    </main>
  );
}
