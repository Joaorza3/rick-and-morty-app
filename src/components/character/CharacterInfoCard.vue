<script setup lang="ts">
import { Card } from 'primevue'

defineProps<{
  icon: string
  iconColor: string
  label: string
  value: string | undefined | null
  borderClass?: string
  className?: string
}>()
</script>

<template>
  <Card :class="[borderClass, className]">

    <template #content>

      <div class="flex items-center gap-2">
        <i :class="[icon, iconColor, 'text-xl']"></i>
        <span class="font-semibold">{{ label }}</span>
        <span>{{ value ?? '-' }}</span>
      </div>

    </template>

  </Card>
</template>
