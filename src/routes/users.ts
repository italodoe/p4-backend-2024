import { db } from "../data/db";
import { Router, request, response } from "express";
import { z } from "zod";
import { catchError } from "../errors";
import { send } from "../response";
import {
  deleteUserById,
  deleteUserByNick,
  findAllUsers,
  findUserByEmail,
  findUserById,
  findUserByNick,
  newUser,
  updateUserById,
  updateUserByNick,
} from "../data/userRepository";

const router = Router();
const idParamsSchema = z.object({
  id: z.coerce.number(),
});
const nickParamsSchema = z.object({
  nick: z.coerce.string().min(5).max(255),
});
const emailParamsSchema = z.object({
  email: z.coerce.string().email().min(5),
});

const userBodySchema = z.object({
  nick: z.string().min(5).max(255),
  fullName: z.string().min(5).max(255),
  email: z.coerce.string().email().min(5),
  admin: z.coerce.boolean(),
});

/*
GET     /users/
GET     /users/id/:id
GET     /users/nick/:nick
GET     /users/email/:email
*/

router.get(
  "/",
  catchError(async (request, response) => {
    const users = await findAllUsers();
    send(response).ok(users);
  })
);

router.get(
  "/id/:id",
  catchError(async (request, response, next) => {
    const { id: userId } = idParamsSchema.parse(request.params);
    const user = await findUserById(userId);
    send(response).ok(user);
  })
);

router.get(
  "/nick/:nick",
  catchError(async (request, response, next) => {
    const { nick } = nickParamsSchema.parse(request.params);
    const user = await findUserByNick(nick);
    send(response).ok(user);
  })
);

router.get(
  "/email/:email",
  catchError(async (request, response, next) => {
    const { email } = emailParamsSchema.parse(request.params);
    const user = await findUserByEmail(email);
    send(response).ok(user);
  })
);

/*
POST    /users/
*/

router.post(
  "/",
  catchError(async (request, response, next) => {
    const { email, nick, fullName, admin } = userBodySchema.parse(request.body);
    const user = await newUser(email, nick, fullName, admin);
    send(response).ok(user);
  })
);

/*
PUT     /users/id/:id
PUT     /users/nick/:nick
*/

router.put(
  "/id/:id",
  catchError(async (request, response, next) => {
    const { id: userId } = idParamsSchema.parse(request.params);
    const { email, nick, fullName, admin } = userBodySchema.parse(request.body);
    const user = await updateUserById(userId, email, nick, fullName, admin);
    send(response).ok(user);
  })
);

router.put(
  "/nick/:nick",
  catchError(async (request, response, next) => {
    const { nick } = nickParamsSchema.parse(request.params);
    const {
      email,
      nick: newNick,
      fullName,
      admin,
    } = userBodySchema.parse(request.body);
    const user = await updateUserByNick(nick, newNick, email, fullName, admin);
    send(response).ok(user);
  })
);


/*
DELETE  /users/id/:id
DELETE  /users/nick/:nick
*/

router.delete(
  "/id/:id",
  catchError(async (request, response, next) => {
    const { id: userId } = idParamsSchema.parse(request.params);
    const user = await deleteUserById(userId);
    send(response).ok(user);
  })
);

router.delete(
  "/nick/:nick",
  catchError(async (request, response, next) => {
    const { nick } = nickParamsSchema.parse(request.params);
    const user = await deleteUserByNick(nick);
    send(response).ok(user);
  })
);


export default router;
