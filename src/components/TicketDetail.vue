<script setup lang="ts">
import type { Ticket } from "../types/ticket";
const props = defineProps<{
  ticket?: Ticket | null | undefined;
  showMore: boolean;
}>();
const emits = defineEmits<{
  (e: "toggle-more"): void;
  (e2: "close"): void;
}>();
</script>

<template>
  <section v-if="props.ticket">
    <h3>Title: {{ props.ticket.title }}</h3>
    <p>Status: {{ props.ticket.status }}</p>
    <p>Priority: {{ props.ticket.priority }}</p>
    <p>Description: {{ props.ticket.description }}</p>

    <button @click="emits('toggle-more')">
      {{ props.showMore ? "Less" : "More" }}
    </button>

    <button @click="emits('close')">Close</button>

    <div v-if="props.showMore">
      <p>Created on the: {{ props.ticket.createdAt }}</p>
    </div>
  </section>
</template>
