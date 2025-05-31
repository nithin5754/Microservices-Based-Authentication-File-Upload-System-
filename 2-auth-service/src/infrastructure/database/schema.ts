import { Pool } from "pg";
import { getPool } from "./connect";




async function userTable() {

  const pool:Pool=getPool()
    if (!pool) {
    throw new Error(
      "Database pool not initialized. Call initializePool() first."
    );
  }

  const query=`
  CREATE TABLE IF NOT EXISTS userauth (
  id SERIAL PRIMARY KEY,
   username VARCHAR(255) NOT NULL , 
   email VARCHAR(255) UNIQUE NOT NULL ,
    password VARCHAR(255) NOT NULL);
  `;

  try {
  await pool.query(query)

  

  } catch (error) {
        console.error("Error while creating the schema", error);
  }
  
}

export {
  userTable
}