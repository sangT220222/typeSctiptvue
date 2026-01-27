export const STATUS_OPTIONS = [
  "Blocked",
  "Done",
  "In Progress",
  "Open",
  "To do",
] as const;

export type Status = (typeof STATUS_OPTIONS)[number];

export const PRIORITY_OPTIONS = ["Low", "Medium", "High"] as const;
export type Priority = (typeof PRIORITY_OPTIONS)[number];

export type Ticket = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  description: string;
  createdAt: string;
};
