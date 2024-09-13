import { SpeedInsights } from '@vercel/speed-insights/next';
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { Analytics } from "@vercel/analytics/react";
import TopNav from "~/components/top-nav";
import { TRPCReactProvider } from "~/trpc/react";
import Breadcrumb from "../_components/breadcrumb";
import Footer from '../_components/Footer';
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
    <html lang="en" className={`${GeistSans.variable}`} style={{ height: "100%" }}>
      <body>
        <TRPCReactProvider>
          <div className='flex flex-col min-h-dvh'>
            <div className='flex-grow'>
              <TopNav />
              <div className="container mx-auto pt-10 ">
                <Breadcrumb />
                {children}
              </div>
            </div>
            <div className='mt-auto'>
              <Footer />
            </div>
          </div>
          <Analytics />
          <SpeedInsights />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
