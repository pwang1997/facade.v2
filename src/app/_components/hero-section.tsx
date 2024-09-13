import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import AWSIcon from "~/icons/AWSIcon";
import DockerIcon from "~/icons/DockerIcon";
import FirebaseIcon from "~/icons/FirebaseIcon";
import GolangIcon from "~/icons/GolangIcon";
import HtmlIcon from "~/icons/HtmlIcon";
import JavaScriptIcon from "~/icons/JavaScriptIcon";
import MuiIcon from "~/icons/MuiIcon";
import MySQLIcon from "~/icons/MySQLIcon";
import NextJsIcon from "~/icons/NextJsIcon";
import NginxIcon from "~/icons/NginxIcon";
import NodeJsIcon from "~/icons/NodeJsIcon";
import ReactIcon from "~/icons/ReactIcon";
import ReactQueryIcon from "~/icons/ReactQueryIcon";
import RedisIcon from "~/icons/RedisIcon";
import SassIcon from "~/icons/SassIcon";
import SpringIcon from "~/icons/SpringIcon";
import TailwindIcon from "~/icons/TailwindIcon";
import TypeScriptIcon from "~/icons/TypeScriptIcon";
import TypeWriter from "./type-writer";

function ExperienceBlock({ title, children }: { title: string, children: any }) {
    return (
        <Card className="text-md font-bold">
            <CardHeader>
                <CardTitle className="flex  content-between" >
                    {title}
                </CardTitle>

                <CardContent className='line-clamp-3 text-sm font-semibold  text-gray-900 dark:bg-medium dark:text-white'>
                    {children}
                </CardContent>
            </CardHeader>
        </Card>
    )
}
export default function HeroSection() {
    const skillItemClass = "flex items-center space-x-3 rtl:space-x-reverse ";

    return (
        <div className="flex flex-col">
            <div className=""
                style={{ animationDelay: `0` }}>
                <p className=" text-4xl pb-4 font-bold ">Welcome!</p>
                <p className="text-3xl">I am Zhengliang(Puck) Wang</p>
                <p className="typewriter text-2xl">
                    <TypeWriter strings={['who loves to build and experience novel technologies.']} />
                </p>
            </div>

            <div>
                <p className="text-xl font-bold py-4 capitalize  " style={{ animationDelay: `0` }}>A bit about my Tech Stack:</p>
                <div className="flex flex-col gap-4">
                    <div>
                        {/* <ExperienceBlock title="Frontend Experience">
                        <ul className="text-left text-gray-500 dark:text-gray-400 capitalize">
                            <li className={`${skillItemClass}`} style={{ animationDelay: `0`}}>
                                <div className="flex flex-row items-center gap-2">
                                    ✅ hands-on experience with <HtmlIcon /> HTML5 + <SassIcon /> Sass + <JavaScriptIcon /> JavaScript ES6
                                </div>
                            </li>
                            <li className={`${skillItemClass}`} style={{ animationDelay: `0`}}>
                                <div className="flex flex-row items-center gap-2">
                                    ✅ hands-on experience with <TypeScriptIcon /> TypeScript + <NextJsIcon /> Next.js + <TailwindIcon /> Tailwind CSS
                                </div>
                            </li>

                            <li className={`${skillItemClass}`} style={{ animationDelay: `0`}}>
                                <div className="flex flex-row items-center gap-2">
                                    ✅ Hands-on experience with <ReactIcon /> React + <ReactQueryIcon /> TanStack Query + <MuiIcon /> Material UI
                                </div>
                            </li>
                        </ul>
                        </ExperienceBlock> */}
                        <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white " style={{ animationDelay: `0` }}>* Frontend:</p>
                        <ul className="text-left text-gray-500 dark:text-gray-400 capitalize">
                            <li className={`${skillItemClass}`} style={{ animationDelay: `0` }}>
                                <div className="flex flex-row items-center gap-2">
                                    {/* ✅ hands-on experience with <HtmlIcon /> <span className="md:hidden">HTML5</span> + <SassIcon />
                                    <span className="sm:hidden md:inline">Sass</span> + <JavaScriptIcon />
                                    <span className="md:hidden">JavaScript ES6</span> */}

                                    ✅Hands-on experience with <HtmlIcon /> <SassIcon /><JavaScriptIcon />
                                </div>
                            </li>
                            <li className={`${skillItemClass}`} style={{ animationDelay: `0` }}>
                                <div className="flex flex-row items-center gap-2">
                                    ✅Hands-on experience with <TypeScriptIcon /> <NextJsIcon /><TailwindIcon />

                                    {/* ✅ hands-on experience with <TypeScriptIcon /> TypeScript + <NextJsIcon /> Next.js + <TailwindIcon /> Tailwind CSS */}
                                </div>
                            </li>

                            <li className={`${skillItemClass}`} style={{ animationDelay: `0` }}>
                                <div className="flex flex-row items-center gap-2">
                                    ✅Hands-on experience with <ReactIcon /> <ReactQueryIcon /><MuiIcon />

                                    {/* ✅ Hands-on experience with <ReactIcon /> React + <ReactQueryIcon /> TanStack Query + <MuiIcon /> Material UI */}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white " style={{ animationDelay: `0` }}>* Backend:</p>
                        <ul className="space-y-3 text-left text-gray-500 dark:text-gray-400 capitalize">
                            {/* <li className={`${skillItemClass}`} style={{ animationDelay: `0` }}>
                                <div className="flex flex-row items-center gap-2">
                                ✅Hands-on experience with <SpringIcon /> <AWSIcon />

                                    ✅ Familiar with Distributed system development using <SpringIcon /> Spring Cloud modules
                                </div>
                            </li> */}
                            <li className={`${skillItemClass}`} style={{ animationDelay: `0` }}>
                                <div className="flex flex-row items-center gap-2">
                                    ✅Hands-on experience with <SpringIcon /> <RedisIcon /><MySQLIcon />

                                    {/* ✅ Years of experience in <SpringIcon /> Spring Boot + <RedisIcon /> Redis + <MySQLIcon /> MySQL */}
                                </div>
                            </li>
                            <li className={`${skillItemClass}`} style={{ animationDelay: `0` }}>
                                <div className="flex flex-row items-center gap-2">
                                    ✅Hands-on experience with <NodeJsIcon /> <FirebaseIcon /><AWSIcon />


                                    {/* ✅ Hands-on experience in <NodeJsIcon /> Node.js + <FirebaseIcon /> Firebase + <AWSIcon /> AWS */}
                                </div>
                            </li>
                            <li className={`${skillItemClass}`} style={{ animationDelay: `0` }}>
                                <div className="flex flex-row items-center gap-2">
                                    ✅Hands-on experience with <DockerIcon /> <NginxIcon />

                                    {/* ✅ Deployed multiple services using <DockerIcon     /> Docker + <NginxIcon /> Nginx */}
                                </div>
                            </li>
                            <li className={`${skillItemClass}`} style={{ animationDelay: `0` }}>
                                <div className="flex flex-row items-center gap-2">
                                    📖 Learning <GolangIcon /> Golang at the moment...
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <p className="pt-4 text-lg font-semibold  " style={{ animationDelay: `0` }}>
                Here you will find my working projects, blogs about technologies, leetcode solutions, and interesting issues I encountered from work.
            </p>
        </div>
    )
}