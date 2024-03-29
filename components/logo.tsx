import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Book } from "lucide-react";
import Link from "next/link";

const font = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

export const Logo = () => {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-2 cursor-pointer"
    >
      <div className="bg-sky-500 p-2 rounded-full">
        <Book className="h-8 w-8 text-white" />
      </div>
      <p
        className={cn(
          "text-xl italic leading-6 tracking-widest text-sky-900 drop-shadow-lg",
          font.className
        )}
      >
        Sketchy
      </p>
    </Link>
  );
};
