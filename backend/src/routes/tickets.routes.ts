//focused - tickets endpoints
import { Router } from "express";
import { z, ZodError } from "zod";
import { prisma } from "../db.js";
import { de } from "zod/locales";
import { match } from "node:assert";
import { Prisma } from "../../prisma/generated/prisma/index.js";
export const ticketsRouter = Router();
import { ticketQuerySchema } from "../schema/tickets.schema.js";
import {
  getAllTickets,
  createNewTicket,
  updateTicket,
  getTickets,
} from "../services/service.js";

// GET
ticketsRouter.get("/", async (req, res) => {
  try {
    //convert status & priority from string to enum
    const query = await ticketQuerySchema.parseAsync(req.query);
    console.log(query);
    const filteredTickets = await getTickets(query);
    res.json(filteredTickets);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

ticketsRouter.post("/", async (req, res) => {
  try {
    const ticketData = await createNewTicket(req.body);
    return res.status(201).json(ticketData);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.issues.map((i) => i.message),
      });
    }
    return res.status(500).json({ error: "Internal server error" });
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
