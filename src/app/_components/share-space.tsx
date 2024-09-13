import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

function SharingLink({ href, label }: { href: string; label: string }) {
    return (
        <li >
            <Link className="hover:text-violet-600" href={href}>
                {label}
            </Link>
        </li>
    )
}

function SharingBlock({ title, children }: { title: string, children: any }) {
    return (
        <Card className="text-md font-bold">
            <CardHeader>
                <CardTitle >
                    {title}
                </CardTitle>

                <CardContent className='line-clamp-3 text-sm font-semibold  text-gray-900 dark:bg-medium dark:text-white'>
                    {children}
                </CardContent>
            </CardHeader>
        </Card>
    )
}
export default function ShareSpace() {
    // const shareSpaceItemClass = "list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400 animate-fadeIn";

    return (
        <div className="flex flex-col justify-start">
            <p className="text-xl font-bold pb-2" style={{ animationDelay: `0` }}>Daily Dev Links:</p>

            <div className="grid md:grid-rows-2  sm:grid-rows-1 md:grid-flow-col sm:grid-flow-row sm:pr-4 gap-4">
                <SharingBlock title="News">
                    <SharingLink href="https://www.infoq.com/" label="InfoQ: What's Trending in Tech" />
                </SharingBlock>

                <SharingBlock title="WebDev Toolkits">
                    <SharingLink href="https://htmlrev.com/" label="Find HTML Templates" />
                    <SharingLink href="https://favicon.io/" label="FavIcon Generator" />
                    <SharingLink href="https://heroicons.com/" label="Heroicons: Icons In General" />
                </SharingBlock>

                <SharingBlock title="Cloud Services">
                    <SharingLink href="https://upstash.com/" label="Upstash: Serverless Data Platform for Redis and Kafka" />
                    <SharingLink href="https://huggingface.co/" label="HuggingFace: Home of AI" />
                </SharingBlock>
            </div>

            {/* <ul className=' list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400'>
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
            </ul> */}
        </div >
    )
}