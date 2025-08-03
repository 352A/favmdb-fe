export type Entry = {
  id: number;
  title: string;
  type: string;
  director: string;
  budget: number;
  location: string;
  durationHours?: number;
  durationMinutes?: number;
  seasons?: number;
  year: number;
  details: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
};
