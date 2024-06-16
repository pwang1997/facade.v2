import AdminTitle from "~/app/components/admin-title";
import { EditCategoryForm } from "../../_components/edit-category";

export default async function EditTagPage({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <>
      <AdminTitle />
      <EditCategoryForm id={id} />
    </>
  );
}
