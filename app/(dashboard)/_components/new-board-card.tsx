"use client";

import { cn } from "@/lib/utils";
import { NewButton } from "./new-button";

export const NewBoardCard = () => {
  return (
    <div
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-500 rounded-lg hover:bg-blue-800 transition-colors duration-500 flex flex-col items-center justify-center py-6 cursor-pointer"
      )}
    >
      <div />
      <NewButton simplified={true} />
    </div>
  );
};
