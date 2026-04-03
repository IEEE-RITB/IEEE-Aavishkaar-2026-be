import { Request, Response } from "express";
import { SampleController } from "./sample";

import { CreateController } from "./crud-operations/create";
import { ReadController } from "./crud-operations/read";
import { UpdateController } from "./crud-operations/update";
import { DeleteController } from "./crud-operations/delete";

export class ControllerClass {
    constructor() {
        // do something
    }

    async pingController(req: Request, res: Response) {
        return res.status(201).json({ message: "Server running" });
    }

    sampleController = SampleController;

    // CRUD Operations
    createController = CreateController;
    readController = ReadController;
    updateController = UpdateController;
    deleteController = DeleteController;
}

const Controllers = new ControllerClass();
export default Controllers;
