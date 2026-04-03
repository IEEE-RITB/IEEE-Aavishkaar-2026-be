import type {Request, Response} from 'express';
import type { ControllerClass } from "@/controllers/index";

export async function CreateController(this: ControllerClass, request:Request, response:Response) {
    return response.status(200).json({ message: "Create Operation" });
}