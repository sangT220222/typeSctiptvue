//focused - tickets endpoints
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { de } from "zod/locales";
import { match } from "node:assert";
import { Prisma } from "../../prisma/generated/prisma/index.js";
export const ticketsRouter = Router();
import {
  getAllTickets,
  createNewTicket,
  updateTicket,
} from "../services/service.js";

ticketsRouter.get("/", async (req, res) => {
  const tickets = await getAllTickets();
  res.json(tickets);
});

// const TicketStatus = z.enum(["in_progress", "todo", "done"]);
// const TicketPriority = z.enum(["low", "medium", "high", "urgent"]);
// const ticketSchema = z.object({
//   title: z.string().min(1).max(200),
//   description: z.string().optional(),
//   status: TicketStatus.optional(),
//   priority: TicketPriority.optional(),
// });

ticketsRouter.post("/", async (req, res) => {
  try {
    const ticketData = await createNewTicket(req.body);
    return res.status(201).json(ticketData);
  } catch (error) {
    return res.status(400).json({ error: "Invalid" });
  }
});

//general update for ticket
ticketsRouter.patch("/:id", async (req, res) => {
  try {
    const updatedTicket = await updateTicket(req.params.id, req.body);
    return res
      .status(200)
      .json({ message: "Ticket been updated", updated_ticket: updatedTicket });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "MISSING_ID") {
        return res
          .status(400)
          .json({ error: "ID not provided, please provide it" });
      }
      if (error.message === "TICKET_NOT_FOUND") {
        return res.status(400).json({
          error:
            "ID provided doesn't match our system, please input a correct one",
        });
      }
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});
