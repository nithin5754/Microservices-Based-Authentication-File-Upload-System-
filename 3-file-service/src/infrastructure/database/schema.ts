import { Pool } from "pg";
import { getPool } from "./connect";

async function fileTable() {
  const pool: Pool = getPool();

  if (!pool) {
    throw new Error(
      "Database pool not initialized. call initializedPool() first."
    );
  }

  const query = `CREATE TABLE IF NOT EXISTS fileupload (
id SERIAL PRIMARY KEY , 
uid VARCHAR(255) NOT NULL,
filename VARCHAR(255) UNIQUE NOT NULL,
file_path TEXT NOT NULL,
uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

  try {
    const result = await pool.query(query);

    console.log("result table file", result);
  } catch (error) {
    console.error("Error while creating the schema", error);
  }
}

export { fileTable };
