"use server";

import { db } from "@/lib/db";

export const getBoards = async () => {
  try {
    const boards = db.board.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return boards;
  } catch (err) {
    throw err;
  }
};
