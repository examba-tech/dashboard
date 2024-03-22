import type { Metadata } from "next";
import Navbar from "@/src/components/ui/Navbar";
import { cn } from "@/src/utils/utils";
import "@/src/styles/globals.css";
import { montserrat } from "@/src/components/ui/fonts";


export const metadata: Metadata = {
  title: "Examba",
  description: "Dashboard by Examba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        montserrat.className
      )}
    >
      <body className={"min-h-screen pt-12 bg-slate-50 antialiased"}>
        <Navbar />

        <div className="container max-w-7xl mx-auto h-full pt-12">
          {children}
        </div>
      </body>
    </html>
  );
}