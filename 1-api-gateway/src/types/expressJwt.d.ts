
declare namespace Express {
  interface Request {
    user?: {
      userId: number;
      email: string;
      username?: string;
    };
  }
}