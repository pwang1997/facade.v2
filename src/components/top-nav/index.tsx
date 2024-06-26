
import { type Category } from "~/app/admin/categories/_components/data-table";
import { api } from "~/trpc/server";
import NavMenu from "./nav-menu";

export type NestedCategory = {
    children : Category[]
} & Category;

export default async function TopNav() {
    const categories = await api.category.list({ offset: 0, limit: 1000 });
    const topCategories = categories.filter(category => category.parentId === null);

    const nestedCategories : NestedCategory[]  = [];
    topCategories.forEach(category => {
        const childCategories = categories.filter(item => item.parentId === category.id);
        nestedCategories.push({...category, children : childCategories});
    })

    return (
        <NavMenu categories={nestedCategories} />
    )
}