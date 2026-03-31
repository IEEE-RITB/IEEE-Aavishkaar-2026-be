import { type Request, type Response, Router } from "express";
import Controllers from "@/controllers/index";

export const readRoute = Router();

readRoute.get('/read', (req: Request, res: Response) => void Controllers.readController(req, res));