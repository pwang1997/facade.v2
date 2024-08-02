/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { useEffect, useRef, useState } from "react";

export default function Comment() {
    const [darkMode] = useState<boolean>(
        typeof window !== 'undefined' ?
            localStorage?.getItem("theme") === "dark" : true
    );
    
    const commentBoxRef = useRef<any>();
    
    useEffect(()=>{
        const script = document.createElement("script");
        script.setAttribute("src", "https://utteranc.es/client.js");
        script.setAttribute("repo", "pwang1997/facade.v2");
        script.setAttribute("issue-term", "url");
        script.setAttribute("label", "comment")
        script.setAttribute("theme", darkMode ? "github-dark" : "github-light" )
        script.setAttribute("crossorigin","anonymous" )
        script.setAttribute("async", "true");
        commentBoxRef.current.appendChild(script);
    },[commentBoxRef, darkMode]);

    return (
        <div className=" w-full">
            <div ref={commentBoxRef}></div>
        </div>
    )
}