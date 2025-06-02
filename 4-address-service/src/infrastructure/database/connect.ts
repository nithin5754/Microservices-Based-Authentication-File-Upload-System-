import { Pool } from "pg";

const tempPool: Pool = new Pool({
  user: process.env.ADDRESS_DB_USER as string,
  host: process.env.ADDRESS_DB_HOST as string,
  database: "postgres",
  password: process.env.ADDRESS_DB_PASSWORD as string,
  port: Number(process.env.ADDRESS_DB_PORT as string),
});

let pool: Pool | null = null;

async function checkDbExists(dbName: string) {
  try {
    const client = await tempPool.connect();

    const query = `
  SELECT 1 FROM pg_database WHERE datname=$1
  `;

    const isExists = await client.query(query, [dbName]);

    if (isExists.rows.length === 0) {
      console.log("address service started creating database");

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

  await checkDbExists(process.env.ADDRESS_DB_NAME as string);

  pool = new Pool({
    user: process.env.ADDRESS_DB_USER as string,
    host: process.env.ADDRESS_DB_HOST as string,
    database: "postgres",
    password: process.env.ADDRESS_DB_PASSWORD as string,
    port: Number(process.env.ADDRESS_DB_PORT as string),
  });

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
