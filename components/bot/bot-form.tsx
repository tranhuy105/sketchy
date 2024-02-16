"use client";

import { Board } from "@prisma/client";
import { MessageBox } from "./messege-box";
import { Sidebar } from "./sidebar";

interface BotFormProps {
  board: Board;
  allBotBoards: Board[];
}

export const BotForm = ({
  board,
  allBotBoards,
}: BotFormProps) => {
  return (
    <div className=" h-[calc(100vh-64px)] bg-transparent relative w-full">
      <Sidebar allBotBoards={allBotBoards} board={board} />
      {board && (
        <MessageBox content={JSON.parse(board.content)} />
      )}
    </div>
  );
};
