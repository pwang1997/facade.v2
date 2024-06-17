
import Link from 'next/link';

interface SubMenuItemProp {
  href: string;
  name: string;
  description?: string;
}

interface NavBarItemProps {
  name?: string;
  children?: React.ReactNode;
  href?: string;
  subMenuItems?: SubMenuItemProp[];
}

export default function NavBarItem({ name, children, href, subMenuItems = [] }: NavBarItemProps) {
  const renderNavItem = () => {
    return (
      <Link href={href!} className='text-sm flex items-center font-semibold rounded-lg p-2 hover:bg-white-hover dark:bg-dark dark:text-white dark:hover:bg-dark-hover'>
        <button>
          {children ?? name}
        </button>
      </Link>
    );
  };



  return <div>{subMenuItems.length > 0  && renderNavItem()}</div>;
}
