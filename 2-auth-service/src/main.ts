import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { corsOptions } from "./adapter/config/CorsOptions";
import route from './presentation/routes/route';

dotenv.config();

const port: string = process.env.PORT as string;

const app = express();

app.use(cors(corsOptions));


app.use(express.json());

const server = async () => {
  let retries = 5;

  while (retries > 0) {
    try {
       app.use('/',route);
      app.listen(port, () => {
        console.log(`Auth server started on: http://localhost:${port}`);
      });
      break;
    } catch (error: unknown) {
      const err = error as Error & { code?: string };

      if (err.code === "EADDRINUSE") {
        console.error(`Port ${port} is in use. Retrying...`);
      } else {
        console.error("Error starting server:", err.message);
      }
      retries--;
      if (retries === 0) {
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

server();
