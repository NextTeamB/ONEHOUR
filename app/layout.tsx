import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "원아워",
  description: "원아워 홈페이지",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>원아워</title>
      </head>
      <body className="Upper">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
