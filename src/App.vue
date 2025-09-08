<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <AppHeader />
    
    <!-- Content Area -->
    <main class="container mx-auto px-4 lg:px-8 py-8 lg:py-12 flex-1">
      <RouterView />
    </main>
    
    <!-- Footer -->
    <AppFooter />
  </div>
</template>
