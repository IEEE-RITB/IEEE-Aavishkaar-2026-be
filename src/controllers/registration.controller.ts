import { Request, Response } from "express";
import { z } from "zod";
import mongodb from "mongodb";
import { registrationsCollection } from "@/storage";

// Validate params
const paramsSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
});

// TEMP mock data (until DB is added)
const mockRegistrations = [
  { eventId: "1", name: "User A" },
  { eventId: "2", name: "User B" },
  { eventId: "1", name: "User C" },
];

export const getRegistrationsByEventId = async (req: Request, res: Response) => {
  try {
    const parsed = paramsSchema.safeParse(req.params);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.format(),
      });
    }

    const { eventId } = parsed.data;

    // 🔥 Filter logic (core of your task)
    const registrations = mockRegistrations.filter(
      (reg) => reg.eventId === eventId
    );

    const registration = await registrationsCollection.findOne({ eventId: new mongodb.ObjectId(eventId) });

    return res.status(200).json({
      success: true,
      data: registrations,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching registrations",
      error,
    });
  }
};
