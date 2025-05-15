<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { IconField, InputText, InputIcon, Select } from 'primevue'

import { LIST_CHARACTERS_QUERY } from '@/queries/list-characters'
import TheHeader from '@/components/common/TheHeader.vue'
import CharacterCard from '@/components/character/CharacterCard.vue'
import ThePaginator from '@/components/common/ThePaginator.vue'
import CommonSpinner from '@/components/common/CommonSpinner.vue'
import NoCharactersFound from '@/components/common/NoCharactersFound.vue'
import { useToast } from 'primevue/usetoast';
import { savePageToStorage, getPageFromStorage, clearPageFromStorage } from '@/utils/page-storage';
import type { CharactersResponse } from '@/types'

const toast = useToast();

const selectedStatus = ref();
const statusList = ref([
  { name: 'All', value: '' },
  { name: 'Alive', value: 'Alive' },
  { name: 'Dead', value: 'Dead' },
  { name: 'Unknown', value: 'unknown' }
]);

const page = ref(1)
const name = ref('')
const debouncedName = ref('')

const savedPage = getPageFromStorage();
if (savedPage) {
  page.value = savedPage;
}

let debounceTimeout: ReturnType<typeof setTimeout> | null = null
watch(name, (newVal) => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    debouncedName.value = newVal
    page.value = 1
  }, 400)
})

const queryParams = computed(() => ({
  page: page.value,
  filter: {
    name: debouncedName.value,
    status: selectedStatus.value?.value,
  },
}));

const { result, loading, error } = useQuery<CharactersResponse>(
  LIST_CHARACTERS_QUERY,
  queryParams
);

watch(error, (err) => {
  if (err) {
    clearPageFromStorage();
    page.value = 1
    toast.add({ severity: 'error', summary: 'Error', detail: 'Sorry, an error occurred while fetching data.' });
  }
});

const onPageChange = (newPage: number) => {
  page.value = newPage
  savePageToStorage(newPage);
}
</script>

<template>
  <div>
    <TheHeader />

    <div class="flex gap-4 pb-4 flex-col md:flex-row">
      <IconField class="w-full flex">
        <InputIcon class="pi pi-search" />
        <InputText class="flex-1" v-model="name" placeholder="Character name" />
      </IconField>
      <div class="card flex justify-center">
        <Select v-model="selectedStatus" :options="statusList" optionLabel="name" placeholder="Select a status"
          class="w-full md:w-56" />
      </div>
    </div>

    <div v-if="loading">
      <div class="card flex items-center justify-center h-96">
        <CommonSpinner />
      </div>
    </div>

    <NoCharactersFound v-else-if="error" :icon="'pi pi-exclamation-triangle'" title="Error"
      subtitle="Sorry, an error occurred while fetching data." />

    <div v-else>
      <template v-if="result?.characters.results?.length">

        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <CharacterCard v-for="character in result?.characters.results" :key="character.id" v-bind="character" />
        </ul>

      </template>

      <NoCharactersFound v-else :icon="'pi pi-users mb-4'" title="No characters found"
        subtitle="Try changing the filters or search term." />

    </div>

    <ThePaginator v-if="result?.characters?.info?.count" :page="page" :rows="20"
      :total-records="result?.characters?.info?.count || 0" @page-change="onPageChange" />
  </div>
  <RouterView />
</template>
