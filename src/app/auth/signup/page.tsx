"use client"
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/Button";

const SignUp: React.FC = () => {
  const handleLogout = () => {
    window.location.href = "/";
  };
  return (
    <div className="justify-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default p-4 sm:p-12.5 max-w-lg mx-auto dark:border-strokedark dark:bg-boxdark">
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Crea un compte a EXAMBA
        </h2>
        <Link 
          onClick={handleLogout}
          style={{
            position: 'fixed', // Posición fija en la pantalla
            top: '20px', // 20 píxeles desde la parte superior
            left: '20px', // 20 píxeles desde la parte izquierda
            padding: '10px 20px', // Espaciado interno del botón
            fontSize: '16px', // Tamaño de fuente del texto
            border: 'none', // Sin borde
            borderRadius: '5px', // Bordes redondeados
            cursor: 'pointer', // Cursor en forma de puntero
            textDecoration: 'none' // Elimina la decoración de texto por defecto
          }}
          href="/" 
          className={buttonVariants({
            className: "w-full max-w-xs",
            variant: "ghost",
          })}
        >
          Torna a l&apos;Inici
      </Link>
        <form>

          <label className="block font-medium text-black dark:text-white mb-2.5">
            Nom
          </label>
          <input
            type="text"
            placeholder="Introdueix el teu nom complet"
            className="w-full mb-4 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          
          <label className="block font-medium text-black dark:text-white mb-2.5">
            Correu electrònic
          </label>
          <input
            type="email"
            placeholder="Introdueix el teu correu electrònic"
            className="w-full mb-4 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          
          <label className="block font-medium text-black dark:text-white mb-2.5">
            Contrassenya
          </label>
          <input
            type="password"
            placeholder="Introdueix la teva contrasenya"
            className="w-full mb-4 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <label className="block font-medium text-black dark:text-white mb-2.5">
            Reescriu la contrasenya
          </label>
          <input
            type="password"
            placeholder="Reescriu la contrasenya"
            className="w-full mb-5 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

        <label className="block font-medium text-black dark:text-white mb-2.5">
            Codi de l&apos;empresa
          </label>
          <input
            type="password"
            placeholder="Introdueix el codi de l&apos; empresa"
            className="w-full mb-5 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <div className="flex justify-center mt-6 mb-6">
          <Link
          href="/"
          className={buttonVariants({
          className: "w-full max-w-xs",
          variant: "link",
          })}
      >
          <input
            type="submit"
            value="Crear compte"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 mb-6"
          />
          </Link>
          </div>
          
          <p className="text-center">
            Ja tens un compte?{" "}
            <Link href="/">
            Inicia sessió
            </Link>
          </p>
        </form>
      </div>
      </div>
  );
};

export default SignUp;
