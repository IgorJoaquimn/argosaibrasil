<template>
  <header class="w-full bg-background border-b border-primary-500">
    <div class="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      <div class="flex items-center justify-between w-full py-4">
        <!-- Logo Section (Left) -->
        <div class="flex items-center flex-shrink-0">
          <img alt="Argos IA Brasil" src="@/assets/logo.svg" class="w-10 h-10" />
        </div>
        
        <!-- Title Section (Center) -->
        <div class="flex-1 flex justify-center">
          <h1 class="text-xl font-mono font-semibold text-primary-500">
            Argos IA Brasil
          </h1>
        </div>
        
        <!-- Navigation Section (Right) -->
        <nav class="flex items-center gap-4">
          <!-- <button 
            @click="navigateTo('/')"
            :class="['nav-button text-sm font-medium transition-colors duration-200 underline-offset-4 text-primary',
                     $route.path === '/' ? 'underline' : 'hover:underline']"
          > -->
            <!-- Home
          </button> -->
          <button 
            @click="navigateTo('/consent')"
            :class="['nav-button text-sm font-medium transition-colors duration-200 underline-offset-4 text-primary-500',
                     $route.path === '/consent' ? 'underline' : 'hover:underline']"
          >
            Termo de Consentimento
          </button>
          <button 
            @click="openContact"
            class="nav-button text-sm font-medium hover:underline transition-colors duration-200 underline-offset-4 text-primary-500"
          >
            Contato
          </button>
          <button 
            @click="openAbout"
            class="nav-button text-sm font-medium hover:underline transition-colors duration-200 underline-offset-4 text-primary-500"
          >
            Sobre
          </button>
          
          <!-- Action Buttons -->
          <div class="flex items-center space-x-2 ml-4 pl-4">
            <button 
              @click="interruptSurvey"
              class="nav-button px-4 py-2 text-sm font-medium text-white bg-primary-400 hover:bg-primary-500 transition-colors duration-200"
            >
              Interromper
            </button>
            <button 
              @click="finishSurvey"
              class="nav-button px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 transition-colors duration-200"
            >
              Finalizar
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

const router = useRouter()
const route = useRoute()
const surveyStore = useSurveyStore()


function navigateTo(path: string) {
  router.push(path)
}

function openContact() {
  // TODO: Implement contact modal or page
  console.log('Open contact')
}

function openAbout() {
  // TODO: Implement about modal or page
  console.log('Open about')
}

function interruptSurvey() {
  // TODO: Implement survey interruption with confirmation
  const confirmed = confirm('Tem certeza de que deseja interromper a pesquisa?')
  if (confirmed) {
    router.push('/')
  }
}

function finishSurvey() {
  router.push('/completed')
}
</script>