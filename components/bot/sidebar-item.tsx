import { cn } from "@/lib/utils";
import { Board } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const SidebarItem = ({
  b,
  board,
}: {
  b: Board;
  board: Board;
}) => {
  return (
    <Link
      href={`/bot/${b.id}`}
      key={b.id}
      className={cn(
        "text-primary/70  mr-2 px-3 py-2 rounded-lg flex items-center justify-start h-16 gap-3 cursor-pointer",
        b.id === board.id && "bg-slate-100"
      )}
    >
      <div className="w-10 h-10 border relative bg-slate-50 rounded-full">
        <Image
          src={b.img!}
          alt={b.title}
          fill
          className="object-fit rounded-full"
        />
      </div>
      <div className="flex-1 flex items-start justify-center flex-col">
        <h2 className="text-sm font-semibold">{b.title}</h2>
        <p className="text-muted-foreground text-xs">
          {JSON.parse(b.content).length} questions
        </p>
      </div>
    </Link>
  );
};
