import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const tempPool = new Pool({
  user: process.env.FILE_DB_USER as string,
  host: process.env.FILE_DB_HOST as string,
  database: "postgres",
  password: process.env.FILE_DB_PASSWORD as string,
  port: Number(process.env.FILE_DB_PORT as string),
});
let pool: Pool | null = null;

async function checkDbExists(dbName: string) {
  try {
    const client = await tempPool.connect();

    const dbExists = await client.query(
      `
      SELECT 1 FROM pg_database WHERE datname=$1

      `,
      [dbName]
    );

    if (dbExists.rowCount === 0) {
      console.log(`Creating database ${dbName}...`);

      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully.`);
    }
    console.log(`Database ${dbName} already exists.`);

    client.release();
  } catch (error) {
    console.error("Error creating or checking database:", error);
    throw error;
  }
}

async function initializePool() {
  if (pool) return pool;

  await checkDbExists(process.env.FILE_DB_NAME as string)

  pool = new Pool({
    user: process.env.FILE_DB_USER as string,
    host: process.env.FILE_DB_HOST as string,
    database: "postgres",
    password: process.env.FILE_DB_PASSWORD as string,
    port: Number(process.env.FILE_DB_PORT as string),
  });

  console.log(`Connected to database: ${process.env.FILE_DB_NAME}`);

  return pool;
}

function getPool() {
  if (!pool) {
    throw new Error(
      "Database connection not initialized. Call initializePool() first."
    );
  }
  return pool;
}


export {
  initializePool,getPool
}
