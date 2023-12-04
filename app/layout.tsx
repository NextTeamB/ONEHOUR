import "./globals.css";
import { useState } from "react";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
import LogoutModal from "@/contextModal/logoutModal";

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

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>원아워</title>
      </head>
      <body className="Upper">
        <Providers>
          {children}
          {logoutModalOpen &&(
            <LogoutModal onClose={() => setLogoutModalOpen(false)} />
          )}
        </Providers>
      </body>
    </html>
  );
}
