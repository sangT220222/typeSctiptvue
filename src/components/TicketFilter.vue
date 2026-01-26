<script setup lang="ts">
import {
  STATUS_OPTIONS,
  type Status,
  type Priority,
  PRIORITY_OPTIONS,
} from "../types/ticket";
const props = defineProps<{
  statusFilter: Status | "all";
  priorityFilter: Priority | "all";
}>();
const emits = defineEmits<{
  (e: "update:statusFilter", value: Status | "all"): void;
  (e2: "update:priorityFilter", value: Priority | "all"): void;
}>();
function applyFilters() {}
</script>

<template>
  <label>Status:</label>

  <select
    :value="props.statusFilter"
    @change="
      emits(
        'update:statusFilter',
        ($event.target as HTMLSelectElement).value as Status | 'all'
      )
    "
  >
    <option value="all">All</option>
    <option v-for="status in STATUS_OPTIONS" :key="status" :value="status">
      {{ status }}
    </option>
  </select>
  <label>Priority</label>

  <select
    :value="props.priorityFilter"
    @change="
      emits(
        'update:priorityFilter',
        ($event.target as HTMLSelectElement).value as Priority | 'all'
      )
    "
  >
    <option value="all">All</option>
    <option
      v-for="priority in PRIORITY_OPTIONS"
      :key="priority"
      :value="priority"
    >
      {{ priority }}
    </option>
  </select>
</template>
