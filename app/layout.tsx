import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpacetimeProvider } from "./providers/spacetime";
import { AuthProvider } from "./providers/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatX",
  description: "Chat App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SpacetimeProvider>
            {children}
          </SpacetimeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}