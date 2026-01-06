// Here we want state, getters and actions that will be used within components
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { type Priority, type Status } from "../types/ticket";
import tickets from "../data/tickets";

export const useTicketStore = defineStore("tickets", () => {
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
    return tickets.find((ticket) => ticket.id === selectedTicketId.value);
  });

  const filteredTickets = computed(() => {
    if (statusFilter.value !== "all" && priorityFilter.value !== "all") {
      return tickets.filter(
        (ticket) =>
          ticket.status === statusFilter.value &&
          ticket.priority === priorityFilter.value
      );
    } else if (statusFilter.value !== "all" || priorityFilter.value !== "all") {
      return tickets.filter((ticket) =>
        statusFilter.value === "all"
          ? ticket.priority === priorityFilter.value
          : ticket.status === statusFilter.value
      );
    } else {
      return tickets;
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
  };
});
