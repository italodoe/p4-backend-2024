import type { Prisma } from "@prisma/client";
import { db } from "./db";
export type UserOutput = Prisma.UserCreateInput;

export const newUser = async (
  email: string,
  nick: string,
  fullName: string | null,
  admin: boolean = false,
  videos = null,
  comments = null
) => {
  return await db.user.create({
    data: {
      email,
      nick,
      fullName,
      admin,
    },
  });
};

/*
  Find
*/

export const findAllUsers = async () => {
  return await db.user.findMany({
    include: {
      videos: true,
      comments: true,
    },
  });
};

export const findUserById = async (
  userId: number
): Promise<UserOutput | null> => {
  return await db.user.findFirst({
    where: { userId },
  });
};

export const findUserByNick = async (
  nick: string
): Promise<UserOutput | null> => {
  return await db.user.findFirst({
    where: { nick },
  });
};

export const findUserByEmail = async (
  email: string
): Promise<UserOutput | null> => {
  return await db.user.findFirst({
    where: { email },
  });
};
