import { buttonVariants } from "@/src/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import SignIn from "../components/signin/singin";

export const metadata: Metadata = {
  title: "Examba",
  description: "Dashboard by Examba",
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/examba.png" width={300} height={300} alt="examba" />
      <div className="w-full max-w-2xl">
        <div className="">
          <SignIn />
          <div className="pt-16 flex flex-col items-center justify-center">
            <Link
              href="/about"
              className={buttonVariants({
                className: "w-full max-w-xs",
                variant: "ghost",
              })}
            >
              Nosaltres
            </Link>
          </div>
        </div>

        {/* <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">Nosaltres</h2>

          <p className="mt-4 text-base max-w-xl text-justify">
            EXAMBA és una nova iniciativa que hem tirat endavant deu estudiants
            de la UPC especialitzats en Ciència i Enginyeria de Dades.
            Col·laborem amb ciutadans, serveis mèdics i organismes públics,
            desenvolupant algoritmes preventius que alerten sobre problemes de
            salut i contaminació. Busquem conscienciar sobre el creixent perill
            de la pol·lució en el nostre benestar i salut mitjançant la ciència
            de dades.
          </p>
        </div> */}
      </div>
    </div>
  );
}
