//focused - tickets endpoints
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { de } from "zod/locales";
import { match } from "node:assert";
import { Prisma } from "../../prisma/generated/prisma/index.js";
export const ticketsRouter = Router();

ticketsRouter.get("/", async (req, res) => {
  const tickets = await prisma.ticket.findMany();
  tickets.sort((a, b) => a.priority.localeCompare(b.priority));
  res.json(tickets);
});

const TicketStatus = z.enum(["in_progress", "todo", "done"]);
const TicketPriority = z.enum(["low", "medium", "high", "urgent"]);
const ticketSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  status: TicketStatus.optional(),
  priority: TicketPriority.optional(),
});

//status transition map for status updates validation
const statusTransitionMaps = new Map([
  ["todo", ["in_progress"]],
  ["in_progress", ["todo", "done"]],
  ["done", ["in_progress"]],
]);

ticketsRouter.post("/", async (req, res) => {
  try {
    const ticketData = await ticketSchema.parseAsync(req.body);
    return res.status(201).json(ticketData);
  } catch (error) {
    return res.status(400).json({ error: "Invalid" });
  }
});

// ticketsRouter.patch("/:id/status", async (req, res) => {
//   //no id found, return 404
//   if (!req.params.id) {
//     return res.status(404).json({ error: "ID not found, please provide it" });
//   }
//   const sentID = req.params.id;
//   //if id not found in db, return 404
//   const matchedTicket = await prisma.ticket.findUnique({
//     where: { id: sentID },
//   });

//   const sentBody = req.body;
//   //if status not provided in body
//   if (!sentBody.status) {
//     return res.status(400).json({ error: "Status needs to be in body!" });
//   }
//   //if status is not valid
//   if (!TicketStatus.safeParse(sentBody.status).success) {
//     return res.status(400).json({ error: "Invalid status value" });
//   }
//   if (!matchedTicket) {
//     return res
//       .status(404)
//       .json({ error: "Ticket with this ID is not found in database" });
//   }

//   //if status is the same as db, return 200;
//   if (matchedTicket.status === sentBody.status) {
//     return res.status(200).json({
//       message: "Status is the same as current status, no update needed",
//     });
//   }

//   //validate status transition
//   const allowedTransition = statusTransitionMaps.get(matchedTicket.status); //array of allowed transitions
//   //check body's status in allowedTransition
//   if (!allowedTransition || !allowedTransition.includes(sentBody.status)) {
//     return res.status(400).json({
//       error: `Invalid status transition from ${matchedTicket.status} to ${sentBody.status}`,
//     });
//   }

//   try {
//     //update status in the db
//     const updatedTicket = await prisma.ticket.update({
//       where: { id: sentID },
//       data: { status: sentBody.status },
//     });
//     return res
//       .status(200)
//       .json({ message: "Status updated successfully", ticket: updatedTicket });
//   } catch (error) {
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

//general update for ticket
ticketsRouter.patch("/:id", async (req, res) => {
  //users can update title, description, status and priority
  //get request params body
  if (!req.params.id) {
    return res
      .status(400)
      .json({ error: "ID not provided, please provide it" });
  }
  //see if id is in the database
  const sentID = req.params.id;
  const matchedTicket = await prisma.ticket.findUnique({
    where: {
      id: sentID,
    },
  });
  if (!matchedTicket) {
    return res.status(404).json({
      error: "ID provided doesn't match our system, please input a correct one",
    });
  }
  //have data/payload
  //validate first, then use payload to update data to database

  //validation are - title,description,status and priority being the same as they are
  //status not being in the transition map defined

  //start of validations block

  if (
    matchedTicket.title === req.body.title ||
    matchedTicket.description === req.body.description
  ) {
    return res
      .status(400)
      .json({ error: "Value is the same, please send a different one" });
  }

  if (req.body.status && !TicketStatus.safeParse(req.body.status).success) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const validStatus = statusTransitionMaps.get(matchedTicket.status);
  if (req.body.status && !validStatus?.includes(req.body.status)) {
    return res
      .status(400)
      .json({ error: "Cannot update status due to invalid transition" });
  }

  if (
    req.body.priority &&
    !TicketPriority.safeParse(req.body.priority).success
  ) {
    return res
      .status(400)
      .json({ error: "Invalid priority given - please correct this" });
  }

  // end of validations block
  const data: Prisma.TicketUpdateInput = {};
  if (req.body.title && req.body.title !== matchedTicket.title) {
    data.title = req.body.title;
  }
  if (
    req.body.description &&
    req.body.description !== matchedTicket.description
  ) {
    data.description = req.body.description;
  }
  if (req.body.status) {
    data.status = req.body.status;
  }
  if (req.body.priority && req.body.priority !== matchedTicket.priority) {
    data.priority = req.body.priority;
  }
  //syntax is prisma.model/tablename.update()
  let updatedTicket = null;
  updatedTicket = await prisma.ticket.update({
    where: { id: sentID },
    data: data,
  });
  return res
    .status(200)
    .json({ message: "Ticket been updated", updated_ticket: updatedTicket });
});
