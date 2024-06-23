import NavMenuItem from "./nav-menu-item";

export default async function AdminSideNav() {
    return (
        <div className="h-dvh pt-16 min-w-64 overflow-y-auto bg-second dark:bg-gray-800 border border-red-100">
            <ul className="space-y-2 font-medium">
                <NavMenuItem href="/admin" name="Dashboard" />
                <NavMenuItem href="/admin/tags" name="Tags" />
                <NavMenuItem href="/admin/categories" name="Categories" />
                <NavMenuItem href="/admin/posts" name="Posts" />
            </ul>
        </div >
    )
}