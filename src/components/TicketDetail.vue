<script setup lang="ts">
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../types/ticket";
import type { Ticket, Priority, Status } from "../types/ticket";
import { ref, watch } from "vue";
const selectedStatus = ref<Status | "">("");
const selectedPriority = ref<Priority | "">("");
const updatedDescription = ref<string>("");

const props = defineProps<{
  ticket?: Ticket | null | undefined;
  showMore: boolean;
  editStatus: boolean;
}>();
const emits = defineEmits<{
  (e: "toggle-more"): void;
  (e2: "close"): void;
  (e3: "edit-status", ticketId: string): void;
  (
    e4: "update:ticket",
    ticketId: string,
    status: Status,
    priority: Priority,
    description: string
  ): void;
}>();
function saveStatus() {
  if (!props.ticket) return;
  if (!selectedStatus.value) return;
  emits(
    "update:ticket",
    props.ticket.id,
    selectedStatus.value as Status,
    selectedPriority.value as Priority,
    updatedDescription.value as string
  );
}
watch(
  () => props.ticket,
  (ticket) => {
    if (ticket) {
      selectedStatus.value = ticket.status;
      selectedPriority.value = ticket.priority;
      updatedDescription.value = ticket.description;
    }
  },
  { immediate: true }
);
</script>

<template>
  <section v-if="props.ticket">
    <h3>Title: {{ props.ticket.title }}</h3>
    <p v-if="!props.editStatus">Status: {{ props.ticket.status }}</p>
    <label v-if="props.editStatus"
      >Status:
      <select v-model="selectedStatus">
        <option v-for="status in STATUS_OPTIONS" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </label>
    <p v-if="!props.editStatus">Priority: {{ props.ticket.priority }}</p>
    <label v-if="props.editStatus">
      Priority:
      <select v-model="selectedPriority">
        <option
          v-for="priority in PRIORITY_OPTIONS"
          :key="priority"
          :value="priority"
        >
          {{ priority }}
        </option>
      </select>
    </label>
    <p v-if="!props.editStatus">Description: {{ props.ticket.description }}</p>
    <label v-if="props.editStatus">
      Description:
      <textarea v-model="updatedDescription"> </textarea>
    </label>
    <div>
      <button v-if="props.editStatus" @click="saveStatus()">Save</button>
    </div>

    <button @click="emits('toggle-more')">
      {{ props.showMore ? "Less" : "More" }}
    </button>
    <button @click="emits('edit-status', props.ticket.id)">
      {{ props.editStatus ? "Back" : "Edit" }}
    </button>
    <button @click="emits('close')">Close</button>

    <div v-if="props.showMore">
      <p>Created on the: {{ props.ticket.createdAt }}</p>
    </div>
  </section>
</template>
