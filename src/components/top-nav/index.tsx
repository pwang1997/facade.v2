
import { api } from "~/trpc/server";
import NavMenu from "./nav-menu";

export default async function TopNav() {
    const categories = await api.category.list({ offset: 0, limit: 1000 })
    const categoryNames = categories.map((item) => item.name);


    return (
        <NavMenu categories={categoryNames} />
    )
}