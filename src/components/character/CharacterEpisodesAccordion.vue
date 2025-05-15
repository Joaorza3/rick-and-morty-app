<script setup lang="ts">
import { Accordion, AccordionTab, Card, Tag } from 'primevue'

defineProps<{
  episodesBySeason: Record<string, Array<{
    id: string
    name: string
    episode: string
    air_date: string
  }>>
}>()
</script>

<template>
  <Accordion multiple>

    <AccordionTab v-for="(eps, season) in episodesBySeason" :key="season" :header="season">

      <ul class="grid grid-cols-1 gap-2">

        <li v-for="ep in eps" :key="ep.id">
          <Card class="mb-2">

            <template #title>
              <div class="flex items-center gap-2 justify-between">

                <span class="font-semibold">{{ ep.name }}</span>
                <Tag severity="info">{{ ep.episode }}</Tag>
              </div>
            </template>

            <template #content>
              <div class="text-sm text-gray-500">Air date: {{ ep.air_date }}</div>
            </template>

          </Card>
        </li>

      </ul>
    </AccordionTab>

  </Accordion>
</template>
