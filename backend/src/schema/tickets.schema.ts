//Zod schema in here
import { z } from "zod";

export const TicketPriority = z.enum(["low", "medium", "high", "urgent"]);
export const TicketStatus = z.enum(["todo", "in_progress", "done"]);

export const ticketSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  status: TicketStatus.optional(),
  priority: TicketPriority.optional(),
});

export const updateTicketSchema = z
  .object({
    title: z.string().min(1).max(200),
    description: z.string().optional(),
    status: TicketStatus.optional(),
    priority: TicketPriority.optional(),
  })
  .refine((data) => {
    Object.keys(data).length > 0,
      {
        message: "At least one field must be provided",
      };
  });
