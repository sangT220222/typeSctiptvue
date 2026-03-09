import { Prisma } from "../../prisma/generated/prisma/index.js";
import { prisma } from "../db.js";
import { ticketSchema } from "../schema/tickets.schema.js";
import {
  TicketStatus,
  TicketPriority,
  TicketPriorityType,
  TicketStatusType,
} from "../schema/tickets.schema.js";
export async function getAllTickets() {
  const tickets = await prisma.ticket.findMany();
  tickets.sort((a, b) => a.priority.localeCompare(b.priority));
  return tickets;
}

export async function getTickets(query: {
  status?: TicketStatusType;
  priority?: TicketPriorityType;
}) {
  //filter the list of tickets down
  console.log(query.priority);
  const tickets = await prisma.ticket.findMany({
    where: {
      AND: [
        { status: { equals: query.status } },
        { priority: { equals: query.priority } },
      ],
    },
  });
  return tickets;
}

export async function createNewTicket(body: unknown) {
  const ticketData = await ticketSchema.parseAsync(body);
  return prisma.ticket.create({
    data: ticketData,
  });
}

const statusTransitionMaps = new Map([
  ["todo", ["in_progress"]],
  ["in_progress", ["todo", "done"]],
  ["done", ["in_progress"]],
]);
export async function updateTicket(id: string, body: any) {
  //users can update title, description, status and priority
  if (!id) {
    throw new Error("MSSING_ID");
  }
  //see if id is in the database
  const matchedTicket = await prisma.ticket.findUnique({
    where: {
      id,
    },
  });
  if (!matchedTicket) {
    throw new Error("TICKET_NOT_FOUND");
  }
  //have data/payload
  //validate first, then use payload to update data to database

  //validation are - title,description,status and priority being the same as they are
  //status not being in the transition map defined

  //start of validations block
  if (body.status && !TicketStatus.safeParse(body.status).success) {
    throw new Error("INVALID_STATUS");
  }

  const validStatus = statusTransitionMaps.get(matchedTicket.status);
  if (body.status && !validStatus?.includes(body.status)) {
    throw new Error("Cannot update status due to invalid status transition");
  }

  if (body.priority && !TicketPriority.safeParse(body.priority).success) {
    throw new Error("INVALID_PRIORITY");
  }
  // end of validations block

  const data: Prisma.TicketUpdateInput = {};
  //compares values to current, updates only if new and current values aren't equal
  if (body.title && body.title !== matchedTicket.title) {
    data.title = body.title;
  }
  if (body.description && body.description !== matchedTicket.description) {
    data.description = body.description;
  }
  if (body.status) {
    data.status = body.status;
  }
  if (body.priority && body.priority !== matchedTicket.priority) {
    data.priority = body.priority;
  }
  return prisma.ticket.update({
    where: { id },
    data: data,
  });
}
