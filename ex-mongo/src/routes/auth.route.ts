import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import multer from 'multer';
import { LoginDto } from '@/dtos/auth.dto';

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();
  public upload = multer();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, this.upload.any(), ValidationMiddleware(CreateUserDto), this.authController.signUp);
    this.router.post(`${this.path}login`, this.upload.any(), ValidationMiddleware(LoginDto), this.authController.logIn);
    this.router.post(`${this.path}logout`, AuthMiddleware, this.authController.logOut);
  }
}
