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
  const editStatus = ref<boolean>(false);
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
    editStatus.value = false;
  }

  function handleOpenMore() {
    selectedMoreOption.value = !selectedMoreOption.value;
  }

  function handleCloseTicket() {
    selectedTicketId.value = null;
    selectedMoreOption.value = false;
    editStatus.value = false;
  }
  function addTicket(input: Omit<Ticket, "id" | "createdAt">) {
    const newTicket: Ticket = {
      ...input,
      id: `t-${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
    };
    tickets.value.push(newTicket);
  }
  function deleteTicket(ticketId: string) {
    //need to find index and remove from array
    const indexToDelete = tickets.value.findIndex(
      (ticket) => ticket.id === ticketId
    );
    if (indexToDelete !== -1) {
      tickets.value.splice(indexToDelete, 1);
    }
  }
  function handleEditStatus() {
    editStatus.value = !editStatus.value;
  }
  function updateTicketStatus(ticketId: string, newStatus: Status) {
    const ticketToUpdate = tickets.value.find(
      (ticket) => ticket.id === ticketId
    );
    if (ticketToUpdate) {
      ticketToUpdate.status = newStatus;
    }
  }
  return {
    //state
    selectedTicketId,
    selectedMoreOption,
    statusFilter,
    priorityFilter,
    editStatus,
    //getters
    selectedTicket,
    filteredTickets,
    //actions
    handleOpenMore,
    handleOpenTicket,
    handleCloseTicket,
    addTicket,
    deleteTicket,
    handleEditStatus,
    updateTicketStatus,
  };
});
