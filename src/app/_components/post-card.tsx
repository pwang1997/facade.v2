import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

type PostCardProps = {
    title: string;
    description: string;
    lastUpdatedAt: string;
    associatedTags: string[];
    views: number;

}
export default function PostCard({
    title, description, lastUpdatedAt, associatedTags,
    views
}: PostCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <Link href={`/posts/${title}`}>{title}</Link>
                    <Link href={`/posts/${title}`}>Learn More</Link>
                </CardTitle>
                <CardDescription className=' text-xs leading-5 text-gray-500 dark:bg-medium dark:text-white'>
                    last updated at: {lastUpdatedAt}
                </CardDescription>
            </CardHeader>
            <CardContent className='line-clamp-3 text-sm font-semibold leading-6 text-gray-900 dark:bg-medium dark:text-white'>
                {description}
            </CardContent>
            <CardFooter className="flex gap-1">
                {
                    associatedTags.map((tagName) => {
                        return (
                            <div key={tagName}>
                                <Badge>{tagName}</Badge>
                            </div>
                        )
                    })
                }
            </CardFooter>
        </Card>
    )
}