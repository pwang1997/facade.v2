import { SpeedInsights } from '@vercel/speed-insights/next';
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import TopNav from "~/components/top-nav";
import { TRPCReactProvider } from "~/trpc/react";
import Breadcrumb from "../_components/breadcrumb";


export const metadata = {
  title: "Posts | Puck's Blog",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <TopNav />
          <div className="container mx-auto pt-10">
            <Breadcrumb />
            {children}
          </div>
        </TRPCReactProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
