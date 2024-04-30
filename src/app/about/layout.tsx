"use client";
import Sidebar from "@/src/components/ui/Sidebar";
import Footer from "@/src/components/ui/Footer";
import { cn } from "@/src/utils/utils";
import "@/src/styles/globals.css";
import React from "react";
import { montserrat } from "@/src/components/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        montserrat.className
      )}
    >
      <body>
        <div className="container max-w-7xl mx-auto h-full pt-10 min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
