import { MemberController } from "@/controllers/members.controller";
import { Routes } from "@/interfaces/routes.interface";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

export class MemberRoute implements Routes {
  public path: string = '/members';
  public router: Router = Router();
  public member = new MemberController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.member.getMembers);
  }
}
