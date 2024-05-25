import type { ErrorRequestHandler, RequestHandler } from "express";
import { send } from "./response";

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.error("err.name ", err.name);

  switch (err.name) {
    case "NotFoundError":
      return send(res).notFound();

    case "ZodError":
      console.error("err ", err);
      return send(res).badRequestZod(err);

    case "PrismaClientKnownRequestError":
      console.error("err ", err);
      return send(res).badRequestPrisma(err);

    default:
      return send(res).internalError("Internal error");
  }
};

export const catchError =
  (myHandler: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await myHandler(req, res, next);
    } catch (error: any) {
      next(error);
    }
  };
