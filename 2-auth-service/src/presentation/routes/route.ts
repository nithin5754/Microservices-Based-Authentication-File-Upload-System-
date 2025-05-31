import { UserController } from "../../application/controller/UserController";
import { UserUseCase } from "../../core/usecase/UserUsecase";
import UserRepository from "../../infrastructure/repository/userRepository";



const express = require("express");
const router = express.Router();

const userRepository=new UserRepository()
const userUseCase=new UserUseCase(userRepository)
const controller=new UserController(userUseCase)


router.get('/sign-up',controller.signupUser)

export default router