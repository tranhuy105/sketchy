import { getBoardFromId } from "@/actions/getBoardFromId";
import { BotCsvEditor } from "@/components/bot/bot-csv-editor";
import { FormComponents } from "@/components/form";
import { FormCanvasComponents } from "@/components/form-canvas";
import Loading from "./loading";

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const BoardId = params.id;
  if (!BoardId) return;

  const board = await getBoardFromId(BoardId);

  // return <Loading />;

  if (!board)
    return (
      <div className="flex items-center justify-center text-3xl font-bold text-red-500">
        Error 404: Not Found
      </div>
    );

  if (board.type === "NOTE") {
    return (
      <div className="flex items-center justify-center">
        <FormComponents
          boardId={board.id}
          title={board.title}
          content={board.content}
          image={board.img}
        />
      </div>
    );
  } else if (board.type === "SKETCH") {
    return (
      <div className="flex items-center justify-center">
        <FormCanvasComponents
          boardId={board.id}
          title={board.title}
          content={board.content}
        />
      </div>
    );
  } else if (board.type === "BOT") {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <BotCsvEditor
          boardId={board.id}
          title={board.title}
          content={board.content}
          image={board.img}
        />
      </div>
    );
  }
}
