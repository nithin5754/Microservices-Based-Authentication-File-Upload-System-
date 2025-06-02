import UserRepository from "../../infrastructure/repository/userRepository";
import { IUser, IUserUseCase } from "../../types/Iuser";

class UserUseCase implements IUserUseCase {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async signupUser({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }): Promise<IUser | null> {
    try {
      if (!username || !email || !password) {
        throw new Error("All fields are required");
      }

      const result: IUser | null = await this.userRepository.createUser({
        email,
        password,
        username,
      });

      return result || null;
    } catch (error) {
      console.error("Error from use case", error);
      throw new Error(`${error}`);
    }
  }
  async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IUser | null> {
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const result: IUser | null = await this.userRepository.loginUser({
      email,
      password,
    });

    return result || null;
  }

  async getUser({ userId }: { userId: string }): Promise<IUser | null> {
    if (!userId) {
      throw new Error(" Credentials missing");
    }

    const result: IUser | null = await this.userRepository.getUser({ userId });

    return result;
  }
}

export { UserUseCase };
