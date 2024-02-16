"use server";

import { db } from "@/lib/db";

export const getBoardFromId = async (id: string) => {
  try {
    const Boards = await db.board.findUnique({
      where: {
        id,
      },
    });

    return Boards;
  } catch (err) {
    throw err;
  }
};
