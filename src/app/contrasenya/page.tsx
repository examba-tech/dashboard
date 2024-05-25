"use client";
import React, { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/Button";

const SignUp: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    window.location.href = "/";
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("S'ha enviat la nova contrasenya al teu correu electrònic!");
  };

  return (
    <div className="justify-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default p-4 sm:p-12.5 max-w-lg mx-auto dark:border-strokedark dark:bg-boxdark">
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Vols recuperar la teva contrasenya?
        </h2>
        <Link
          onClick={handleLogout}
          style={{
            position: "fixed", // Posición fija en la pantalla
            top: "20px", // 20 píxeles desde la parte superior
            left: "20px", // 20 píxeles desde la parte izquierda
            padding: "10px 20px", // Espaciado interno del botón
            fontSize: "16px", // Tamaño de fuente del texto
            border: "none", // Sin borde
            borderRadius: "5px", // Bordes redondeados
            cursor: "pointer", // Cursor en forma de puntero
            textDecoration: "none", // Elimina la decoración de texto por defecto
          }}
          href="/"
          className={buttonVariants({
            className: "w-full max-w-xs",
            variant: "ghost",
          })}
        >
          Torna a l&apos;Inici
        </Link>
        <form onSubmit={handleSubmit}>
          <label className="block font-medium text-black dark:text-white mb-2.5">
            Correu electrònic
          </label>
          <input
            type="email"
            placeholder="Introdueix el teu correu electrònic"
            className="w-full mb-4 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <div className="flex justify-center mt-6 mb-6">
            <input
              type="submit"
              value="Envia"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 mb-6"
            />
          </div>
          {message && (
            <p className="text-center text-green-600 mt-1">{message}</p>
          )}
          <br></br>
          <br></br>
          <div className="flex justify-center mt-6 mb-6">
            <Link
              href="/"
              className={buttonVariants({
                className: "w-full max-w-xs",
                variant: "link",
              })}
            >
              <input
                type="button"
                value="Torna a l'inici"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 mb-6"
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;