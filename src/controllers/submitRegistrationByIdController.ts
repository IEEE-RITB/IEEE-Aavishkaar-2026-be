import type { Request, Response } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { EventModel } from "../models/Event";
import { RegistrationModel } from "../models/Registration";
import { sendWelcomeEmail } from "../utils/mailer";

// We keep the payload schema exactly as it was, minus the eventId which is passed in URL
const registrationPayloadSchema = z.object({
  teamName: z.string(),
  leadName: z.string(),
  leadEmail: z.string().email(),
  leadPhone: z.string(),
  leadUSN: z.string(),
  teamMembers: z
    .array(
      z.object({
        name: z.string(),
        usn: z.string().optional(),
      })
    )
    .min(0), // Can be 0 if lead represents a team of 1
});

export async function submitRegistrationByIdController(req: Request, res: Response): Promise<void> {
  try {
    const payload = registrationPayloadSchema.parse(req.body);
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid Event ID format" });
      return;
    }

    const event = await EventModel.findById(id);

    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    // Mathematical Team Size Verification
    const totalMembers = (payload.teamMembers ? payload.teamMembers.length : 0) + 1; // +1 for the lead

    if (totalMembers < event.minTeamSize || totalMembers > event.maxTeamSize) {
      res.status(400).json({
        error: `INVALID_TEAM_SCALE: Event constraints mandate between ${event.minTeamSize} and ${event.maxTeamSize} members.`
      });
      return;
    }

    const existingRegistration = await RegistrationModel.findOne({
      eventId: event._id,
      leadEmail: payload.leadEmail.toLowerCase(),
    });
    if (existingRegistration) {
      res.status(409).json({ error: "Duplicate registration detected for this event using the same lead email." });
      return;
    }

    const registration = new RegistrationModel({
      eventId: event._id,
      teamName: payload.teamName,
      leadName: payload.leadName,
      leadEmail: payload.leadEmail.toLowerCase(),
      leadPhone: payload.leadPhone,
      leadUSN: payload.leadUSN,
      teamMembers: payload.teamMembers,
    });

    await registration.save();

    const referenceId = `TF-${event.title.slice(0, 4).toUpperCase()}-${registration._id.toString().slice(-6).toUpperCase()}`;

    // Asynchronously dispatch the retro email
    sendWelcomeEmail(registration as any);

    res.status(201).json({
      ok: true,
      referenceId,
      registration,
      eventSlug: event.slug, // Explicitly returned for frontend WhatsApp lookup
      message: "Registration successful! Your spot is secured."
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid registration payload", details: err.issues });
      return;
    }
    res.status(500).json({ error: (err as Error).message });
  }
}
