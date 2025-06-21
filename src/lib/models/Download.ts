import mongoose, { Schema, Document } from "mongoose";
import { DownloadCategory } from "../types/downloads";

export interface IDownload extends Document {
  id: string;
  title: string;
  description: string;
  category: DownloadCategory;
  downloadUrl: string;
  cloudinaryPublicId: string;
  uploadDate: string;
  grades: string[];
}

const DownloadSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: Object.values(DownloadCategory),
    required: true,
  },
  downloadUrl: { type: String, required: true },
  cloudinaryPublicId: { type: String, required: true },
  uploadDate: { type: String, required: true },
  grades: [{ type: String, required: true }],
});

// Only create the model on the server side
const Download =
  mongoose.models.Download ||
  mongoose.model<IDownload>("Download", DownloadSchema);

export default Download;
export { DownloadCategory };
