import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import EyeIcon from "~/icons/EyeIcon";

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
                <CardTitle>
                    <div className="flex justify-between">
                        <Link href={`/posts/${title}`}>{title}</Link>
                        <Link href={`/posts/${title}`}>Learn More</Link>
                    </div>
                </CardTitle>
                <CardDescription>
                    <span className=' text-xs leading-5 text-gray-500 dark:bg-medium dark:text-white'>
                        last updated at: {lastUpdatedAt}
                    </span>
                </CardDescription>

            </CardHeader>
            <CardContent>
                <p className='line-clamp-3 text-sm font-semibold leading-6 text-gray-900 dark:bg-medium dark:text-white'>{description}</p>
            </CardContent>
            <CardFooter>
                <div className="flex gap-1">
                    {
                        associatedTags.map((tagName) => {
                            return (
                                <div key={tagName}>
                                    <Badge>{tagName}</Badge>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex flex-row items-center text-xs leading-5 text-gray-500 dark:bg-medium dark:text-white">
                    <EyeIcon />{views}
                </div>
            </CardFooter>
        </Card>

    )
}