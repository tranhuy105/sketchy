"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Download,
  Plus,
  Trash,
  Upload,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useRouter } from "next/navigation";
import { saveOrCreateNewBoard } from "@/actions/saveOrCreateNewBoard";

interface BotCsvEditorProps {
  title: string;
  content: string;
  boardId?: string;
  image: string | null;
}

function isUrl(value: string) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(value) || value === "";
}

function isValidUrlArrayString(str: string) {
  try {
    const parsedArray = JSON.parse(str);
    if (Array.isArray(parsedArray)) {
      return parsedArray.every(
        (item) => typeof item === "string"
      );
    }
  } catch (error) {
    return false;
  }

  return false;
}

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

export const BotCsvEditor = ({
  title,
  content: c,
  boardId,
  image,
}: BotCsvEditorProps) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const col = ["Index", "Question", "Image?", "Answer"];
  const [vals, setVals] = React.useState<string[][]>(
    JSON.parse(c)
  );
  const [selectedCell, setSelectedCell] = useState<{
    row: number | null;
    col: number | null;
  }>({
    row: null,
    col: null,
  });
  const router = useRouter();

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (vals.length || !error) {
      divRef.current?.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
    }
  }, [vals.length, error]);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (
        e.key === "Enter" &&
        selectedCell.row !== -1 &&
        selectedCell.col !== -1
      ) {
        e.preventDefault();
        setSelectedCell({ row: -1, col: -1 });
      }
    };

    document.addEventListener("keypress", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keypress",
        handleKeyDown
      );
    };
  }, [selectedCell]);

  const handleCellClick = (row: number, col: number) => {
    if (
      row === selectedCell.row &&
      col === selectedCell.col
    )
      return;
    setSelectedCell({ row, col });
  };

  const handleAddRow = () => {
    setVals((prevVals) => [...prevVals, ["", "", ""]]);
  };

  const handleDeleteRow = (index: number) => {
    setVals((prevVals) =>
      prevVals.filter((_, i) => i !== index)
    );
  };

  const handleUrlStringsPrompt = () => {
    const arrayOfUrls = window.prompt(
      "Enter your array of urls:"
    );
    if (arrayOfUrls && isValidUrlArrayString(arrayOfUrls)) {
      const parsedArray = JSON.parse(arrayOfUrls);
      const mappedArray = parsedArray.map((url: string) => [
        "",
        url,
        "",
      ]);
      setVals((prev) => [...prev, ...mappedArray]);
    }
  };

  const handleChangeInput = (
    e: any,
    i: number,
    j: number
  ) => {
    const newVals = vals.slice();

    newVals[i][j] = e.target.value;

    setVals(newVals);
  };

  const handleUpload = async () => {
    if (!isValidData(vals)) {
      setError(true);
      return;
    }
    const uploadDataString = JSON.stringify(vals);
    setIsLoading(true);
    const newBoard = await saveOrCreateNewBoard(
      title,
      "BOT",
      uploadDataString,
      boardId
    );
    setIsLoading(false);
    console.log(newBoard);
  };

  return (
    <div className="w-full h-full flex items-center justify-start flex-col">
      <div className="w-full  gap-2 mt-8">
        <div
          className="flex items-center w-fit hover:border-b-muted-foreground/60 transition-all border-b-2 border-b-transparent pr-2 cursor-pointer text-muted-foreground mx-4 py-1 gap-3 opacity-80 hover:opacity-100"
          onClick={() => {
            router.push(`/bot`);
            router.refresh();
          }}
        >
          <ArrowLeft className="w-6 h-6" />
          <p className="font-semibold">Back To Dashboard</p>
        </div>
      </div>
      <table className="w-[80%] max-h-[80%] mt-12 pt-1">
        <thead>
          <tr>
            {col.length > 0 &&
              col.map((col: string, i: number) => (
                <th
                  key={i}
                  className={cn(
                    i === 0 ? "w-12" : "w-[30%]",
                    i === 2 &&
                      "flex w-full gap-6 items-center justify-center"
                  )}
                >
                  {col}
                  {i === 2 && (
                    <div
                      className={cn(
                        "cursor-pointer px-1 py-1 rounded-lg opacity-50 hover:opacity-100 transition-all",
                        isLoading && "pointer-events-none"
                      )}
                      onClick={handleUrlStringsPrompt}
                    >
                      <Upload className="w-4 h-4" />
                    </div>
                  )}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {vals.map((val: string[], i: number) => (
            <tr key={i}>
              <td className="text-center w-12 relative group bg--500 border">
                <p className="">{i}</p>
                <div className="absolute top-0 left-0">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div className="bg-transparent inline-block absolute top-1 left-1 opacity-0 group-hover:opacity-50 group-hover:text-red-500 hover:opacity-100 transition-all duration-300 cursor-pointer">
                        <Trash className="h-4 w-4" />
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This
                          will permanently delete this row
                          from your table (after you save
                          lmao)
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteRow(i)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
              {val.map((v, j) => (
                <td
                  onClick={() => handleCellClick(i, j)}
                  key={j}
                  className={cn(
                    "",
                    i === selectedCell.row &&
                      j === selectedCell.col &&
                      "font-medium"
                  )}
                >
                  <Input
                    type="text"
                    value={vals[i][j]}
                    // defaultValue={vals[i][j]}
                    disabled={
                      !(
                        i === selectedCell.row &&
                        j === selectedCell.col
                      )
                    }
                    onChange={(e) =>
                      handleChangeInput(e, i, j)
                    }
                    className="block w-full rounded-none disabled:bg-slate-50 h-full px-4 py-3 focus:outline-none focus:ring-0 border disabled:pointer-events-none text-md bg-slate-100 transition-colors duration-300"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-12 pb-12 w-full flex-col gap-3 px-[30%]">
        <Button
          variant="ghost"
          onClick={handleAddRow}
          className="duration-500"
          disabled={isLoading}
        >
          <Plus />
        </Button>
        <Button
          variant={"ghost"}
          onClick={handleUpload}
          disabled={isLoading}
        >
          <Download />
        </Button>
      </div>
      {error && (
        <div className="pb-24 ">
          <div className="w-fit mx-auto px-4 py-3 bg-red-500 text-slate-100/80 font-semibold rounded-xl drop-shadow-lg intro flex items-center gap-5 text-sm mt-12 ">
            <p>
              <span className="block mb-6 text-4xl text-white">
                Invalid Type Error <br />
              </span>
              Please make sure your csv&apos;s{" "}
              <span className="font-bold text-white ">
                question and answer column field is not an
                empty string
              </span>{" "}
              <br className="" /> Also{" "}
              <span className="font-bold text-white ">
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
        </div>
      )}
      <div className="w=0 h-0" ref={divRef} />
    </div>
  );
};
