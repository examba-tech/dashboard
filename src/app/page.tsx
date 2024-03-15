import { buttonVariants } from "@/src/components/ui/Button";
import Link from "next/link";
import { cn } from "@/src/utils/utils";
import Image from "next/image";


export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-2">
        <Image src="/examba.jpg" width={300} height={300} alt="examba" />
        <div className="pt-4">
          <Link
            href="/analytics"
            className={buttonVariants({
              className: "w-full max-w-xs",
            })}
          >
            Entra
          </Link>
        </div>
      </div>

      <div className="flex justify-around mt-8">
        <div className="">
          <h2 className="text-xl font-semibold">Sobre Nosotros</h2>
          <p className="mt-4 text-base">
          EXAMBA és una nova iniciativa que hem tirat endavant deu estudiants de la UPC especialitzats en Ciència i Enginyeria de Dades. Col·laborem amb ciutadans, serveis mèdics i organismes públics, desenvolupant algoritmes preventius que alerten sobre problemes de salut i contaminació. Busquem conscienciar sobre el creixent perill de la pol·lució en el nostre benestar i salut mitjançant la ciència de dades.
          </p>
            <Link 
            href="/about" 
            className="flex justify-around mt-8 text-gray py-2 px-4 rounded hover:bg-gray-200 transition duration-300">
              
              Leer más
            </Link>
        </div>
      </div>
    </div>
  );
}

