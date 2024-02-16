import { getBoardFromId } from "@/actions/getBoardFromId";
import { FormComponents } from "@/components/form";
import { FormCanvasComponents } from "@/components/form-canvas";

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

  // console.log(board);

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
  } else {
    return (
      <div className="flex items-center justify-center">
        <FormCanvasComponents
          boardId={board.id}
          title={board.title}
          content={board.content}
        />
      </div>
    );
  }
}
