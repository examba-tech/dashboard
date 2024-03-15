import { buttonVariants } from "@/src/components/ui/Button";
import Link from "next/link";
import { cn } from "@/src/utils/utils";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center py-2">
        <Image src="/examba.png" width={300} height={300} alt="examba" />
      </div>
      <div className="flex justify-center py-2">
        <Link
          href="/analytics"
          className={buttonVariants({
            className: "w-full max-w-80 ",
          })}
        >
          Entra
        </Link>
      </div>
    </div>
  );
}
