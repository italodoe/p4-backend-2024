import { db } from "../data/db";
import { Router } from "express";
import { z } from "zod";
import { catchError } from "../errors";
import { send } from "../response";
import { findAllUsers } from "../data/userRepository";


const router = Router();

router.get("/", 
catchError(async (request, response) => {
    const users = await findAllUsers();
    send(response).ok(users);
  })
)




export default router;