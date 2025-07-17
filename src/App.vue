<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <AppHeader />
    
    <!-- Content Area -->
    <main class="container mx-auto px-4 lg:px-8 max-w-4xl py-8 lg:py-12">
      <RouterView />
    </main>
  </div>
</template>
