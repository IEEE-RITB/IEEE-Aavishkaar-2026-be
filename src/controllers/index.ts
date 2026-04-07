import { Request, Response } from "express";
import { SampleController } from "./sample";
import { alleventscontroller } from "./alleventscontroller";
import allregistrationscontroller from "./allregistrationscontroller";
import allregistrationsbyidcontroller from "./allregistrationbyeventidcontroller";
import { mongodbClient } from "../db";

export class ControllerClass {
    constructor() {
        // do something
        mongodbClient.init();
    }

    async pingController(req: Request, res: Response) {
        return res.status(201).json({ message: "Server running" });
    }

    sampleController = SampleController;
    alleventscontroller = alleventscontroller;
    allregistrationscontroller = allregistrationscontroller;
    allregistrationsbyidcontroller = allregistrationsbyidcontroller;

}

const Controllers = new ControllerClass();
export default Controllers;
