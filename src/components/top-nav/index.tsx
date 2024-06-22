
import { api } from "~/trpc/server";
import NavMenu from "./nav-menu";

export default async function TopNav() {
    const categories = await api.category.list({ offset: 0, limit: 1000 })
    const categoryNames = categories.map((item) => item.name);

    return (
        <header className='w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0 flex justify-center z-10 pt-4'>
            <NavMenu categories={categoryNames} />
        </header>
    )
}