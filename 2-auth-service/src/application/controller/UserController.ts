import { Request, Response } from "express";
import { UserUseCase } from "../../core/usecase/UserUsecase";
import { IUser } from "../../types/Iuser";

class UserController {
 private userUseCase: UserUseCase

  constructor(userUseCase: UserUseCase) {
    this.userUseCase= userUseCase;
    this.signupUser=this.signupUser.bind(this)
    this.loginUser=this.loginUser.bind(this)
  }

  async signupUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      console.log(" Calling signupUser from use case...");

      if (!this.userUseCase) {
        console.error("❌ userUseCase or signupUser method is missing!");
        return res.status(500).json({ error: "Internal server error" });
      }

      const result: IUser | null = await this.userUseCase.signupUser({
        username,
        email,
        password,
      });


      res.status(200).json(result);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: error });
    }
  }


   async loginUser(req: Request, res: Response) {
    try {
      const {  email, password } = req.body;

      console.log(" Calling loginUser from use case...");

      if (!this.userUseCase) {
        console.error("❌ userUseCase or loginUser method is missing!");
        return res.status(500).json({ error: "Internal server error" });
      }

      const result: IUser | null = await this.userUseCase.loginUser({
   
        email,
        password,
      });



      res.status(200).json({message:result?'login successfully':'user not found',data:result});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: error });
    }
  }
}

export { UserController };
