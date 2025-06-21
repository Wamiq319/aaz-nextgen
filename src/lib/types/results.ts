export interface Institution {
  name: string;
  campus: string;
}

export interface Student {
  fullName: string;
  fatherName: string;
  grade: string;
  institution: Institution;
}

export interface ExamData {
  rollNumber: string;
  score: number;
  position: number;
}

export interface Awards {
  hasWon: boolean;
  awardName: string;
  awardType: string;
}

export interface Result {
  resultId: string;
  eventId: string;
  student: Student;
  examData: ExamData;
  awards: Awards;
  remarks: string;
  publishedDate: string;
}

export interface ResultWithEvent extends Result {
  event?: {
    eventId: string;
    eventName: string;
    examDate: string;
    city: string;
    category: string;
    grades: string[];
    isPublished: boolean;
    totalParticipants: number;
  } | null;
}
