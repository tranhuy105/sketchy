import { cn } from "@/lib/utils";
import Image from "next/image";

interface MessageProps {
  mess: string;
  by: "USER" | "BOT";
  img: string;
}

export const Message = ({
  mess,
  by,
  img,
}: MessageProps) => {
  if (mess === "") return;

  const container = cn(
    "flex gap-3 p-4 py-3 max-w-[80%] ",
    by === "USER" && "justify-end ml-auto"
  );

  const body = cn(
    "flex flex-col gap-1 pt-1",
    by === "USER" && "items-end",
    img === "skip" && "-mt-4"
  );

  const content = cn(
    "text-base w-fit overflow-hidden rounded-3xl px-4 py-3",
    by === "USER"
      ? "bg-blue-500"
      : "bg-zinc-800 text-secondary",
    img !== "" && img !== "skip"
      ? "w-[calc(100vw*1/2)] xl:w-[calc(100vw*1/4)]  relative rounded-lg p-0 border shadow-md"
      : ""
  );

  return (
    <div className={container}>
      <div
        className={cn(
          "flex items-end bg-red-0 text-transparent",
          {
            "order-2": by === "USER",
          },
          img !== "skip" && img !== "" && "items-start pt-7"
        )}
      >
        (
        <div
          className={cn(
            "w-8 h-8 md:w-12 md:h-12 relative "
          )}
        >
          {img === "" && (
            <Image
              src={
                by === "USER" ? "/logo.webp" : `/bot.svg`
              }
              alt=""
              fill
              className="object-cover rounded-full cursor-pointer"
            />
          )}
          {img !== "skip" && img !== "" && (
            <Image
              src={
                by === "USER" ? "/logo.webp" : `/bot.svg`
              }
              alt=""
              fill
              className="object-cover rounded-full cursor-pointer"
            />
          )}
        </div>
        )
      </div>
      <div className={body}>
        {img !== "skip" && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs text-muted-foreground/50 font-semibold",
              {
                "mr-2": by === "USER",
                "ml-2": by === "BOT",
              }
            )}
          >
            {by === "USER" ? "You" : "Kotobo"}
          </div>
        )}

        <div className={content}>
          {img !== "" && img !== "skip" ? (
            <img
              src={img}
              alt={""}
              className="object-fit"
            />
          ) : (
            // mess
            mess
          )}
        </div>
      </div>
    </div>
  );
};
