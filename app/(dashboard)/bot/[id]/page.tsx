import { BotForm } from "@/components/bot/bot-form";

const page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;

  return <BotForm id={id} />;
};

export default page;
