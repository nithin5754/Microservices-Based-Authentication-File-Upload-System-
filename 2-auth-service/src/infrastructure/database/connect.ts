import { Client, Pool } from "pg";
import dotenv from 'dotenv'
dotenv.config();
const tempPool = new Pool({
  user: process.env.AUTH_DB_USER as string,
  host: process.env.AUTH_DB_HOST as string,
  database: "postgres",
  password: process.env.AUTH_DB_PASSWORD as string,
  port: Number(process.env.AUTH_DB_PORT as string),
});

let pool: Pool | null = null;

async function checkDBeXISTS(dbName: string) {
  const client = await tempPool.connect();
  try {
    const dbExists = await client.query(
      `
      SELECT 1 FROM pg_database WHERE datname=$1`,
      [dbName]
    );

    if (dbExists.rowCount === 0) {
      console.log(`Creating database ${dbName}...`);
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  } catch (error) {
    console.error("Error creating or checking database:", error);
    throw error;
  } finally {
    client.release();
  }
}

async function initializePool() {
  if (pool) return pool;

  await checkDBeXISTS(process.env.AUTH_DB_NAME as string);
  pool = new Pool({
    user: process.env.AUTH_DB_USER as string,
    host: process.env.AUTH_DB_HOST as string,
    database: process.env.AUTH_DB_NAME as string,
    password: process.env.AUTH_DB_PASSWORD as string,
    port: Number(process.env.AUTH_DB_PORT as string),
  });
  console.log("pool", pool);
  console.log(`Connected to database: ${process.env.AUTH_DB_NAME}`);

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

export { initializePool, getPool };
