"use server";

import { db } from "@/lib/db";

export const getBoards = async (
  type?: string,
  query?: string
) => {
  try {
    let prismaQuery = {
      orderBy: {
        updatedAt: "desc" as const,
      },
      where: {},
    };

    if (type) {
      prismaQuery = {
        ...prismaQuery,
        where: {
          type: type,
        },
      };
    }

    if (query) {
      prismaQuery = {
        ...prismaQuery,
        where: {
          ...prismaQuery.where,
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive", // Case-insensitive search for title
              },
            },
            {
              content: {
                contains: query,
                mode: "insensitive", // Case-insensitive search for content
              },
            },
          ],
        },
      };
    }

    // Execute the Prisma query
    const boards = await db.board.findMany(prismaQuery);

    return boards;
  } catch (err) {
    throw err;
  }
};
