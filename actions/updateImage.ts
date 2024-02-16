"use server";

import { db } from "@/lib/db";

export const UpdateImage = async (
  id: string,
  img: string
) => {
  try {
    const newBoard = await db.board.update({
      where: { id },
      data: {
        img,
      },
    });

    if (!newBoard)
      throw new Error("There is no coresspond board");

    return newBoard;
  } catch (err) {
    throw err;
  }
};
