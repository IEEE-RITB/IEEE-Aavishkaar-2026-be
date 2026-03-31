import { Router } from 'express';
import { getAllRegistrations } from '../controllers/registration';

const router = Router();

router.get('/:eventId', getAllRegistrations);

export default router;