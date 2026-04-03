import { type Request, type Response, Router } from "express";
import Controllers from "@/controllers/index";

export const updateRoute = Router();

updateRoute.patch(
  "/update",
  (req: Request, res: Response) => void Controllers.updateController(req, res),
);
