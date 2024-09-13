import Link from "next/link";
import GitHubIcon from "~/icons/GitHubIcon";

export default function Footer() {
    return (
        <footer className="container mx-auto dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-center">
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-primary sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="/" className="hover:underline me-4 md:me-6">Home</a>
                        </li>
                        {/* <li>
                            <a href="/posts" className="hover:underline me-4 md:me-6">Posts</a>
                        </li> */}
                        <li>
                            <a href="/about" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="/developer-notes" className="hover:underline">Dev Notes</a>
                        </li>
                        <li>
                            <Link href="https://github.com/pwang1997">
                                <GitHubIcon />
                            </Link>
                        </li>
                    </ul>
                </div>
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://www.linkedin.com/in/puck-wang-2020/" className="hover:underline">Puck Wang</a>. All Rights Reserved.</span>
            </div>
        </footer>


    )

}