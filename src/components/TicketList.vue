<!-- we are recieving tickets here, and rendering them as lists -->
<!-- gets data via props -->
<script setup lang="ts">
import type { Ticket } from "../types/ticket";
const props = defineProps<{
  tickets: Ticket[];
}>();
const emits = defineEmits<{
  (e: "open-ticket", ticketID: string): void;
  (e2: "delete-ticket", ticketID: string): void;
}>();
function deleteTicket(ticketId: string) {
  if (window.confirm("Are you sure you want to delete this ticket?")) {
    emits("delete-ticket", ticketId);
  }
}
</script>

<template>
  <ul>
    <li v-for="ticket in props.tickets" :key="ticket.id">
      {{ ticket.title }}
      <button @click="emits('open-ticket', ticket.id)">See ticket</button>
      <!-- <button @click="emits('delete-ticket', ticket.id)">Delete</button> -->
      <button @click="deleteTicket(ticket.id)">Delete</button>
    </li>
  </ul>
</template>
