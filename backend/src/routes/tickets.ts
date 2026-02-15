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

ticketsRouter.patch("/:id", async (req, res) => {
  try {
    const sentID = req.params.id;
    const sentBody = req.body;
    const matchedTicker = await prisma.ticket.findUnique({
      where: { id: sentID },
    });
    if (matchedTicker && sentBody.status !== matchedTicker.status) {
      //update status in the db
      await prisma.ticket.update({
        where: { id: sentID },
        data: { status: sentBody.status },
      });
      return res.status(200).json({ message: "Status updated successfully" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Request invalid" });
  }
});
