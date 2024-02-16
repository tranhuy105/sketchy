import { cn } from "@/lib/utils";
import Image from "next/image";

interface MessageProps {
  mess: string;
  by: "USER" | "BOT";
  img?: string;
}

const questionIndex = 0;
const imgIndex = 1;
const answerIndex = 2;

export const Message = ({
  mess,
  by,
  img,
}: MessageProps) => {
  if (mess === "") return;

  const container = cn(
    "flex gap-3 p-4 py-3 max-w-[80%]",
    by === "USER" && "justify-end ml-auto"
  );

  const body = cn(
    "flex flex-col gap-1 pt-1",
    by === "USER" && "items-end"
  );

  const content = cn(
    "text-base w-fit overflow-hidden rounded-3xl px-4 py-3",
    by === "USER"
      ? "bg-blue-500"
      : "bg-zinc-800 text-secondary",
    img !== undefined
      ? "w-[calc(100vw*1/2)] xl:w-[calc(100vw*1/4)] h-[calc(100vh*1/3)] relative rounded-lg"
      : ""
  );

  return (
    <div className={container}>
      <div
        className={cn("flex items-end", {
          "order-2": by === "USER",
        })}
      >
        <div className="w-8 h-8 md:w-12 md:h-12 relative">
          <Image
            src={
              by === "USER" ? "/logo.webp" : `/logo.webp`
            }
            alt=""
            fill
            className="object-cover rounded-full cursor-pointer"
          />
        </div>
      </div>
      <div className={body}>
        <div
          className={cn(
            "flex items-center gap-1 text-xs text-muted-foreground/50 font-semibold",
            {
              "mr-2": by === "USER",
              "ml-2": by === "BOT",
            }
          )}
        >
          {by === "USER" ? "YOU" : "BOT"}
        </div>

        <div className={content}>
          {img !== undefined ? (
            <Image
              src={img}
              alt="akitofunly"
              fill
              className="object-cover"
            />
          ) : (
            mess
          )}
        </div>
      </div>
    </div>
  );
};
