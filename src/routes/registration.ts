import express from "express";
import { getRegistrationsByEvent } from "../controllers/registration.controller";

const router = express.Router();

router.get("/:eventId", getRegistrationsByEvent);

export default router;
