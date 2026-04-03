import { type Request, type Response, Router } from "express";
import Controllers from "@/controllers/index";

export const deleteRoute = Router();

deleteRoute.delete(
  "/delete",
  (req: Request, res: Response) => void Controllers.deleteController(req, res),
);
