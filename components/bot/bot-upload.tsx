"use client";

import Image from "next/image";
import Papa from "papaparse";
import { useState, ChangeEvent } from "react";
import { ArrowBigRightDash, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveOrCreateNewBoard } from "@/actions/saveOrCreateNewBoard";
import { Button } from "../ui/button";

export type CSVDataItem = string[];
export const Bot = () => {
  const router = useRouter();
  const [error, setError] = useState(false);

  function isValidData(data: any): data is string[][] {
    return (
      Array.isArray(data) &&
      data.every(Array.isArray) &&
      data.every(
        (arr) =>
          arr.length === 3 &&
          typeof arr[0] === "string" &&
          arr[0] !== "" &&
          typeof arr[1] === "string" &&
          isUrl(arr[1]) &&
          typeof arr[2] === "string" &&
          arr[2] !== ""
      )
    );
  }

  const isUrl = (value: string) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    return urlRegex.test(value) || value === "";
  };

  const handleCreateBot = async () => {
    const board = await saveOrCreateNewBoard(
      "New Bot",
      "BOT",
      `[["q1","","a1"]]`
    );
    router.push(`/edit/${board.id}`);
  };

  const handleUpload = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      Papa.parse(file, {
        header: false,
        complete: async (res) => {
          const trimmedData = res.data.slice(0, -1);

          try {
            if (isValidData(trimmedData)) {
              const board = await saveOrCreateNewBoard(
                "My bot",
                "BOT",
                JSON.stringify(trimmedData)
              );
              router.push(`/bot/${board.id}`);
            } else {
              console.error(trimmedData, "INVALID TYPE");
              throw new Error("Invalid Type");
            }
          } catch (error) {
            setError(true);
            console.error("Error uploading file:", error);
          }
        },
      });
    }
  };

  return (
    <>
      <div className="w-full py-16 bg-slate-50">
        <h1 className="text-center text-6xl font-bold my-16 w-[70%] mx-auto leading-snug tracking-tight">
          Learn faster by &quot;
          <span className="text-sky-600  italic font-extrabold">
            trial and error
          </span>{" "}
          &quot; with the help of our{" "}
          <span className="uppercase text-red-600 font-extrabold tracking-widest italic">
            BOT
          </span>
        </h1>

        <div className="w-[800px] mx-auto mb-8 mt-16 h-[500px] relative intro ">
          <Image
            src={"/placeholder/8.svg"}
            fill
            alt="bot_"
            className="object-cover"
          />
        </div>
        <p className=" w-[640px] mx-auto text-center text-muted-foreground font-semibold intro italic text-base mb-32 tracking-tight">
          Combining learning with continuous practice will
          help knowledge quickly be imprinted in the brain.
          And we&apos;re here to help you do that. Just{" "}
          <span className="text-sky-400">a few steps</span>{" "}
          to get started! anywhere! anytime!
        </p>

        <div className="w-full grid grid-cols-2 items-center mt-28 intro">
          <div className="w-[800px] mx-auto mb-8 mt-16 h-[500px] relative intro ">
            <Image
              src={"/placeholder/1.svg"}
              fill
              alt="bot_"
              className="object-cover"
            />
          </div>
          <div className=" w-[320px] mx-auto text-left text-primary font-semibold intro italic space-y-8 text-xl">
            <h2 className="font-extrabold  text-5xl truncate">
              Hey There!
            </h2>
            <p className="tracking-tighter">
              Before uploading your .csv, be sure to get
              your .csv to be in the right format as show
              here!. <br />
              <span className="text-muted-foreground/50 font-light text-sm mt-4  block">
                This is crucial for our bot to work and
                function correctly
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center my-16 mt-16 px-6 py-3 rounded-2xl opacity-90 hover:opacity-100 transition-all duration-500 hover:scale-105 border w-64 bg-blue-500 text-white mx-auto relative group">
          <p>Upload your csv here</p>
          <div className="">
            <Upload />
          </div>
          <input
            type="file"
            accept=".csv"
            className="opacity-0 absolute w-full h-full group-hover:cursor-pointer"
            onChange={handleUpload}
          />
        </div>
        <div
          className="flex flex-col  items-center justify-center my-16 mt-8 px-6 py-3 rounded-2xl opacity-90 hover:opacity-100 transition-all duration-500 hover:scale-105 w-96 bg-transparent text-muted-foreground mx-auto relative group cursor-pointer"
          onClick={handleCreateBot}
        >
          <p>Or start right away with an empty table</p>
          <div className="">
            <ArrowBigRightDash className="h-8 w-12" />
          </div>
        </div>
        {error && (
          <div className="w-fit mx-auto px-4 py-3 bg-red-500 text-slate-100 font-semibold rounded-xl drop-shadow-lg intro flex items-center gap-5 text-sm -mt-6">
            <p>
              Invalid Type Error <br />
              Please make sure your csv has{" "}
              <span className="font-bold text-white underline decoration-sky-500 underline-offset-2">
                at least 3 column of question, image, answer
              </span>{" "}
              <br /> Also{" "}
              <span className="font-bold text-white underline decoration-sky-500 underline-offset-2">
                images must be a valid URL
              </span>
            </p>
            <Button
              variant={"destructive"}
              onClick={() => setError(false)}
              className="hover:bg-red-600 transition-colors"
            >
              Ok
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
