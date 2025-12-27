<!-- we are recieving tickets here, and rendering them as lists -->
<!-- gets data via props -->
<script setup lang="ts">
import type { Ticket } from "../types/ticket";
const prop = defineProps<{
  tickets: Ticket[];
  selectedTicketId: string | null;
}>();
const emit = defineEmits<{
  (e: "open-ticket", ticketID: string): void;
  (e2: "open-further", selected: boolean): void;
}>();
</script>

<template>
  <ul>
    <li v-for="ticket in prop.tickets" :key="ticket.id">
      {{ ticket.title }}
      <button @click="emit('open-ticket', ticket.id)">See ticket</button>
      <button
        v-if="ticket.id === prop.selectedTicketId"
        @click="emit('open-further', true)"
      >
        More
      </button>
    </li>
  </ul>
</template>
