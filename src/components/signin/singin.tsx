import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/Button";

const SignIn = () => (
  <div className="rounded-sm border border-stroke bg-white shadow-default sm:p-8 dark:border-strokedark dark:bg-boxdark">
    <h2 className="mb-9 font-bold text-black dark:text-white sm:text-title-xl2">
      Entra a EXAMBA
    </h2>
    <form className="w-full">
      <div className="mb-2">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Correu electrònic
        </label>
        <input
          type="email"
          placeholder="Escriu el teu correu electrònic"
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="mb-3">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Escriu la teva contrasenya
        </label>
        <input
          type="password"
          placeholder="6+ Caracters, 1 Lletra en majuscules"
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
      <div className="flex justify-center mt-6 mb-6 pt-5">
        <Link
          href="/home"
          className={buttonVariants({
            className: "w-full max-w-xs",
            variant: "link",
          })}
        >
          <input
            type="submit"
            value="Inicia la sessió"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 mb-4"
          />
        </Link>
      </div>

      <p className="text-center mt-6">
        No tens cap compte?{" "}
        <Link
          href="/auth/signup"
          className={buttonVariants({
            variant: "link",
            size: "text",
          })}
        >
          Registra&apos;t
        </Link>
      </p>
    </form>
  </div>
);

export default SignIn;
