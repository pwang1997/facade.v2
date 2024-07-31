
export const metadata = {
  title: "About | Puck's Blog",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
