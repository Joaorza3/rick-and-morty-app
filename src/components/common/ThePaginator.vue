<script setup lang="ts">
import { Paginator } from 'primevue';

defineProps<{
  page: number;
  rows: number;
  totalRecords: number;
}>();
const emit = defineEmits(['pageChange']);

const handlePageChange = (event: { page: number }) => {
  emit('pageChange', event.page + 1);
};
</script>

<template>
  <div class="card pt-4">

    <Paginator :first="(page - 1) * rows" :rows="rows" :totalRecords="totalRecords" @page="handlePageChange" />

  </div>
</template>
