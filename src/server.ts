import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/users"
import videoRoutes from "./routes/videos"
import commentRoutes from "./routes/comments"
import { defaultErrorHandler } from "./errors";

const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
//parses req to json
app.use(express.json()); 

app.use("/users", userRoutes)
app.use("/videos", videoRoutes)
app.use("/comments", commentRoutes)
app.use(defaultErrorHandler)


const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Api Listening --> http://localhost:${PORT}`);
  });