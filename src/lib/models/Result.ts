import mongoose, { Schema, Document } from "mongoose";

interface Institution {
  name: string;
  campus: string;
}

interface Student {
  fullName: string;
  fatherName: string;
  grade: string;
  institution: Institution;
}

interface ExamData {
  rollNumber: string;
  score: number;
  position: number;
}

interface Awards {
  hasWon: boolean;
  awardName: string;
  awardType: string;
}

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

export default mongoose.models.Result ||
  mongoose.model<IResult>("Result", ResultSchema);
