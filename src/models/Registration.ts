import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember {
  name: string;
  usn?: string;
}

export interface IRegistration extends Document {
  eventId: mongoose.Types.ObjectId;
  teamName: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  leadUSN: string;
  teamMembers?: ITeamMember[] | null;
  registeredAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  usn: { type: String, required: false }
});

const RegistrationSchema = new Schema<IRegistration>({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  teamName: { type: String, required: true },
  leadName: { type: String, required: true },
  leadEmail: { type: String, required: true },
  leadPhone: { type: String, required: true },
  leadUSN: { type: String, required: true },
  teamMembers: { type: [TeamMemberSchema], default: null },
  registeredAt: { type: Date, default: Date.now }
});

export default mongoose.model<IRegistration>('Registration', RegistrationSchema);