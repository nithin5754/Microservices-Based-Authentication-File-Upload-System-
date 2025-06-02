import { Pool } from "pg";
import { IAddress } from "../../../types/IAddress";
import { getPool } from "../connect";

class AddressRepository {
  constructor() {}

  async addAddress({
    userId,
    state,
    postal_code,
    city,
    other,
  }: {
    userId: string;
    postal_code: string;
    city: string;
    other: string;
    state: string;
  }): Promise<IAddress | null> {
    const pool: Pool = getPool();

    const query = ` 
      
     INSERT INTO address (uid,state,postal_code,city,other) VALUES($1,$2,$3,$4,$5,$6) RETUNING * 
    `;

    const values = [userId, state, postal_code, city, other];

    const result = pool.query(query, values);

    return (await result).rows.length > 0 ? (await result).rows[0] : null;
  }
}

export {AddressRepository}
