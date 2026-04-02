import { Router } from 'express';
import { pingRoute } from './ping';
import { sampleRoute } from './sample';
import registrationRoutes from "./registration";



const router = Router();

router.use(pingRoute);
router.use(sampleRoute);
router.use("/registrations", registrationRoutes);


export default router;
