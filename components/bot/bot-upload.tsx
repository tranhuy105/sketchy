"use client";

import Image from "next/image";
import Papa from "papaparse";
import { useState, ChangeEvent } from "react";
import { Upload } from "lucide-react";

export type CSVDataItem = string[];
export const Bot = () => {
  const [data, setData] = useState<CSVDataItem[]>([]);

  const handleUpload = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      Papa.parse(file, {
        header: false,
        complete: (res) => {
          setData(res.data as CSVDataItem[]);
        },
      });
    }
  };

  return (
    <>
      {!data[0] ? (
        <div className="w-full py-16 ">
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
          <p className=" w-[640px] mx-auto text-center text-muted-foreground font-semibold intro italic text-base mb-32">
            Combining learning with continuous practice will
            help knowledge quickly be imprinted in the
            brain. And we&apos;re here to help you do that.
            Just{" "}
            <span className="text-sky-400">
              a few steps
            </span>{" "}
            to get started! anywhere! anytime!
          </p>

          <div className=" border w-full" />

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
              <p>
                Before uploading your .csv, be sure to get
                your .csv to be in the right format as show
                here!. <br />
                <span className="text-muted-foreground/50 font-extrabold text-sm mt-4  block">
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
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
