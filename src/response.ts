import type { Response as ExpressResponse } from "express";
import type { ZodError } from "zod";

enum HttpStatusCode {
  OK = 200,
  Created = 201,
  Deleted = 204,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
  NotImplemented = 501,
}

export const send = (res: ExpressResponse) => {
  return {
    ok: (data: any) => res.status(HttpStatusCode.OK).json(data),
    createdOk: (data: any) => res.status(HttpStatusCode.Created).json(data),
    deletedOk: (data: any) => res.status(HttpStatusCode.Deleted).json(data),
    internalError: (msg: string) =>
      res.status(HttpStatusCode.InternalServerError).send(msg),
    notFound: () => res.status(HttpStatusCode.NotFound).send("Not found."),
    badRequest: (msg: string) =>
      res.status(HttpStatusCode.BadRequest).send(msg),
    badRequestZod: (data: ZodError) =>
      res.status(HttpStatusCode.BadRequest).json(data.issues),
    notImplemented: (msg: string) =>
      res.status(HttpStatusCode.NotImplemented).send("Not implemented."),
  };
};
