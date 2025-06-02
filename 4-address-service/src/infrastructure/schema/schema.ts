import { getPool } from "../database/connect";

async function addressTable() {
  let pool = getPool();

  if (!pool) {
    throw new Error(
      "Database pool not initialized. call initializedPool() first."
    );
  }

  const query = `
  CREATE TABLE IF NOT EXIST address(
  id SERIAL PRIMARY KEY ,
  uid VARCHAR UNIQUE NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  postal_code VARCHAR(255) NOT NULL,
  other VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

  try {
    const result = pool.query(query);
    console.log("result table file", result);
  } catch (error) {
    console.error("Error while creating the schema", error);
  }
}

export { addressTable };
