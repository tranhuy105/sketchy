import { getBoards } from "@/actions/getAllBoards";
import Link from "next/link";
import { DashboardItem } from "./_components/dashboard-item";
import { NewBoardCard } from "./_components/new-board-card";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: {
    [search: string]: string | string[] | undefined;
  };
}) {
  if (searchParams?.search) {
    console.log(searchParams);
  }
  const boards = await getBoards();

  if (!boards) return null;

  return (
    <div className=" px-12 py-6">
      <h2 className="text-3xl font-semibold">Your board</h2>
      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-8 pb-10 flex-col gap-y-7  px-2">
        <NewBoardCard />
        {boards.map((board) => (
          <DashboardItem key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}
