import { getBoards } from "@/actions/getAllBoards";
import { BotForm } from "@/components/bot/bot-form";

const page = async () => {
  const allBotBoards = await getBoards("BOT");

  if (!allBotBoards) return;

  return <BotForm allBotBoards={allBotBoards} />;
};

export default page;
