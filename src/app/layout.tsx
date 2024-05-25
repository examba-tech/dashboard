"use client";
import Sidebar from "@/src/components/ui/Sidebar";
import Footer from "@/src/components/ui/Footer";
import { cn } from "@/src/utils/utils";
import "@/src/styles/globals.css";
import React from "react";
import { montserrat } from "@/src/components/ui/fonts";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isVisible, setIsVisible] = React.useState(false);
  const pathname = usePathname();

  const inLogin =
    pathname === "/" ||
    pathname === "/auth/signup" ||
    pathname === "/Terms_Privacidad_Contact";

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
        !inLogin ? (isVisible ? "ml-64" : "ml-16") : ""
      } transition-width duration-300`}
    >
      {!inLogin && (
        <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} />
      )}
      <div className="container max-w-7xl mx-auto h-full pt-10 min-h-screen">
        {children}
      </div>
      <Footer />
      {/* Agregar icono de usuario */}
      {!inLogin && (
        <div className="fixed top-4 right-4">
          <button
            onClick={() => {
              // Redireccionar a la página de perfil que da la opción de darse de baja
              window.location.href = "/dashboard/perfil_baja";
            }}
            className="bg-transparent border-none text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <img src={"/user-circle-solid-24.png"} alt="User Icon" className="w-12 h-12" />
          </button>
        </div>
      )}
    </body>
  </html>
  );
}