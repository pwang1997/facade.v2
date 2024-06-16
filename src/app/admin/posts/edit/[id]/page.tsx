import AdminTitle from "~/components/admin-title";
import { EditPostForm } from "../../_components/edit-post";

export default async function EditTagPage({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <>
      <AdminTitle />
      <EditPostForm id={id} />
    </>
  );
}
