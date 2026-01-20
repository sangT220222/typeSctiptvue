<script setup lang="ts">
import { type Ticket, STATUS_OPTIONS } from "../types/ticket";
const props = defineProps<{
  ticket?: Ticket | null | undefined;
  showMore: boolean;
  editStatus: boolean;
}>();
const emits = defineEmits<{
  (e: "toggle-more"): void;
  (e2: "close"): void;
  (e3: "edit-status", ticketId: string): void;
}>();
</script>
ƒ
<template>
  <section v-if="props.ticket">
    <h3>Title: {{ props.ticket.title }}</h3>
    <p v-if="!props.editStatus">Status: {{ props.ticket.status }}</p>
    <label v-if="props.editStatus"
      >Status:
      <select>
        <option>Please select...</option>
        <option v-for="status in STATUS_OPTIONS" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </label>
    <p>Priority: {{ props.ticket.priority }}</p>
    <p>Description: {{ props.ticket.description }}</p>

    <button @click="emits('toggle-more')">
      {{ props.showMore ? "Less" : "More" }}
    </button>
    <button @click="emits('edit-status', props.ticket.id)">Edit</button>
    <button @click="emits('close')">Close</button>

    <div v-if="props.showMore">
      <p>Created on the: {{ props.ticket.createdAt }}</p>
    </div>
  </section>
</template>
