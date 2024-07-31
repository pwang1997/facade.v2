import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Notes | Puck's Blog",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
