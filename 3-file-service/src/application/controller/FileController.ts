import { NextFunction, Request, Response } from "express";
import FileUseCase from "../../core/useCase/FileUseCase";

// import jwt from 'jsonwebtoken'
// declare module 'express' {
//   interface Request {
//     user?: jwt.JwtPayload;
//   }
// }

// async function CurrentFile(req:Request,res:Response):Promise<void> {

//     try {
//       const userHeader=req.headers['x-user']
//       if (!userHeader) {
//          res.status(401).json({ success: false, error: 'User data not provided' });
//          return
//       }
//       req.user = JSON.parse(userHeader.toString()) as jwt.JwtPayload
//       const { userId, email, username } = req.user;

//       console.log("user",req.user)

//       res.status(200).json({message:{userId, email, username }})
//     } catch (error) {
//       res.status(500).json({ success: false, error: (error as Error).message });
//     }
// }

// export default CurrentFile

class FileController {
  constructor(private readonly fileUsecase: FileUseCase) {}

  async uploadFiles(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const { fileName, file_path } = req.body;

      const result: { success: boolean; data: string } =
        await this.fileUsecase.uploadFile({
          id,
          file_path,
          fileName,
        });
      if (!result || !result?.success) {
        res.status(400).json("file uploading failed");
        return;
      }
      res.status(201).json({ data: result.data });
    } catch (error) {
      res.status(500).json(error);
      return;
    }
  }
}

export default FileController;
