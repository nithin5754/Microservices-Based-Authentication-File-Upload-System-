import express from "express";
import CurrentFile from "../../application/controller/FileController";
import FileController from "../../application/controller/FileController";
import FileRepository from "../../infrastructure/repository/FileRepository";
import FileUseCase from "../../core/useCase/FileUseCase";
const router = express.Router();

const repository = new FileRepository();
const fileUsecase = new FileUseCase(repository);
const fileController = new FileController(fileUsecase);

router.post("/upload", fileController.uploadFiles);

export default router;
