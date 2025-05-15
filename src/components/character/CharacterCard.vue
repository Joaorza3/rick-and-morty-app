<script setup lang="ts">
import { computed } from 'vue'
import { Card, Button, Badge } from 'primevue'
import { useRouter } from 'vue-router'
import type { Character } from '@/types'
import { getStatusSeverity } from '@/utils/get-status-severity';

const props = defineProps<{
  id: string
  name: string
  image: string
  species: string
  status: Character['status']
}>()
const router = useRouter()

const statusClass = computed(() => getStatusSeverity(status))

function goToDetails() {
  router.push({ name: 'CharacterDetails', params: { id: props.id } })
}
</script>

<template>
  <div>
    <Card class="w-full h-full flex flex-col">

      <template #header>
        <div class="overflow-hidden rounded-t-lg">
          <img alt="user header" :src="image" class="w-full object-cover h-52 hover:scale-105 transition-all" />
        </div>
      </template>

      <template #title>
        <div class="flex items-center gap-2">
          <span class="text-lg font-semibold">{{ name }}</span>
        </div>
      </template>

      <template #content>

        <div class="flex items-center gap-2">

          <Badge severity="secondary">{{ species }}</Badge>
          <span class="text-sm font-semibold text-gray-500">|</span>
          <Badge :severity="statusClass">{{ status }}</Badge>

        </div>

        <div class="flex gap-4 mt-4">
          <Button label="Details" class="w-full" @click="goToDetails" />
        </div>
      </template>
    </Card>
  </div>
</template>
