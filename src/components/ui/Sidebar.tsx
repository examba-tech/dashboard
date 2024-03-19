"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false); // Inicia escondido

  // Manejadores para mostrar/esconder la barra lateral
  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div onMouseLeave={handleMouseLeave} className="relative">
      <div
        onMouseEnter={handleMouseEnter}
        className={`fixed top-0 left-0 h-full ${isVisible ? 'w-64' : 'w-16'} bg-gray-800 text-white transition-width duration-300`}
      >
        {isVisible ? (
          <div>
            <div className="py-4 px-6">
              <h1 className="text-lg font-bold">EXAMBA</h1>
            </div>
            <ul className="flex flex-col mt-6">
              <li><Link href="/about" className="block py-2 px-4 hover:bg-gray-700">Sobre Nosotros</Link></li>
              <li><Link href="/analytics" className="block py-2 px-4 hover:bg-gray-700">Taula</Link></li>
              <li><Link href="/dashbord" className="block py-2 px-4 hover:bg-gray-700">Gràfic</Link></li>
              <li><Link href="/" className="block font-bold py-2 px-4 hover:bg-gray-700">Log out</Link></li>
            </ul>
          </div>
        ) : (
          <div className="w-16 flex items-center justify-center h-full">
            <span role="img" aria-label="Menu" className="text-2xl"> </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;