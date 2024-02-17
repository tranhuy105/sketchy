"use client";

import { useEffect, useRef, useState } from "react";
import { CSVDataItem } from "./bot-upload";
import { Message } from "./message";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Input } from "../ui/input";

interface MessageProps {
  content: CSVDataItem[];
}

type MessageType = {
  mess: string;
  by: "USER" | "BOT";
  img: string;
};
type MessagesType = MessageType[];

function shuffleArray(array: CSVDataItem[]) {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

export const MessageBox = ({ content }: MessageProps) => {
  const [d, setD] = useState<CSVDataItem[]>(
    shuffleArray(content.slice(1))
  );
  const [messages, setMessages] = useState<MessagesType>([
    {
      mess: `Welcome, Here's a quick guide! You can type "p" in your keyboard to start and pause a session, "reset" to reset your session and "clear" to clean your box. When doing reset or clear, the game with automatically be paused. And now to start playing, please type "p"`,
      by: "BOT",
      img: "",
    },
  ]);
  const [currentQuestion, setCurrentQuestion] =
    useState<CSVDataItem>(content[0]);
  const [ready, setIsReady] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messages.length) {
      setTimeout(() => {
        divRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [messages.length]);

  // console.log(data);

  // ADD MESSAGE LOGIC
  const addMessege = async (
    data: string,
    by: "BOT" | "USER",
    img: string
  ) => {
    if (by === "USER") {
      setMessages((cur: MessagesType) => [
        ...cur,
        {
          mess: data,
          by,
          img,
        },
      ]);
    } else {
      if (img === "") {
        await setTimeout(() => {
          setMessages((cur: MessagesType) => [
            ...cur,
            {
              mess: data,
              by,
              img,
            },
          ]);
        }, 500);
      }

      if (img !== "") {
        await setTimeout(() => {
          setMessages((cur: MessagesType) => [
            ...cur,
            {
              mess: data,
              by,
              img,
            },
            {
              mess: data,
              by,
              img: "skip",
            },
          ]);
        }, 500);
      }
    }
  };

  // ADDING QUESTION LOGIC
  const botRes = async (playerInput: string) => {
    if (!d[0]) {
      await addMessege(
        `You have finised this deck, type "reset" to reset and play again`,
        "BOT",
        ""
      );
      return;
    }

    // neu tra loi dung
    if (playerInput === currentQuestion[2]) {
      await addMessege("Correct", "BOT", "");
      if (currentQuestion === content[0]) {
        setCurrentQuestion(d[0]);
        await addMessege(d[0][0], "BOT", d[0][1]);
      } else {
        if (d[1]) {
          setD((curArr) => curArr.slice(1));
          setCurrentQuestion((cur) => d[1]);
          await addMessege(d[1][0], "BOT", d[1][1]);
        } else {
          setD([]);
          setCurrentQuestion(["", "", ""]);
          await addMessege(
            `You have finised this deck, type "reset" to reset and play again`,
            "BOT",
            ""
          );
        }
      }
    } else {
      if (currentQuestion !== content[0]) {
        setD((cur) => [...cur, currentQuestion]);
      }
      await addMessege("Incorrect", "BOT", "");
      await addMessege(
        `The correct answer is "${currentQuestion[2]}"`,
        "BOT",
        ""
      );
    }
  };

  // const stringData = JSON.stringify(data);
  // const objectData = JSON.parse(stringData);

  const { handleSubmit, register, resetField } =
    useForm<FieldValues>({
      defaultValues: {
        data: "",
      },
    });

  // WHEN PLAYER INPUT, THE LOGIC
  const onSubmit: SubmitHandler<FieldValues> = async (
    message
  ) => {
    const { data: playerInput } = message;
    await addMessege(playerInput, "USER", "");
    resetField("data");
    if (playerInput.toLowerCase() === "reset") {
      setD(shuffleArray(content.slice(1)));
      setCurrentQuestion(content[0]);
      setIsReady(false);
      await addMessege("reset succesfully", "BOT", "");
      return;
    }

    if (playerInput.toLowerCase() === "clear") {
      setMessages([]);
      setIsReady(false);
      return;
    }

    if (!ready && playerInput === "p") {
      await addMessege(
        currentQuestion[0],
        "BOT",
        currentQuestion[1]
      );
      setIsReady(true);
      return;
    }

    if (!ready) {
      await addMessege(
        `In pause mode, type "p" to continue`,
        "BOT",
        ""
      );
      return;
    }

    if (ready && playerInput === "p") {
      await addMessege("pause", "BOT", "");
      setIsReady(false);
      return;
    }

    if (ready) {
      await botRes(playerInput);
    }
  };

  return (
    <div className="h-full bg-slate-50 pl-80">
      <div className="w-full text-secondary pr-16 pl-8 pt-6 overflow-y-auto h-[calc(100%-64px)] pb-8">
        {messages.map(
          (mess: MessageType, index: number) => (
            <Message
              key={index}
              mess={mess.mess}
              by={mess.by}
              img={mess.img}
            />
          )
        )}
        {/* <Message mess={data[0][0]} by="USER" />
        <Message mess={data[1][0]} by="BOT" />
        <Message mess={data[2][0]} by="BOT" />
        <Message mess={data[3][0]} by="USER" /> */}
        <div className="w-0 h-0" aria-hidden ref={divRef} />
      </div>
      <form
        className={cn(
          "flex items-center justify-center text-xl w-full md:h-16"
        )}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Input
          type="text"
          id="playerInput"
          placeholder="Soạn tin nhắn của bạn"
          className={cn(
            ` focus:border-0 focus:outline-none border-none h-full text-base px-4 py-3 text-gray-400 w-full placeholder:text-muted-foreground/20`
          )}
          {...register("data", { required: true })}
          autoFocus
        />
        <Button
          type="submit"
          variant="outline"
          className={cn(
            " h-full text-base font-bold border-none  opacity-60"
          )}
        >
          Gửi
        </Button>
      </form>
    </div>
  );
};
