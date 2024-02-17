import { Board } from "@prisma/client";
import { useState } from "react";
import { Input } from "../ui/input";
import { updateTitle } from "@/actions/updateTitle";
import { DeleteButton } from "../delete-button";
import {
  Edit,
  ImagePlus,
  MoreVertical,
  Trash,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { AddImageButton } from "../add-image-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SidebarProps {
  allBotBoards: Board[];
  board?: Board;
}

export const Sidebar = ({
  allBotBoards,
  board,
}: SidebarProps) => {
  const [title, setTitle] = useState(
    board ? board?.title : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!board)
    return (
      <aside className="w-80 fixed z-[1] left-0 bg-transparent bg-zinc-50 h-full flex pl-4 flex-col gap-y-4 text-white border-r pt-6">
        <div className="w-full space-y-3 overflow-y-auto">
          {allBotBoards.map((b) => (
            <SidebarItem key={b.id} b={b} board={board} />
          ))}
        </div>
      </aside>
    );

  const handleUpdateName = async (e: any) => {
    e.preventDefault();
    if (title !== "") {
      setIsLoading(true);
      await updateTitle(board.id, title);
      setIsLoading(false);
    }
  };

  return (
    <aside className="w-80 fixed z-[1] left-0 bg-transparent bg-zinc-50 h-full flex pl-4 flex-col gap-y-4 text-white border-r pt-6">
      <div className="flex items-center justify-center">
        <form className="block" onSubmit={handleUpdateName}>
          <Input
            className="text-4xl font-bold text-primary/80 bg-transparent border-none focus:border-none focus:ring-0 focus:border-0 focus:outline-none block p-0 h-14 disabled:cursor-wait "
            value={title}
            type="text"
            disabled={isLoading}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
        <div className="flex items-center justify-center relative group p-3 hover:bg-slate-100 rounded-lg transition-all duration-300 cursor-pointer mr-1">
          <ImagePlus className="opacity-50 group-hover:opacity-100 group-hover:text-primary/80 text-primary/80 transition-all z-0 pointer-events-none" />
          <div className="w-full h-full absolute z-10 ">
            <AddImageButton
              boardId={board.id}
              mini={true}
            />
          </div>
        </div>
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center justify-center relative group p-3 hover:bg-slate-100 rounded-lg transition-all duration-300 cursor-pointer">
              <MoreVertical className="opacity-50 group-hover:opacity-100 group-hover:text-primary text-primary/80 transition-all  w-8 h-8" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-32 p-1 bg-slate-50">
            <div
              onClick={() => {
                router.refresh();
                router.push(`/edit/${board.id}`);
              }}
              className="flex gap-3 items-center justify-start relative group p-3 hover:bg-slate-100 rounded-lg transition-all duration-300 cursor-pointer"
            >
              <Edit className="opacity-50 group-hover:opacity-100 group-hover:text-primary text-primary/80 transition-all z-0" />
              <p className="opacity-50 group-hover:opacity-100 group-hover:text-muted-foreground text-muted-foreground/80 transition-all z-0">
                Edit
              </p>
            </div>
            <div className="flex gap-3 items-center justify-start relative group p-3 hover:bg-red-100 rounded-lg transition-all duration-300 cursor-pointer">
              <Trash className="opacity-50 group-hover:opacity-100 group-hover:text-red-500 text-primary/80 transition-all z-0" />
              <p className="opacity-50 group-hover:opacity-100 group-hover:text-red-500 text-muted-foreground/80 transition-all z-0">
                Delete
              </p>
              <div className="opacity-0 w-full h-full absolute z-10">
                <DeleteButton
                  title={board.title}
                  id={board.id}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-full space-y-3 overflow-y-auto">
        {allBotBoards.map((b) => (
          <SidebarItem key={b.id} b={b} board={board} />
        ))}
      </div>
    </aside>
  );
};
