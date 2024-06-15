import { Separator } from "~/app/components/ui/separator";
import Title from "~/app/components/ui/title";

export default async function Dashboard() {

  return (
    <main className="container mx-auto pt-10 w-full ">
      <Title label="posts" />
      <Separator />


    </main>
  );
}
