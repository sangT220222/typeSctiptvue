//focused - tickets endpoints
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { de } from "zod/locales";
export const ticketsRouter = Router();

ticketsRouter.get("/", async (req, res) => {
  const tickets = await prisma.ticket.findMany();
  res.json(tickets);
  console.log("TICKETS FETCHED");
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
    // const ticketData = ticketSchema.parse(req.body);
    const ticketData = await prisma.ticket.create({ data: req.body });
    return res.status(201).json(ticketData);
  } catch (error) {
    return res.status(400).json({ error: "Invalid" });
  }
});
