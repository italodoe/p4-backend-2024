import { db } from "../data/db";
import { Router, request, response } from "express";
import { z } from "zod";
import { catchError } from "../errors";
import { send } from "../response";
import {
  deleteCommentById,
  deleteCommentsByAuthorId,
  deleteCommentsByVideoId,
  findAllComments,
  findAllCommentsByAuthorEmail,
  findAllCommentsByAuthorId,
  findAllCommentsByAuthorNick,
  findAllCommentsByParent,
  findAllCommentsByVideoAuthor,
  findAllCommentsByVideoId,
  findAllCommentsByVideoUrl,
  findCommentById,
  newComment,
  updateCommentByAuthorVideo,
  updateCommentById,
} from "../data/commentRepository";

const router = Router();
const idParamsSchema = z.object({
  id: z.coerce.number(),
});

const videoIdAuthorIdParamsSchema = z.object({
  videoId: z.coerce.number(),
  authorId: z.coerce.number(),
});

const nickParamsSchema = z.object({
  nick: z.coerce.string().min(3).max(255),
});

const emailParamsSchema = z.object({
  email: z.coerce.string().email().min(5),
});

const urlCodeParamsSchema = z.object({
  url: z.string().regex(/^[a-zA-Z0-9_-]{11}$/),
});

const commentBodySchema = z.object({
  authorId: z.coerce.number(),
  videoId: z.coerce.number(),
  text: z.coerce.string().min(3).max(255),
  parentId: z.coerce.number().nullish(),
});

const commentPutBodySchema = z.object({
  text: z.coerce.string().min(3).max(255),
  parentId: z.coerce.number().nullish(),
});

/*
GET     /comments/
GET     /comments/:id
GET     /comments/author/id/:id
GET     /comments/author/nick/:nick
GET     /comments/author/email/:email
GET     /comments/video/id/:id
GET     /comments/video/url/:url
GET     /comments/video/:videoId/author/:authorId
GET     /comments/parent/:id
*/

router.get(
  "/",
  catchError(async (request, response) => {
    const comments = await findAllComments();
    send(response).ok(comments);
  })
);

router.get(
  "/:id",
  catchError(async (request, response, next) => {
    const { id: commentId } = idParamsSchema.parse(request.params);
    const comment = await findCommentById(commentId);
    send(response).ok(comment);
  })
);

router.get(
  "/author/id/:id",
  catchError(async (request, response) => {
    const { id: authorId } = idParamsSchema.parse(request.params);
    const comments = await findAllCommentsByAuthorId(authorId);
    send(response).ok(comments);
  })
);

router.get(
  "/author/nick/:nick",
  catchError(async (request, response) => {
    const { nick } = nickParamsSchema.parse(request.params);
    const comments = await findAllCommentsByAuthorNick(nick);
    send(response).ok(comments);
  })
);

router.get(
  "/author/email/:email",
  catchError(async (request, response) => {
    const { email } = emailParamsSchema.parse(request.params);
    const comments = await findAllCommentsByAuthorEmail(email);
    send(response).ok(comments);
  })
);

router.get(
  "/video/id/:id",
  catchError(async (request, response) => {
    const { id: videoId } = idParamsSchema.parse(request.params);
    const comments = await findAllCommentsByVideoId(videoId);
    send(response).ok(comments);
  })
);

router.get(
  "/video/url/:url",
  catchError(async (request, response) => {
    const { url } = urlCodeParamsSchema.parse(request.params);
    const comments = await findAllCommentsByVideoUrl(url);
    send(response).ok(comments);
  })
);

router.get(
  "/parent/:id",
  catchError(async (request, response) => {
    const { id: commentId } = idParamsSchema.parse(request.params);
    const comments = await findAllCommentsByParent(commentId);
    send(response).ok(comments);
  })
);

router.get(
  "/video/:videoId/author/:authorId",
  catchError(async (request, response) => {
    const { videoId, authorId } = videoIdAuthorIdParamsSchema.parse(
      request.params
    );
    const comments = await findAllCommentsByVideoAuthor(videoId, authorId);
    send(response).ok(comments);
  })
);

/*
POST    /comments/
*/

router.post(
  "/",
  catchError(async (request, response, next) => {
    const { authorId, videoId, text, parentId } = commentBodySchema.parse(
      request.body
    );
    const comment = await newComment(authorId, videoId, text, parentId ?? null);
    send(response).ok(comment);
  })
);

/*
PUT     /comments/id/:id
PUT     /comments/video/:videoId/author/:authorId
*/

router.put(
  "/:id",
  catchError(async (request, response, next) => {
    const { id: commentId } = idParamsSchema.parse(request.params);
    const { text, parentId } = commentPutBodySchema.parse(request.body);
    const comment = await updateCommentById(commentId, text, parentId ?? null);
    send(response).ok(comment);
  })
);

router.put(
  "/video/:videoId/author/:authorId",
  catchError(async (request, response, next) => {
    const { videoId, authorId } = videoIdAuthorIdParamsSchema.parse(request.params);
    const { text, parentId } = commentPutBodySchema.parse(request.body);
    const comment = await updateCommentByAuthorVideo(videoId, authorId, text, parentId ?? null);
    send(response).ok(comment);
  })
);


/*
DELETE  /comments/id/:id
DELETE  /comments/video/:id
DELETE  /comments/author/:id
*/

router.delete(
  "/id/:id",
  catchError(async (request, response, next) => {
    const { id: commentId } = idParamsSchema.parse(request.params);
    const comment = await deleteCommentById(commentId);
    send(response).ok(comment);
  })
);

router.delete(
  "/video/:id",
  catchError(async (request, response, next) => {
    const { id: videoId } = idParamsSchema.parse(request.params);
    const comments = await deleteCommentsByVideoId(videoId);
    send(response).ok(comments);
  })
);

router.delete(
  "/author/:id",
  catchError(async (request, response, next) => {
    const { id: authorId } = idParamsSchema.parse(request.params);
    const comments = await deleteCommentsByAuthorId(authorId);
    send(response).ok(comments);
  })
);

export default router;
