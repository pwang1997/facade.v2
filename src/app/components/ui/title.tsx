import { type ReactNode } from "react";

export default function Title({ label }: { label: string | ReactNode }) {
    return (
        <p className="title capitalize">{label}</p>
    )
}