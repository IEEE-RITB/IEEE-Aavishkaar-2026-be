import dotenv from "dotenv";
dotenv.config();

import { Router } from 'express';
import { pingRoute } from './ping';
import { sampleRoute } from './sample';

// import CRUD routes
import { createRoute } from "./crud-operations/create";
import { readRoute } from "./crud-operations/read";
import { updateRoute } from "./crud-operations/update";
import { deleteRoute } from "./crud-operations/delete";

const router = Router();

router.use(pingRoute);
router.use(sampleRoute);

// use CRUD routes
router.use(readRoute);

// secured CRUD routes
if(process.env.USE_SECURED_ROUTES === "true"){
    router.use(updateRoute);
    router.use(createRoute);
    router.use(deleteRoute);
}

export default router;
