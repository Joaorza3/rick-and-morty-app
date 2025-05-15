<script setup lang="ts">
import { provideApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './lib/apollo'
import Toast from 'primevue/toast';

provideApolloClient(apolloClient)
</script>

<template>
  <div class="bg-gradient-to-b from-white to-green-50 min-h-screen">

    <div class="p-4 max-w-4xl mx-auto">
      <RouterView />
    </div>

    <Toast />

  </div>
</template>
