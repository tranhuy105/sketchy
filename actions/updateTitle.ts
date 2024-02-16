"use server";

import { db } from "@/lib/db";

export const updateTitle = async (
  id: string,
  title: string
) => {
  try {
    const newBoard = await db.board.update({
      where: { id },
      data: {
        title,
      },
    });

    if (!newBoard)
      throw new Error("There is no coresspond board");

    return newBoard;
  } catch (err) {
    throw err;
  }
};
