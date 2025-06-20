import mongoose, { Schema, Document } from "mongoose";

export enum EventCategory {
  Math = "Math",
  Science = "Science",
  English = "English",
  Urdu = "Urdu",
  ComputerScience = "Computer Science",
  Biology = "Biology",
  Art = "Art",
  Literature = "Literature",
  History = "History",
  Geography = "Geography",
  Physics = "Physics",
  Chemistry = "Chemistry",
}

export interface IEvent extends Document {
  eventId: string;
  eventName: string;
  examDate: string; // ISO string
  city: string;
  category: EventCategory;
  grades: string[];
  isPublished: boolean;
  totalParticipants: number;
}

const EventSchema: Schema = new Schema({
  eventId: { type: String, required: true, unique: true },
  eventName: { type: String, required: true },
  examDate: { type: String, required: true },
  city: { type: String, required: true },
  category: {
    type: String,
    enum: Object.values(EventCategory),
    required: true,
  },
  grades: [{ type: String, required: true }],
  isPublished: { type: Boolean, required: true, default: true },
  totalParticipants: { type: Number, required: true },
});

export default mongoose.models.Event ||
  mongoose.model<IEvent>("Event", EventSchema);
