<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { CHARACTER_QUERY } from '@/queries/character-details'
import { Badge, Button, Divider, useToast } from 'primevue'

import CommonSpinner from '@/components/common/CommonSpinner.vue'
import CharacterInfoCard from '@/components/character/CharacterInfoCard.vue'
import CharacterEpisodesAccordion from '@/components/character/CharacterEpisodesAccordion.vue'
import NoCharactersFound from '@/components/common/NoCharactersFound.vue'
import TheHeader from '@/components/common/TheHeader.vue'
import type { Character } from '@/types'
import { getStatusSeverity } from '@/utils/get-status-severity'

const route = useRoute()
const router = useRouter()
const characterId = ref(route.params.id)

const queryParams = computed(() => ({
  id: characterId.value
}))

const { result, loading, error } = useQuery(CHARACTER_QUERY, queryParams)
const toast = useToast()

const statusClass = computed(() => getStatusSeverity(result.value?.character?.status ?? ''))

const episodesBySeason = computed(() => {
  const episodes = (result.value?.character?.episode ?? []) as Character['episode'];
  const grouped: Record<string, NonNullable<Character['episode']>> = {};

  episodes?.forEach((ep) => {
    const match = ep.episode.match(/S(\d+)E\d+/);
    const season = match ? `Season ${parseInt(match[1], 10)}` : 'Unknown';

    if (!grouped[season]) grouped[season] = [];

    grouped[season]!.push(ep);
  });

  return grouped;
})

watch(error, (err) => {
  if (err) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Sorry, an error occurred while fetching data.',
      life: 3000,
    })
  }
})

const backToHome = () => {
  router.push({ name: 'Home' })
}
</script>

<template>
  <div>
    <TheHeader />

    <div v-if="result && result.character" class="max-w-4xl w-full rounded-xl mt-12">

      <div class="overflow-hidden rounded-full h-52 w-52 mx-auto mb-4">
        <img alt="user header" :src="result.character.image"
          class="w-full object-cover h-52 hover:scale-105 transition-all" />
      </div>

      <div class="flex items-center justify-center flex-col gap-2 mb-4">
        <span class="text-2xl font-bold">{{ result.character.name }}</span>

        <div class="flex items-center gap-2">

          <Badge severity="secondary">{{ result.character.species }}</Badge>
          <span class="text-sm font-semibold text-gray-500">|</span>
          <Badge :severity="statusClass">{{ result.character.status }}</Badge>

        </div>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

          <CharacterInfoCard icon="pi pi-user" iconColor="text-yellow-500" label="Gender:"
            :value="result.character.gender" borderClass="border-yellow-200" />

          <CharacterInfoCard icon="pi pi-globe" iconColor="text-cyan-500" label="Origin:"
            :value="result.character.origin?.name" borderClass="border-cyan-200" />

          <CharacterInfoCard icon="pi pi-tag" iconColor="text-gray-500" label="Type:"
            :value="result.character.type ?? '-'" borderClass="border-gray-200" />

          <CharacterInfoCard icon="pi pi-map-marker" iconColor="text-purple-500" label="Location:"
            :value="result.character.location?.name" borderClass="border-purple-200" />

        </div>
      </div>

      <Divider>Episodes</Divider>

      <CharacterEpisodesAccordion :episodesBySeason="episodesBySeason" />

      <Button label="Back" icon="pi pi-arrow-left" @click="backToHome" class="mt-4 w-full" />
    </div>

    <div v-else-if="loading" class="w-full h-96 flex justify-center items-center">
      <CommonSpinner />
    </div>

    <NoCharactersFound v-else :icon="'pi pi-exclamation-triangle'" title="Error"
      subtitle="Sorry, an error occurred while fetching data.">

      <template #action>
        <Button label="Back" icon="pi pi-arrow-left" @click="backToHome" class="mt-4 w-full" />
      </template>

    </NoCharactersFound>
  </div>
</template>
