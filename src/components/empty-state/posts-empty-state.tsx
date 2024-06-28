import Image from "next/image";
import emptyState from "./empty-state.png";

export default function PostsEmptyState() {
    return(
        <figure className="flex flex-col justify-center items-center">
            <Image className="drop-shadow-xl" height={400} width={400} src={emptyState} alt="empty-state"/>
            <p className="text-2xl capitalize">no posts found!</p>
        </figure>
    )
}