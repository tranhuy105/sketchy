"use server";

import { db } from "@/lib/db";

export const DeleteBoard = async (id: string) => {
  try {
    const deletedBoard = await db.board.delete({
      where: { id },
    });

    if (!deletedBoard) {
      throw new Error(
        "There is no board with this id to delete!"
      );
    }
    return deletedBoard;
  } catch (err) {
    throw err;
  }
};
