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
      </div>
    </div>
  );
}
