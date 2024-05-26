import { db } from "../data/db";
import { Router, request, response } from "express";
import { z } from "zod";
import { catchError } from "../errors";
import { send } from "../response";
import {
  findAllVideos,
  findAllVideosByAuthorEmail,
  findAllVideosByAuthorId,
  findAllVideosByAuthorNick,
  findVideoByDescription,
  findVideoById,
  findVideoByTitle,
  findVideoByUrl,
  newVideo,
  updateVideoById,
  updateVideoViewsById,
  deleteVideoById,
  updateVideoByUrl,
  deleteVideoByUrl,
  deleteVideoByAuthor,
} from "../data/videoRepository";

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

const urlCodeParamsSchema = z.object({
  url: z.string().regex(/^[a-zA-Z0-9_-]{11}$/),
});

const searchParamsSchema = z.object({
  title: z.coerce.string().min(3).max(255).nullish(),
  description: z.coerce.string().min(3).max(255).nullish(),
});

const videoBodySchema = z.object({
  authorId: z.coerce.number(),
  url: z.string().regex(/^[a-zA-Z0-9_-]{11}$/),
  title: z.coerce.string().min(3).max(255),
  description: z.coerce.string().min(3).max(255).nullish(),
});

/*
GET     /videos/
GET     /videos/author/id/:id
GET     /videos/author/nick/:nick
GET     /videos/author/email/:email
GET     /videos/id/:id
GET     /videos/url/:url
GET     /videos/search?title
GET     /videos/search?description
*/

router.get(
  "/",
  catchError(async (request, response) => {
    const videos = await findAllVideos();
    send(response).ok(videos);
  })
);

router.get(
  "/author/id/:id",
  catchError(async (request, response) => {
    const { id: authorId } = idParamsSchema.parse(request.params);
    const videos = await findAllVideosByAuthorId(authorId);
    send(response).ok(videos);
  })
);

router.get(
  "/author/nick/:nick",
  catchError(async (request, response) => {
    const { nick } = nickParamsSchema.parse(request.params);
    const videos = await findAllVideosByAuthorNick(nick);
    send(response).ok(videos);
  })
);

router.get(
  "/author/email/:email",
  catchError(async (request, response) => {
    const { email } = emailParamsSchema.parse(request.params);
    const videos = await findAllVideosByAuthorEmail(email);
    send(response).ok(videos);
  })
);

router.get(
  "/id/:id",
  catchError(async (request, response) => {
    const { id: videoId } = idParamsSchema.parse(request.params);
    const video = await findVideoById(videoId);
    send(response).ok(video);
  })
);

router.get(
  "/url/:url",
  catchError(async (request, response) => {
    const { url } = urlCodeParamsSchema.parse(request.params);
    const video = await findVideoByUrl(url);
    send(response).ok(video);
  })
);

router.get(
  "/search",
  catchError(async (request, response) => {
    const { title, description } = searchParamsSchema.parse(request.query);
    let videos;
    console.log(title, description, typeof title);
    if (title) {
      videos = await findVideoByTitle(title);
    } else if (description) {
      videos = await findVideoByDescription(description);
    } else {
      send(response).badRequest(
        "Missing query parameter: either 'title' or 'description' is required"
      );
    }
    send(response).ok(videos);
  })
);

/*
POST    /videos/
*/

router.post(
  "/",
  catchError(async (request, response, next) => {
    const { authorId, url, title, description } = videoBodySchema.parse(
      request.body
    );
    const video = await newVideo(authorId, url, title, description ?? null);
    send(response).ok(video);
  })
);

/*
PUT     /videos/id/:id
PUT     /videos/url/:url
PUT     /videos/views/:id
*/

router.put(
  "/id/:id",
  catchError(async (request, response, next) => {
    const { id: videoId } = idParamsSchema.parse(request.params);
    const { url, title, description } = videoBodySchema.parse(request.body);
    const video = await updateVideoById(
      videoId,
      url,
      title,
      description ?? null
    );
    send(response).ok(video);
  })
);

router.put(
  "/url/:url",
  catchError(async (request, response, next) => {
    const { url } = urlCodeParamsSchema.parse(request.params);
    const {
      url: newUrl,
      title,
      description,
    } = videoBodySchema.parse(request.body);
    const video = await updateVideoByUrl(
      url,
      newUrl,
      title,
      description ?? null
    );
    send(response).ok(video);
  })
);

router.put(
  "/views/:id",
  catchError(async (request, response, next) => {
    const { id: videoId } = idParamsSchema.parse(request.params);
    const video = await updateVideoViewsById(videoId);
    send(response).ok(video);
  })
);

/*
DELETE  /videos/id/:id
DELETE  /videos/url/:url
DELETE  /videos/author/:id
*/

router.delete(
  "/id/:id",
  catchError(async (request, response, next) => {
    const { id: videoId } = idParamsSchema.parse(request.params);
    const video = await deleteVideoById(videoId);
    send(response).ok(video);
  })
);

router.delete(
  "/url/:url",
  catchError(async (request, response, next) => {
    const { url } = urlCodeParamsSchema.parse(request.params);
    const video = await deleteVideoByUrl(url);
    send(response).ok(video);
  })
);

router.delete(
  "/author/:id",
  catchError(async (request, response, next) => {
    const { id: authorId } = idParamsSchema.parse(request.params);
    const videos = await deleteVideoByAuthor(authorId);
    send(response).ok(videos);
  })
);

export default router;
