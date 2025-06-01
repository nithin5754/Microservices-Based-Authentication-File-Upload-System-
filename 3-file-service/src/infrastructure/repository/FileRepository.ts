import { Pool } from "pg";
import { getPool } from "../database/connect";

class FileRepository {
  private pool: Pool = getPool();

  async uploadFile({
    id,
    fileName,
    file_path,
  }: {
    id: string;
    fileName: string;
    file_path: string;
  }) {
    try {
      const query = `
      INSERT INTO fileupload (uid,fileName,file_path,uploaded_at) VALUES($1,$2,$3,$4) RETURNING *
      `;

      const date = new Date();

      const data = [id, fileName, file_path, date];

      const result = await this.pool.query(query, data);

      if (!result.rows.length) {
        throw new Error("file not uploaded");
      }
      const file = result.rows[0];
      return file;
    } catch (error) {
      throw new Error(`Error File Repo : ${error}`);
    }
  }
}

export default FileRepository;
