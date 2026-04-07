import { Router } from "express";
import allregistrationscontroller from "../controllers/allregistrationscontroller";
import allregistrationsbyidcontroller from "../controllers/allregistrationbyeventidcontroller";
import { submitRegistrationByIdController } from "../controllers/submitRegistrationByIdController";

const router = Router();

// New endpoint: Register strictly by event ID
router.post("/:id", submitRegistrationByIdController); // POST /api/registrations/:id

router.get("/allregistrations", allregistrationscontroller);
router.get("/allregistrations/:eventId", allregistrationsbyidcontroller);

export const registrationRoute = router;