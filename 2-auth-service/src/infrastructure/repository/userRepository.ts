import { Pool } from "pg";
import { getPool } from "../database/connect";
import { IUser } from "../../types/Iuser";



class UserRepository {
  constructor() {}

  async createUser({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }):Promise<IUser> {
    try {
      const pool: Pool = getPool();
      const query = ` INSERT INTO userauth (username,email,password) VALUES ($1,$2,$3) RETURNING *`;
      console.log("username, email, password", username, email, password);

      const values = [username, email, password];
      const result = await pool.query(query, values);

      if (!result) {
        throw new Error("user not added properly");
      }
     return result.rows[0] || null 
    } catch (error) {
      console.error("error in repo", error);
      throw new Error(`${error}`);
      
    }
  }
}

export default UserRepository;
