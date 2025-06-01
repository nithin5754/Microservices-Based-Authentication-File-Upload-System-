import FileRepository from "../../infrastructure/repository/FileRepository";

import axios from "axios";

class FileUseCase {
  constructor(private readonly fileRepository: FileRepository) {}

  async uploadFile({
    id,
    fileName,
    file_path,
  }: {
    id: string;
    fileName: string;
    file_path: string;
  }):Promise<{success:boolean,data:string}> {
    try {
      console.log("api", process.env.API_GATEWAY_URL);

      let existUser = await axios.get(
        `${process.env.API_GATEWAY_URL}/auth/user/${id}`
      );

      console.log("exist user", existUser);

      if (!existUser.data) {
        return { success: false, data: "user not found" };
      }
      console.log("user data from the file repo", existUser.data);

      const uploading = await this.fileRepository.uploadFile({
        id,
        fileName,
        file_path,
      });
      return { success: true, data: uploading };
    } catch (error) {
      console.error("error from here", error);
      return { success: false, data: `${error}` };
    }
  }
}

export default FileUseCase
