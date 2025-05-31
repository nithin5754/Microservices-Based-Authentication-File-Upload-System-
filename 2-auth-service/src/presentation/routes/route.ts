import { UserController } from "../../application/controller/UserController";
import { UserUseCase } from "../../core/usecase/UserUsecase";
import UserRepository from "../../infrastructure/repository/userRepository";


import express from 'express'
const router = express.Router();

const userRepository=new UserRepository()
const userUseCase=new UserUseCase(userRepository)
const controller=new UserController(userUseCase)





router.post('/sign-up',controller.signupUser)
router.post('/login',controller.loginUser)

export default router