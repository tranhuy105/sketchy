"use client";

import { saveOrCreateNewBoard } from "@/actions/saveOrCreateNewBoard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { BoardType } from "@prisma/client";
import { Bot, Notebook, Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NewButtonProps {
  simplified?: boolean;
}

export const NewButton = ({
  simplified,
}: NewButtonProps) => {
  const [mode, setMode] = useState<BoardType>("NOTE");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSetMode = (s: "NOTE" | "SKETCH" | "BOT") => {
    if (s === "NOTE" && mode !== "NOTE") {
      setMode(s);
    }
    if (s === "SKETCH" && mode !== "SKETCH") {
      setMode(s);
    }
    if (s === "BOT" && mode !== "BOT") {
      setMode(s);
    }
  };

  const handleCreateBoard = async () => {
    if (mode === "BOT") {
      router.push(`/bot/new`);
      return;
    }

    try {
      setIsLoading(true);
      const newBoard = await saveOrCreateNewBoard(
        "Your Title",
        mode,
        ""
      );
      router.push(`/edit/${newBoard.id}`);
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "w-[42px] h-[42px] bg-blue-500 hover:bg-blue-800 duration-500 text-secondary/80 rounded-full transition flex items-center justify-center cursor-pointer group ",
            simplified &&
              "w-full h-full bg-transparent flex-col hover:bg-transparent"
          )}
        >
          <Plus
            className={cn(
              "group-hover:animate-pulse w-1/2 h-1/2",
              simplified && "w-1/4 h-1/4 "
            )}
          />
          {simplified && (
            <p className="text-center text-xs text-secondary/60">
              Create New
            </p>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="w-[320px] py-6 pr-9">
        {/* <div className="relative h-[320px] w-full"> */}
        <div className="flex bg-white z-50  w-full items-center justify-center px-12 py-3    ">
          <div
            className={cn(
              "p-3 rounded-full cursor-pointer hover:bg-secondary transition",
              mode === "NOTE" && "bg-secondary"
            )}
            onClick={() => handleSetMode("NOTE")}
          >
            <Notebook />
          </div>
          <div
            className={cn(
              "p-3 rounded-full cursor-pointer hover:bg-secondary transition",
              mode === "SKETCH" && "bg-secondary"
            )}
            onClick={() => handleSetMode("SKETCH")}
          >
            <Pencil />
          </div>
          <div
            className={cn(
              "p-3 rounded-full cursor-pointer hover:bg-secondary transition",
              mode === "BOT" && "bg-secondary"
            )}
            onClick={() => handleSetMode("BOT")}
          >
            <Bot />
          </div>
        </div>
        <DialogClose asChild className="focus:outline-none">
          <Button
            disabled={isLoading}
            onClick={handleCreateBoard}
            variant={"outline"}
            className="text-primary w-full h-full disabled:hover:cursor-progress focus:outline-none focus-visible:ring-0"
          >
            Create
          </Button>
        </DialogClose>
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
};
