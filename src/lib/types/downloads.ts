export enum DownloadCategory {
  PastPapers = "Past Papers",
  GuideBooks = "Guide Books",
  Forms = "Forms",
  ReferenceBooks = "Reference Books",
  Brochures = "Brochures",
  Books = "Books",
}

export interface Download {
  id: string;
  title: string;
  description: string;
  category: string;
  downloadUrl: string;
  uploadDate: string;
  grades: string[];
}
