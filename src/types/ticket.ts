export const STATUS_OPTIONS = ["Blocked", "Done", "In Progress", "Open"];

export type Status = (typeof STATUS_OPTIONS)[number];

export const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
export type Priority = (typeof PRIORITY_OPTIONS)[number];

export type Ticket = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  description: string;
  createdAt: string;
};
