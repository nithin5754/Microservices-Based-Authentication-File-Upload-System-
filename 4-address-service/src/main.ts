import express from "express";
import dotenv from "dotenv";
import { initializePool } from "./infrastructure/database/connect";
import { addressTable } from "./infrastructure/schema/schema";
dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT;

async function startServer() {
  let retries = 5;

  await initializePool()

  await addressTable();
  

  try {
    app.listen(port, () => {
      console.log("address service server started...");
    });
  } catch (error) {}
}
