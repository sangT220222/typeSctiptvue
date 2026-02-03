//focused - tickets endpoints
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
export const ticketsRouter = Router();

ticketsRouter.get("/", async (req, res) => {
  const tickets = prisma.ticket.findMany();
  res.json(tickets);
  console.log("TICKETS FETCHED");
});
