import { Request, Response } from 'express';
import { z } from 'zod';
import Registration from '../models/Registration';

const GetRegistrationsSchema = z.object({
  eventId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Event ID format"),
});

export const getAllRegistrations = async (req: Request, res: Response) => {
  try {
    // 1. Use safeParse instead of parse. It doesn't throw errors!
    const validationResult = GetRegistrationsSchema.safeParse(req.params);

    // 2. Handle validation failure immediately
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: "Validation Error", 
        errors: validationResult.error.format() // <-- Use .format() instead
      });
    }

    // 3. Extract the validated data
    const { eventId } = validationResult.data;

    // 4. Run the database query
    const registrations = await Registration.find({ eventId }).select('-_id -__v -eventId');

    if (!registrations || registrations.length === 0) {
      return res.status(404).json({ message: "No registrations found for this event." });
    }

    return res.status(200).json(registrations);

  } catch (error) {
    // Now this catch block ONLY handles database/server crashes, no Zod logic needed.
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};