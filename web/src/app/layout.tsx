import type { Metadata } from "next";
import { Noto_Sans_JP, Roboto } from "next/font/google";
import { Provider } from "@/components/provider/Provider";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = { title: "PDM AGENT" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={`${notoSans.variable} ${roboto.variable}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
