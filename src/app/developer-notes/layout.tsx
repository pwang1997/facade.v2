import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Notes | Zhengliang Wang"
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
