import { Request, Response } from 'express';
import { z } from 'zod';
// Import the TYPE from the new schema file
import { RegistrationType } from '../schemas/registration.schema'; 
// import { db } from '../db'; // <-- You will need to import your team's DB connection here


// We still validate the URL parameter
const GetRegistrationsSchema = z.object({
  eventId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Event ID format"),
});

export const getAllRegistrations = async (req: Request, res: Response) => {
  try {
    // 1. Validate the eventId
    const validationResult = GetRegistrationsSchema.safeParse(req.params);

    if (!validationResult.success) {
      return res.status(400).json({ 
        message: "Validation Error", 
        errors: validationResult.error.format() 
      });
    }

    const { eventId } = validationResult.data;

    // 2. Fetch from the database (Native MongoDB approach without Mongoose models)
    const registrations = await db.collection('registrations').find({ eventId }).toArray();

    if (!registrations || registrations.length === 0) {
      return res.status(404).json({ message: "No registrations found for this event." });
    }

    // 3. Optional: Map over the data to strip the _id to match your clean export requirement
    const cleanRegistrations: RegistrationType[] = registrations.map(reg => {
      const { _id, ...rest } = reg;
      return rest as RegistrationType; // Typecasting it to your new Zod type
    });

    // 4. Return the clean array
    return res.status(200).json(cleanRegistrations);

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};