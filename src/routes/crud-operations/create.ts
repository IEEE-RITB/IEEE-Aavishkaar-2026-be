import { type Request, type Response, Router } from "express";
import Controllers from "@/controllers/index";

export const createRoute = Router();

createRoute.get('/create', (req: Request, res: Response) => void Controllers.createController(req, res));