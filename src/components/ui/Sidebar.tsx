"use client";
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
        className={`fixed top-0 left-0 h-full ${isVisible ? 'w-64' : 'w-16'} bg-gray-800 text-white transition-width duration-300 flex`}
      >
        <div className="flex-grow">
          <div className={`py-4 px-6 ${isVisible ? '' : 'opacity-0'}`}>
            <h1 className="text-lg font-bold">EXAMBA</h1>
          </div>
          <ul className="flex flex-col mt-6">
            <li className="flex items-center">
              <img src="/group-solid-24-2.png" alt="Icon1" className="w-6 h-6 ml-5 mr-2 opacity-1" style={{ color: '#ffffff' }} />
              <Link href="/about" className={`block py-2 px-4 hover:bg-gray-700 w-full ${isVisible ? '' : 'opacity-0'}`}>Sobre Nosaltres</Link>
            </li>
            <li className="flex items-center">
              <img src="/table-regular-24.png" alt="Icon2" className="w-6 h-6 ml-5 mr-2 opacity-1" style={{ color: '#ffffff' }} />
              <Link href="/analytics" className={`block py-2 px-4 hover:bg-gray-700 w-full ${isVisible ? '' : 'opacity-0'}`}>Taula</Link>
            </li>
            <li className="flex items-center">
              <img src="/bar-chart-regular-24.png" alt="Icon3" className="w-6 h-6 ml-5 mr-2 opacity-1" style={{ color: '#ffffff' }} />
              <Link href="/dashboard" className={`block py-2 px-4 hover:bg-gray-700 w-full ${isVisible ? '' : 'opacity-0'}`}>Gràfic</Link>
            </li>
            <li className="flex items-center">
              <img src="/log-out-regular-24.png" alt="Icon4" className="w-6 h-6 ml-5 mr-2 opacity-1" style={{ color: '#ffffff' }} />
              <Link href="/" className={`block font-bold py-2 px-4 hover:bg-gray-700 w-full ${isVisible ? '' : 'opacity-0'}`}>Log out</Link>
            </li>
          </ul>
        </div>
        <div className={`ml-auto ${isVisible ? 'block' : 'hidden'}`}>
          <div className="w-16 flex items-center justify-center">
            <span role="img" aria-label="Menu" className="text-2xl"> </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
