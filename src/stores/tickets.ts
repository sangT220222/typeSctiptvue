// Here we want state, getters and actions that will be used within components
import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { Priority, Status, Ticket } from "../types/ticket";
// import initialTickets from "../data/tickets";

const storageKey = "ticket-app-tickets";
function loadTicketsFromStorage(): Ticket[] {
  const storedTickets = localStorage.getItem(storageKey);
  if (!storedTickets) {
    return [];
  }
  try {
    const parsed = JSON.parse(storedTickets);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const useTicketStore = defineStore("tickets", () => {
  //tickets is STATE reactive
  const tickets = ref<Ticket[]>(loadTicketsFromStorage());
  //state
  const selectedTicketId = ref<string | null>(null);
  const selectedMoreOption = ref<boolean>(false);
  const statusFilter = ref<Status | "all">("all");
  const priorityFilter = ref<Priority | "all">("all");
  const editStatus = ref<boolean>(false);
  const sortBy = ref<string>("createdAt");
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

  const sortTickets = computed(() => {
    const ticketCopy = [...filteredTickets.value];
    if (sortBy.value === "status") {
      ticketCopy.sort((a, b) => a.status.localeCompare(b.status));
    } else if (sortBy.value === "priority") {
      const order = ["Low, Medium, High"];
      ticketCopy.sort(
        (a, b) => order.indexOf(a.priority) - order.indexOf(b.priority)
      );
    } else if (sortBy.value === "createdAt") {
      ticketCopy.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }
    return ticketCopy;
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
  function updateTicket(
    ticketId: string,
    newStatus: Status,
    newPriority: Priority,
    newDescription: string
  ) {
    const ticketToUpdate = tickets.value.find(
      (ticket) => ticket.id === ticketId
    );
    if (ticketToUpdate) {
      ticketToUpdate.status = newStatus;
      ticketToUpdate.priority = newPriority;
      ticketToUpdate.description = newDescription;
    }
  }

  watch(
    tickets,
    (newTickets) => {
      localStorage.setItem(storageKey, JSON.stringify(newTickets));
    },
    { deep: true }
  );

  return {
    //state
    selectedTicketId,
    selectedMoreOption,
    statusFilter,
    priorityFilter,
    editStatus,
    sortBy,
    //getters
    selectedTicket,
    filteredTickets,
    sortTickets,
    //actions
    handleOpenMore,
    handleOpenTicket,
    handleCloseTicket,
    addTicket,
    deleteTicket,
    handleEditStatus,
    updateTicket,
  };
});
