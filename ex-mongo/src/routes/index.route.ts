import { Routes } from "@/interfaces/routes.interface";
import { NextFunction, Request, Response, Router } from "express";
import { MemberRoute } from "@routes/members.route";
import { UserRoute } from "@routes/users.route";
import { AuthRoute } from "./auth.route";

export class IndexRoute implements Routes {
  path: string = '/';
  router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({
        message: 'Welcome'
      });
    });
  };
}

export const routes = [
  new IndexRoute(),
  new MemberRoute(),
  new AuthRoute(),
];
