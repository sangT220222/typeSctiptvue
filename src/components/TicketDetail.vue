<script setup lang="ts">
import { STATUS_OPTIONS } from "../types/ticket";
import type { Ticket, Status } from "../types/ticket";
import { ref } from "vue";
const selectedStatus = ref<Status | "">("");
const props = defineProps<{
  ticket?: Ticket | null | undefined;
  showMore: boolean;
  editStatus: boolean;
}>();
const emits = defineEmits<{
  (e: "toggle-more"): void;
  (e2: "close"): void;
  (e3: "edit-status", ticketId: string): void;
  (e4: "update:selected-status", ticketId: string, status: Status): void;
}>();
function saveStatus() {
  if (!props.ticket) return;
  if (!selectedStatus.value) return;
  emits(
    "update:selected-status",
    props.ticket.id,
    selectedStatus.value as Status
  );
  selectedStatus.value = "";
}
</script>

<template>
  <section v-if="props.ticket">
    <h3>Title: {{ props.ticket.title }}</h3>
    <p v-if="!props.editStatus">Status: {{ props.ticket.status }}</p>
    <label v-if="props.editStatus"
      >Status:
      <select v-model="selectedStatus">
        <option>Please select...</option>
        <option v-for="status in STATUS_OPTIONS" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
      <button @click="saveStatus()">Save</button>
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
