"use client";

import { Overlay } from "@/components/overlay";
import { Board } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Notebook, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface BoardProps {
  board: Board;
}

export const DashboardItem = ({ board }: BoardProps) => {
  const updatedAtLabel = formatDistanceToNow(
    board.updatedAt,
    {
      addSuffix: true,
    }
  );

  return (
    <Link href={`/edit/${board.id}`}>
      <div className="group aspect-[100/127] rounded-lg border flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image
            src={board.img ? board.img : ""}
            alt={board.title}
            fill
            className="object-cover"
          />
          <Overlay />
        </div>
        <div className="relative bg-white p-3">
          <p className="text-[14px] font-bold truncate max-w-[calc(100%)-20px]">
            {board.title}
          </p>
          <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
            {updatedAtLabel}
          </p>
          <div
            className={cn(
              "absolute top-1 right-2 text-muted-foreground p-2 hover:bg-primary-foreground transition-colors rounded-full"
            )}
          >
            {board.type === "NOTE" ? (
              <Notebook className="h-4 w-4" />
            ) : (
              <Pencil className="h-4 w-4" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
