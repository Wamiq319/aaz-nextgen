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

export interface Event {
  eventId: string;
  eventName: string;
  examDate: string;
  city: string;
  category: string;
  grades: string[];
  isPublished: boolean;
  totalParticipants: number;
}
