import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppNavbar } from "./components/Navbar";
import { FooterApp } from "./components/FooterApp";
import { AppProvider } from "./Context/appContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I Know A Guy SA | Find Trusted, Reliable Contractors For Your Home",
  description: "Highly qualified and insured Tree fellers .We do all sorts of work interms of tree felling services. 3 years experience",
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
