'use client';

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypeWriter({ strings }: { strings: string[] }) {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: strings,
            typeSpeed: 100,
            backSpeed: 100,
            smartBackspace: true, // this is a default
            loop: true
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, [strings]);

    return (
        <span ref={el} />
    )
}