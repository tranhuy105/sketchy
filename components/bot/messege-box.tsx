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
  data: CSVDataItem[];
}

type MessageType = {
  mess: string;
  by: "USER" | "BOT";
  img: string;
};
type MessagesType = MessageType[];

const randomItem = (x: CSVDataItem[]) =>
  x.splice((Math.random() * x.length) | 0, 1);

export const MessageBox = ({ data }: MessageProps) => {
  const [d, setData] = useState(data);
  const [messages, setMessages] = useState<MessagesType>([
    {
      mess: `Type "~" in your keyboard to start and pause a session`,
      by: "BOT",
      img: "",
    },
  ]);
  const [currentQuestion, setCurrentQuestion] =
    useState<CSVDataItem>(data[0]);
  const [ready, setIsReady] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messages.length) {
      divRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages.length]);

  // console.log(data);

  // ADD MESSAGE LOGIC
  const addMessege = (
    data: string,
    by: "BOT" | "USER",
    img: string
  ) => {
    setMessages((cur: MessagesType) => [
      ...cur,
      {
        mess: data,
        by,
        img,
      },
    ]);
  };

  // ADDING QUESTION LOGIC
  const addQuestion = (playerInput: string) => {
    if (!d[0]) {
      addMessege(
        "You have finised this deck, type x to reset and play again",
        "BOT",
        ""
      );
      return;
    }

    const nextQuestion = randomItem(d)[0];

    if (playerInput === currentQuestion[2]) {
      console.log("correct");
      console.log(nextQuestion);
    } else {
      // setData((cur)=>[...cur, currentQuestion]);
      console.log(playerInput, currentQuestion[2]);
      console.log("wrong");
    }
  };

  // PAUSING LOGIC
  useEffect(() => {
    const handlePause = (e: KeyboardEvent) => {
      if (e.key === "~") {
        console.log("pause");
        setIsReady((cur) => !cur);
      }
    };

    window.addEventListener("keydown", handlePause);

    return () => {
      window.removeEventListener("keydown", handlePause);
    };
  });

  useEffect(() => {
    if (ready) {
      addMessege(currentQuestion[0], "BOT", "");
      // addQuestion("");
    }
  }, [ready]);

  // const stringData = JSON.stringify(data);
  // const objectData = JSON.parse(stringData);

  const { handleSubmit, register, resetField } =
    useForm<FieldValues>({
      defaultValues: {
        data: "",
      },
    });

  // WHEN PLAYER INPUT, THE LOGIC
  const onSubmit: SubmitHandler<FieldValues> = (
    message
  ) => {
    const { data } = message;
    addMessege(data, "USER", "");
    resetField("data");
    if (!ready) {
      addMessege(
        "Please type ~ in your keyboard to get ready",
        "BOT",
        ""
      );
      return;
    }
    addQuestion(data);
  };

  return (
    <div className="h-full bg-transparent pl-64">
      <div className="w-full text-secondary pr-24 pl-12 overflow-y-auto h-[calc(100%-64px)]">
        {messages.map(
          (mess: MessageType, index: number) => (
            <Message
              key={index}
              mess={mess.mess}
              by={mess.by}
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
        className="flex items-center justify-center text-xl w-full md:h-16"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Input
          type="text"
          id="data"
          placeholder="Soạn tin nhắn của bạn"
          className={cn(
            ` focus:border-0 focus:outline-none h-full text-base px-4 py-3 rounded-l-lg text-gray-400 w-full placeholder:text-muted-foreground/20`
          )}
          {...register("data", { required: true })}
          // disabled={isTyping}
          autoFocus
        />
        <Button
          type="submit"
          variant="default"
          className={cn(
            " h-full text-base font-bold bg-sky-500 hover:bg-sky-600 rounded-r-xl rounded-l-none"
          )}
        >
          Gửi
        </Button>
      </form>
    </div>
  );
};
