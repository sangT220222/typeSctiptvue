<script setup lang="ts">
import TicketList from "./components/TicketList.vue";
import TicketDetail from "./components/TicketDetail.vue";
import TicketFilter from "./components/TicketFilter.vue";
import TicketForm from "./components/TicketForm.vue";
import { useTicketStore } from "./stores/tickets";
const store = useTicketStore();
</script>

<template>
  <h1>Ticketing system</h1>
  <div>
    <TicketForm @submit="store.addTicket" />
  </div>
  <div>
    <TicketFilter
      :status-filter="store.statusFilter"
      :priority-filter="store.priorityFilter"
      @update:status-filter="store.statusFilter = $event"
      @update:priority-filter="store.priorityFilter = $event"
    />
  </div>
  <div>
    <TicketList
      :tickets="store.filteredTickets"
      @open-ticket="store.handleOpenTicket"
      @open-further="store.handleOpenMore"
      @delete-ticket="store.deleteTicket"
    />
  </div>
  <div>
    <TicketDetail
      :ticket="store.selectedTicket"
      :showMore="store.selectedMoreOption"
      :editStatus="store.editStatus"
      @edit-status="store.handleEditStatus"
      @toggle-more="store.handleOpenMore"
      @close="store.handleCloseTicket"
    />
  </div>
</template>
