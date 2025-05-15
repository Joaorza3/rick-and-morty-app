<template>
  <div
    class="flex flex-col items-center justify-center h-80 text-gray-500 bg-white px-6 md:px-16 lg:px-24 lg:py-8 rounded-lg">

    <i :class="icon" style="font-size: 3rem;"></i>

    <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
    <p>{{ subtitle }}</p>

    <div v-if="$slots.action" class="mt-4 w-full">
      <slot name="action" />
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  subtitle: string
}>()
</script>
