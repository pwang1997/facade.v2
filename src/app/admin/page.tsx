import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function AdminHome() {
  const session = await getServerAuthSession();
  if (session === null) {
    redirect("/api/auth/signin");
  }
  redirect("/admin/dashboard");
}
