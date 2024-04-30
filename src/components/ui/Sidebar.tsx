"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div onMouseLeave={handleMouseLeave} className="relative h-full">
      <div
        onMouseEnter={handleMouseEnter}
        className={`fixed top-0 left-0 h-screen z-50 ${
          isVisible ? "w-64" : "w-16"
        } bg-black text-white transition-width duration-300 flex flex-col`}
      >
        <div className="flex-grow">
          <Link href="/">
            <span
              className={`py-4 px-6 flex items-center ${
                isVisible ? "ml-4" : "ml-0"
              } ${isVisible ? "" : "opacity-0"} ${
                isVisible ? "text-left" : "text-center"
              }`}
            >
              {!isVisible && (
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={500}
                  height={500}
                  className="w-6 h-6 mr-2 opacity-1"
                />
              )}

              <span
                onClick={handleLogout}
                className={`block font-bold py-2 px-4 hover:bg-gray-700 w-full ${
                  isVisible ? "" : "opacity-0"
                }`}
              >
                <h2
                  className={`text-lg font-bold ${
                    isVisible ? "" : "opacity-0"
                  }`}
                >
                  EXAMBA
                </h2>
              </span>

              {isVisible && (
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={500}
                  height={500}
                  className="w-6 h-6 ml-2 opacity-1"
                />
              )}
            </span>
          </Link>
          <ul className="flex flex-col mt-6 flex-grow">
            <li className="flex items-center">
              <Image
                src="/bar-chart-regular-24.png"
                alt="Icon3"
                width={24}
                height={24}
                className="w-6 h-6 ml-5 mr-2 opacity-1"
              />
              <Link
                href="/dashboard/malalties_dinamiques"
                className={`block py-2 px-4 hover:bg-gray-700 w-full ${
                  isVisible ? "" : "opacity-0"
                }`}
              >
                Patologies Agudes
              </Link>
            </li>
            <li className="flex items-center">
              <Image
                src="/bar-chart-regular-24.png"
                alt="Icon3"
                width={24}
                height={24}
                className="w-6 h-6 ml-5 mr-2 opacity-1"
              />
              <Link
                href="/dashboard/malalties_estatiques"
                className={`block py-2 px-4 hover:bg-gray-700 w-full ${
                  isVisible ? "" : "opacity-0"
                }`}
              >
                Malalties de Prevalença
              </Link>
            </li>
            <li className="flex items-center">
              <Image
                src="/table-regular-24.png"
                alt="Icon3"
                width={24}
                height={24}
                className="w-6 h-6 ml-5 mr-2 opacity-1"
              />
              <Link
                href="/dashboard/table"
                className={`block py-2 px-4 hover:bg-gray-700 w-full ${
                  isVisible ? "" : "opacity-0"
                }`}
              >
                Descàrrega de Dades
              </Link>
            </li>
            <li className="flex items-center">
              <Image
                src="/map-regular-24-2.png"
                alt="Icon3"
                width={24}
                height={24}
                className="w-6 h-6 ml-5 mr-2 opacity-1"
              />
              <Link
                href="/dashboard/estacions_meteo"
                className={`block py-2 px-4 hover:bg-gray-700 w-full ${
                  isVisible ? "" : "opacity-0"
                }`}
              >
                Estacions Meteorològiques
              </Link>
            </li>
            <li className="flex items-center">
              <Image
                src="/bar-chart-regular-24.png"
                alt="Icon3"
                width={24}
                height={24}
                className="w-6 h-6 ml-5 mr-2 opacity-1"
              />
              <Link
                href="/dashboard/estacions_contaminacio"
                className={`block py-2 px-4 hover:bg-gray-700 w-full ${
                  isVisible ? "" : "opacity-0"
                }`}
              >
                Estacions Contaminació
              </Link>
            </li>
            <li className="flex items-center">
              <Image
                src="/group-solid-24-2.png"
                alt="Icon1"
                width={24}
                height={24}
                className="w-6 h-6 ml-5 mr-2 opacity-1"
              />
              <Link
                href="/dashboard/about_us"
                className={`block py-2 px-4 hover:bg-gray-700 w-full ${
                  isVisible ? "" : "opacity-0"
                }`}
              >
                Sobre Nosaltres
              </Link>
            </li>
            <li className="flex items-center">
              <Image
                src="/log-out-regular-24.png"
                alt="Icon4"
                width={24}
                height={24}
                className="w-6 h-6 ml-5 mr-2 opacity-1"
              />
              <Link
                href="/"
                className={`block font-bold py-2 px-4 hover:bg-gray-700 w-full ${
                  isVisible ? "" : "opacity-0"
                }`}
              >
                <span
                  onClick={handleLogout}
                  className={`block font-bold py-2 px-4 hover:bg-gray-700 w-full ${
                    isVisible ? "" : "opacity-0"
                  }`}
                >
                  Log out
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={`ml-5 ${isVisible ? "block" : "hidden"}`}>
          <li className="flex items-center">
            <Image
              src="/log-out-regular-24.png"
              alt="Icon4"
              width={24}
              height={24}
              className="w-6 h-6 mr-2 opacity-1"
            />
            <Link
              href="/"
              className={`block font-bold py-2 px-4 hover:bg-gray-700 w-full ${
                isVisible ? "" : "opacity-0"
              }`}
            >
              Log out
            </Link>
          </li>
        </div>
        <div className={`ml-auto ${isVisible ? "block" : "hidden"}`}>
          <div className="w-16 flex items-center justify-center">
            <span role="img" aria-label="Menu" className="text-2xl">
              {" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
