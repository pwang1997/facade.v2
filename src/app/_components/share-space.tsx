import Link from "next/link";

function SharingLink({ href, label }: { href: string; label: string }) {
    return (
        <li>
            <Link href={href}>
                {label}
            </Link>
        </li>
    )
}
export default function ShareSpace() {
    const shareSpaceItemClass = "list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400 animate-fadeIn";

    return (
        <div className="flex flex-col justify-start">
            <p className="text-2xl font-bold animate-fadeIn" style={{ animationDelay: `600ms` }}>Useful Links:</p>

            <ul className=' list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400'>
                <ul className={`${shareSpaceItemClass}`} style={{ animationDelay: `625ms` }}>
                    News
                    <SharingLink href="https://www.infoq.com/" label="InfoQ: What's Trending in Tech" />
                </ul>
                <ul className={`${shareSpaceItemClass}`} style={{ animationDelay: `650ms` }}>
                    WebDev
                    <SharingLink href="https://htmlrev.com/" label="Find HTML Templates" />
                    <SharingLink href="https://favicon.io/" label="FavIcon Generator" />
                    <SharingLink href="https://heroicons.com/" label="Heroicons: Icons In General" />
                </ul>
                <ul className={`${shareSpaceItemClass}`} style={{ animationDelay: `675ms` }}>
                    Services
                    <SharingLink href="https://upstash.com/" label="Upstash: Serverless Data Platform for Redis and Kafka" />
                    <SharingLink href="https://huggingface.co/" label="HuggingFace: Home of AI" />
                </ul>
            </ul>
        </div >
    )
}