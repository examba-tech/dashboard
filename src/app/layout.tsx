"use client";
import Sidebar from "@/src/components/ui/Sidebar";
import Footer from "@/src/components/ui/Footer";
import { cn } from "@/src/utils/utils";
import "@/src/styles/globals.css";
import React from "react";
import { montserrat } from "@/src/components/ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        montserrat.className
      )}
    >
      <body
        
        className={`min-h-screen pt-12 bg-slate-50 antialiased ${
          isVisible ? "ml-64" : "ml-16"
        } transition-width duration-300`}>
        <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} />
        <div className="container max-w-7xl mx-auto h-full pt-12">
          {children}
          <Footer/>
        </div>
      </body>
      
    </html>
  );
}
