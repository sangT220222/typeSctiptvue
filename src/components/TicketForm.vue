<script setup lang="ts">
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../types/ticket";
// export const emits = defineEmits<{}>();
</script>

<template>
  <form>
    <label>Title:
        <input type="text"></input>
    </label>
    <label>Status:
        <select
            @change="($event) => {
                const value = ($event.target as HTMLSelectElement).value;
            }"
            >
            <option value="">Please select...</option>
            <option v-for="status in STATUS_OPTIONS" :key="status" :value="status">
                {{ status }}
            </option>
        </select>
    </label>
    <label>
        Priority:
        <select
            @change="($event) =>{
                const value = ($event.target as HTMLSelectElement).value;
            }"
            >
            <option value="">Please select...</option>
            <option
                v-for="priority in PRIORITY_OPTIONS"
                :value="priority"
                :key="priority"
            >
                {{ priority }}
            </option>
        </select>
    </label>
    
     <label>Description:
        <input type="text"></input>
    </label>
    <input type="submit"></input>
  </form>
</template>
