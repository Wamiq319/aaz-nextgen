import mongoose, { Schema, Document } from "mongoose";

export enum DownloadCategory {
  PastPapers = "Past Papers",
  GuideBooks = "Guide Books",
  Forms = "Forms",
  ReferenceBooks = "Reference Books",
  Brochures = "Brochures",
  Books = "Books",
}

export interface IDownload extends Document {
  id: string;
  title: string;
  description: string;
  category: DownloadCategory;
  downloadUrl: string;
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
  uploadDate: { type: String, required: true },
  grades: [{ type: String, required: true }],
});

export default mongoose.models.Download ||
  mongoose.model<IDownload>("Download", DownloadSchema);
