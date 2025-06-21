import mongoose, { Schema, Document } from "mongoose";
import { Institution, Student, ExamData, Awards } from "../types/results";

export interface IResult extends Document {
  resultId: string;
  eventId: string;
  student: Student;
  examData: ExamData;
  awards: Awards;
  remarks: string;
  publishedDate: string;
}

const ResultSchema: Schema = new Schema({
  resultId: { type: String, required: true, unique: true },
  eventId: { type: String, required: true, ref: "Event" },
  student: {
    fullName: { type: String, required: true },
    fatherName: { type: String, required: true },
    grade: { type: String, required: true },
    institution: {
      name: { type: String, required: true },
      campus: { type: String, required: true },
    },
  },
  examData: {
    rollNumber: { type: String, required: true },
    score: { type: Number, required: true },
    position: { type: Number, required: true },
  },
  awards: {
    hasWon: { type: Boolean, required: true },
    awardName: { type: String, default: "" },
    awardType: { type: String, default: "" },
  },
  remarks: { type: String, default: "" },
  publishedDate: { type: String, required: true },
});

// Only create the model on the server side
const Result =
  mongoose.models.Result || mongoose.model<IResult>("Result", ResultSchema);

export default Result;
