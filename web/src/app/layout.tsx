import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Provider } from "@/components/provider/Provider";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = { title: "PDM Agent" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={`${notoSans.variable}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
