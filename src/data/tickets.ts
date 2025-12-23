import type { Ticket } from "../types/ticket";

const tickets: Ticket[] = [];
const firstTicket: Ticket = {
  id: "t1",
  title: "First ticket",
  status: "open",
  priority: "low",
  description: "first ticket - testing verified",
  createdAt: new Date().toString(),
};
tickets.push(firstTicket);

const secondTicket: Ticket = {
  id: "t2",
  title: "Second ticket",
  status: "open",
  priority: "high",
  description: "second ticket - testing verified",
  createdAt: new Date().toString(),
};

tickets.push(secondTicket);

export default tickets;

// export type Ticket = {
//   id: string;
//   title: string;
//   status: Status;
//   priority: Priority;
//   description: string;
//   createdAt: string;
// };
