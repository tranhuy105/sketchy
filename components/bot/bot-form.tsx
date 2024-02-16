"use client";

import { MessageBox } from "./messege-box";
import { Sidebar } from "./sidebar";

const test = [
  ["cau 1", "img", "1"],

  ["cau 2", "", "2"],

  ["cau 3", "url", "3"],

  ["cau 4", "url", "4"],
];

interface BotFormProps {
  id?: string;
}

export const BotForm = ({ id }: BotFormProps) => {
  return (
    <div className=" h-[calc(100vh-64px)] bg-transparent relative w-full">
      <Sidebar />
      {id && <MessageBox data={test}></MessageBox>}
    </div>
  );
};
