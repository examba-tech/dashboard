import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/Button";
import { Icons } from "@/src/components/Icons";

const Navbar = async () => {
  return (
    <div className="fixed top-0 inset-x-0 h-auto bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2 py-2">
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="w-10 h-10 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Examba Predictions
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
