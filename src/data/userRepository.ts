import { db } from "./db";


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