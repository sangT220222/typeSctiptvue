import type { Ticket } from "../types/ticket";

const tickets: Ticket[] = [];
const firstTicket: Ticket = {
  id: "t1",
  title: "First ticket",
  status: "Open",
  priority: "Low",
  description: "first ticket - testing verified",
  createdAt: new Date().toString(),
};

const secondTicket: Ticket = {
  id: "t2",
  title: "Second ticket",
  status: "In Progress",
  priority: "High",
  description: "second ticket - testing verified",
  createdAt: new Date().toString(),
};

const thirdTicket: Ticket = {
  id: "t3",
  title: "Third ticket",
  status: "Done",
  priority: "High",
  description: "third ticket - testing verified",
  createdAt: new Date().toString(),
};

const fourthTicket: Ticket = {
  id: "t4",
  title: "4th ticket",
  status: "Done",
  priority: "High",
  description: "fourth ticket - testing verified",
  createdAt: new Date().toString(),
};

tickets.push(firstTicket, secondTicket, thirdTicket, fourthTicket);

export default tickets;

// export type Ticket = {
//   id: string;
//   title: string;
//   status: Status;
//   priority: Priority;
//   description: string;
//   createdAt: string;
// };
