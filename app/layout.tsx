import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppNavbar } from "./components/Navbar";
import { FooterApp } from "./components/FooterApp";
import { AppProvider } from "./Context/appContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I Know A Guy SA | Find Trusted, Reliable Contractors For Your Home",
  description: "Post a project and tell us what you need done. Receive up to 5 bids from home services professionals. Hire the person who best suits your needs and budget.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} !scroll-smooth`}>
      <AppProvider>
        <AppNavbar/>
        {children}
        <FooterApp/>
        </AppProvider>
        </body>
    </html>
  );
}
