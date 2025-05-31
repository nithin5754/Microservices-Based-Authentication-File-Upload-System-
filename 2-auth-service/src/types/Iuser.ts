export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}


export interface IUserUseCase {
  signupUser({username, email, password}:{username:string,email:string,password:string}):Promise<IUser|null>

  loginUser({email,password}:{email:string,password:string}): Promise<IUser|null>

}