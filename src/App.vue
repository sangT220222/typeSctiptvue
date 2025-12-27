<script setup lang="ts">
import tickets from "./data/tickets";
import TicketList from "./components/TicketList.vue";
import { ref, computed } from "vue";

const selectedTicketId = ref<string | null>(null);
const selectedMoreOption = ref<boolean>(false);

const selectedTicket = computed(() => {
  if (!selectedTicketId.value) {
    return null;
  }
  return tickets.find((ticket) => ticket.id === selectedTicketId.value);
});

function handleOpenTicket(ticketId: string) {
  selectedTicketId.value = ticketId;
  selectedMoreOption.value = false;
}

function handleOpenMore() {
  selectedMoreOption.value = true;
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
    <TicketList
      :tickets="tickets"
      :selectedTicketId="selectedTicketId"
      @open-ticket="handleOpenTicket"
      @open-further="handleOpenMore"
    />
  </div>
  <div v-if="selectedTicketId">
    <h3>Title: {{ selectedTicket?.title }}</h3>
    <p>Status: {{ selectedTicket?.status }}</p>
    <p>Priority: {{ selectedTicket?.priority }}</p>
    <p>Description: {{ selectedTicket?.description }}</p>
  </div>
  <div v-if="selectedMoreOption">
    <p>Created on the: {{ selectedTicket?.createdAt }}</p>
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
