import dotenv from "dotenv";
import express, { Request } from "express";
import cors from "cors";
import { corsOptions } from "./adapter/config/CorsOptions";
import proxy from 'express-http-proxy'
import {authMiddleware} from "./adapter/middleware/Jwt-middleware";

dotenv.config();

const port: string = process.env.PORT as string;

const app = express();

app.use(cors(corsOptions));


app.use('/auth',proxy(process.env.AUTH_URL as string))
app.use('/file',authMiddleware,proxy(process.env.FILE_URL as string, {
  proxyReqOptDecorator: (proxyReqOpts, srcReq: Request) => {
    if (srcReq.user) {
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        'x-user': JSON.stringify(srcReq.user),
      };
    }
    return proxyReqOpts;

  }
  }))

const server = async () => {
  let retries = 5;

  while (retries > 0) {
    try {
      app.listen(port, () => {
        console.log(`server started on: http://localhost:${port}`);
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
