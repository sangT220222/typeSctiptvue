<!-- we are recieving tickets here, and rendering them as lists -->
<!-- gets data via props -->
<script setup lang="ts">
import type { Ticket } from "../types/ticket";
const prop = defineProps<{
  tickets: Ticket[];
}>();
</script>

<template>
  <div>
    <li v-for="ticket in prop.tickets" :key="ticket.id">
      {{ ticket.title }}
    </li>
  </div>
</template>
