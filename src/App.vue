<script setup lang="ts">
import tickets from "./data/tickets";
import TicketList from "./components/TicketList.vue";
import TicketDetail from "./components/TicketDetail.vue";
import TicketFilter from "./components/TicketFilter.vue";
import { ref, computed } from "vue";
import { type Priority, type Status } from "./types/ticket";

const selectedTicketId = ref<string | null>(null);
const selectedMoreOption = ref<boolean>(false);

//Filtering
const statusFilter = ref<Status | "all">("all");
const priorityFilter = ref<Priority | "all">("all");

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
</script>

<template>
  <h1>Ticketing system</h1>
  <!-- <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <div>
    <TicketFilter
      :status-filter="statusFilter"
      :priority-filter="priorityFilter"
      @update:status-filter="statusFilter = $event"
      @update:priority-filter="priorityFilter = $event"
    />
  </div>
  <div>
    <TicketList
      :tickets="filteredTickets"
      :selectedTicketId="selectedTicketId"
      @open-ticket="handleOpenTicket"
      @open-further="handleOpenMore"
    />
  </div>
  <div>
    <TicketDetail
      :ticket="selectedTicket"
      :show-more="selectedMoreOption"
      @toggle-more="handleOpenMore"
      @close="handleCloseTicket"
    />
  </div>
</template>

<!-- <style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
