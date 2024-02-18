import { getBoards } from "@/actions/getAllBoards";
import { getBoardFromId } from "@/actions/getBoardFromId";
import { BotForm } from "@/components/bot/bot-form";
import { Suspense } from "react";
import Loading from "../../edit/[id]/loading";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  // const board = await getBoardFromId(id);

  const allBotBoards = await getBoards("BOT");
  const board = allBotBoards.filter(
    (board) => board.id === id
  )[0];

  if (!board)
    return (
      <div className="text-red-500">
        Error 404: No board found
      </div>
    );

  return (
    <Suspense fallback={<Loading />}>
      <BotForm board={board} allBotBoards={allBotBoards} />
    </Suspense>
  );
};

export default page;
