import { NewButton } from "@/app/(dashboard)/_components/new-button";
import { SearchInput } from "@/app/(dashboard)/_components/search-input";
import { Book } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "./logo";

export const Navbar = () => {
  return (
    <div className="px-5 sticky z-50 top-0 h-16 flex items-center justify-between bg-white shadow-md">
      <Logo />
      <div className="flex justify-center items-center w-full max-w-[900px]">
        <SearchInput />
      </div>
      <div className="gap-4 flex w-full justify-end">
        <NewButton />
        <div className="relative">
          <Image
            src="/logo.webp"
            alt="logo"
            width={42}
            height={42}
            className="cursor-pointer rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
