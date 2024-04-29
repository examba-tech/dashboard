import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Next.js SignUp Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js SignUp Page TailAdmin Dashboard Template",
};

const SignUp: React.FC = () => {
  return (
    <div className="justify-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default p-4 sm:p-12.5 max-w-lg mx-auto dark:border-strokedark dark:bg-boxdark">
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Crea un compte a EXAMBA
        </h2>
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
            Codi Empresa
          </label>
          <input
            type="password"
            placeholder="Introdueix el codi empresa"
            className="w-full mb-5 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />

          <input
            type="submit"
            value="Crear compte"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 mb-6"
          />
          
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
