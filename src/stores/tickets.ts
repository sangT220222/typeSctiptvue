// Here we want state, getters and actions that will be used within components
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Priority, Status, Ticket } from "../types/ticket";
// import initialTickets from "../data/tickets";

export const useTicketStore = defineStore("tickets", () => {
  //tickets is STATE reactive
  const tickets = ref<Ticket[]>([]);
  //state
  const selectedTicketId = ref<string | null>(null);
  const selectedMoreOption = ref<boolean>(false);
  const statusFilter = ref<Status | "all">("all");
  const priorityFilter = ref<Priority | "all">("all");
  //getters
  const selectedTicket = computed(() => {
    if (!selectedTicketId.value) {
      return null;
    }
    return (
      tickets.value.find((ticket) => ticket.id === selectedTicketId.value) ??
      null
    );
  });

  const filteredTickets = computed(() => {
    if (statusFilter.value !== "all" && priorityFilter.value !== "all") {
      return tickets.value.filter(
        (ticket) =>
          ticket.status === statusFilter.value &&
          ticket.priority === priorityFilter.value
      );
    } else if (statusFilter.value !== "all" || priorityFilter.value !== "all") {
      return tickets.value.filter((ticket) =>
        statusFilter.value === "all"
          ? ticket.priority === priorityFilter.value
          : ticket.status === statusFilter.value
      );
    } else {
      return tickets.value;
    }
  });
  //actions
  function handleOpenTicket(ticketId: string) {
    selectedTicketId.value = ticketId;
    selectedMoreOption.value = false;
  }

  function handleOpenMore() {
    selectedMoreOption.value = !selectedMoreOption.value;
  }

  function handleCloseTicket() {
    selectedTicketId.value = null;
    selectedMoreOption.value = false;
  }
  function addTickets(input: Omit<Ticket, "id" | "createdAt">) {
    const newTickets: Ticket = {
      ...input,
      id: `t-${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
    };
    tickets.value.push(newTickets);
  }
  function deleteTicket(ticketId: string) {
    //need to find index and remove from array
    const indexToDelete = tickets.value.findIndex(
      (ticket) => ticket.id === ticketId
    );
    if (indexToDelete !== -1 || indexToDelete !== undefined) {
      tickets.value.splice(indexToDelete, 1);
    }
  }

  return {
    //state
    selectedTicketId,
    selectedMoreOption,
    statusFilter,
    priorityFilter,
    //getters
    selectedTicket,
    filteredTickets,
    //actions
    handleOpenMore,
    handleOpenTicket,
    handleCloseTicket,
    addTickets,
    deleteTicket,
  };
});
