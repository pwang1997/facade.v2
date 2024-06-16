import AdminTitle from "~/app/components/admin-title";
import { EditTagForm } from "../../_components/edit-tag";

export default async function EditTagPage({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <>
      <AdminTitle />
      <EditTagForm id={id} />
    </>
  );
}
