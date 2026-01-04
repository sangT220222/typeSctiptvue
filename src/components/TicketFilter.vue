<script setup lang="ts">
import { STATUS_OPTIONS, type Status, type Priority } from "../types/ticket";
const props = defineProps<{
  statusFilter: Status | "all";
  //   priorityFilter: Priority | "all";
}>();
const emits = defineEmits<{
  (e: "update:statusFilter", value: Status | "all"): void;
  //   (e2: "priority-filter", value: Priority | "all"): void;
}>();
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
  <!-- <label>Priority</label>

  <select>
    Priority
  </select> -->
</template>
