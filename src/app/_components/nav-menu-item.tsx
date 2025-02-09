import Link from "next/link";

interface NavMenuItemProps {
    href: string;
    name: string;
    icon?: React.ReactNode
}
export default function NavMenuItem({ href, name, icon }: NavMenuItemProps) {
    return (
        <li className="flex items-center p-2 text-gray-900 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Link href={href}>
                <div>{icon}</div>
                <span className="ms-3">{name}</span>
            </Link>
        </li>
    )
}