//focused - tickets endpoints
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { de } from "zod/locales";
export const ticketsRouter = Router();

ticketsRouter.get("/", async (req, res) => {
  const tickets = await prisma.ticket.findMany();
  tickets.sort((a, b) => a.priority.localeCompare(b.priority));
  console.log(tickets);
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

ticketsRouter.post("/", async (req, res) => {
  try {
    const ticketData = await ticketSchema.parseAsync(req.body);
    return res.status(201).json(ticketData);
  } catch (error) {
    return res.status(400).json({ error: "Invalid" });
  }
});

ticketsRouter.patch("/:id/status", async (req, res) => {
  //no id found, return 404
  if (!req.params.id) {
    return res.status(404).json({ error: "ID not found, please provide it" });
  }
  const sentID = req.params.id;
  //if id not found in db, return 404
  const matchedTicket = await prisma.ticket.findUnique({
    where: { id: sentID },
  });

  const sentBody = req.body;
  //if status not provided in body
  if (!sentBody.status) {
    return res.status(400).json({ error: "Status needs to be in body!" });
  }
  //if status is not valid
  if (!TicketStatus.safeParse(sentBody.status).success) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  if (!matchedTicket) {
    return res
      .status(404)
      .json({ error: "Ticket with this ID is not found in database" });
  }

  //if status is the same as db, return 200;
  if (matchedTicket.status === sentBody.status) {
    return res.status(200).json({
      message: "Status is the same as current status, no update needed!",
    });
  }

  try {
    //update status in the db
    await prisma.ticket.update({
      where: { id: sentID },
      data: { status: sentBody.status },
    });
    return res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
