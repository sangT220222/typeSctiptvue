<script setup lang="ts">
import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  type Status,
  type Priority,
} from "../types/ticket";
import { ref } from "vue";
const title = ref<string>("");
const status = ref<Status | "">("");
const priority = ref<Priority | "">("");
const description = ref<string>("");
const emits = defineEmits<{
  (
    e: "submit",
    payload: {
      title: string;
      status: Status;
      priority: Priority;
      description: string;
    }
  ): void;
}>();
function onSubmit() {
  emits("submit", {
    title: title.value,
    status: status.value as Status,
    priority: priority.value as Priority,
    description: description.value,
  });
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label
      >Title:
      <input type="text" v-model="title" />
    </label>
    <label
      >Status:
      <select v-model="status">
        <option>Please select...</option>
        <option v-for="status in STATUS_OPTIONS" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </label>
    <label>
      Priority:
      <select v-model="priority">
        <option>Please select...</option>
        <option
          v-for="priority in PRIORITY_OPTIONS"
          :value="priority"
          :key="priority"
        >
          {{ priority }}
        </option>
      </select>
    </label>

    <label
      >Description:
      <input type="text" v-model="description" />
    </label>
    <button type="submit">Add ticket</button>
  </form>
</template>
