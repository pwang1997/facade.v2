
import Link from "next/link";
import GitHubIcon from "~/icons/GitHubIcon";
import { GmailIcon } from "~/icons/GmailIcon";
import LinkedInIcon from "~/icons/LinkedInIcon";
import MediumIcon from "~/icons/MediumIcon";

export default function WhereToFindMe() {
    return (
        <div className="flex justify-start font-bold animate-fadeIn" style={{ animationDelay: `800ms`}}>
            Find Me On
            <div className="flex justify-center gap-4" id="contact">
                <Link className='flex justify-center items-center pl-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white' href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'pwang1997'}`}>
                    <GitHubIcon />
                </Link>
                <Link className="hover:bg-white-hover dark:bg-dark dark:text-white dark:hover:bg-dark-hover rounded-lg p-1" href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_TO || 'wzlpuck@gmail.com'}`}>
                    <GmailIcon />
                </Link>
                <Link className="hover:bg-white-hover dark:bg-dark dark:text-white dark:hover:bg-dark-hover rounded-lg p-1" href={`https://medium.com/${process.env.NEXT_PUBLIC_MEDIUM_USERNAME || '@zhengliang_puck_wang'} `}>
                    <MediumIcon />
                </Link>
                <Link className="hover:bg-white-hover dark:bg-dark dark:text-white dark:hover:bg-dark-hover rounded-lg p-1" href={`https://www.linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME || 'puck-wang-2020'}/`}>
                    <LinkedInIcon />
                </Link>
            </div>
        </div>
    )
}