export type Status = "open" | "in progress" | "done" | "blocked";
export type Priority = "low" | "medium" | "high";

export type Ticket = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  description: string;
  createdAt: string;
};
