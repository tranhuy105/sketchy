"use server";

import { db } from "@/lib/db";

const images = [
  "/placeholder/1.svg",
  "/placeholder/2.svg",
  "/placeholder/3.svg",
  "/placeholder/4.svg",
  "/placeholder/5.svg",
  "/placeholder/6.svg",
  "/placeholder/7.svg",
  "/placeholder/8.svg",
  "/placeholder/9.svg",
  "/placeholder/10.svg",
];

export const saveOrCreateNewBoard = async (
  title: string,
  type: "NOTE" | "SKETCH" | "BOT",
  content: string,
  id?: string
) => {
  try {
    let board = null;

    const randomImage =
      images[Math.floor(Math.random() * images.length)];

    if (!id) {
      board = await db.board.create({
        data: {
          title,
          content,
          type,
          img: randomImage,
        },
      });
    } else {
      board = await db.board.update({
        where: { id },
        data: {
          title,
          content,
          type,
        },
      });
    }

    // console.log(board);
    return board;
  } catch (err) {
    throw err;
  }
};
