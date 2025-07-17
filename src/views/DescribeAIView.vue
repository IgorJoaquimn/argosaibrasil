<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-xl border border-border-light p-6 lg:p-8">
      <h2 class="text-2xl lg:text-3xl font-semibold text-primary mb-4">
        Como você descreveria IA para um amigo?
      </h2>
      
      <p class="text-text-secondary mb-8 leading-relaxed">
        Imagine que você está explicando inteligência artificial para um amigo que nunca ouviu falar disso. 
        Como você descreveria o que é IA e o que ela pode fazer? Use suas próprias palavras e exemplos.
      </p>
      
      <!-- Text Area with Character Counter -->
      <div class="mb-6">
        <div class="relative">
          <textarea
            v-model="description"
            @input="saveDescription"
            rows="8"
            class="w-full px-4 py-4 border border-border-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-primary placeholder-text-muted transition-all duration-200"
            placeholder="Como você explicaria IA para alguém? Que exemplos você daria? O que a IA pode fazer que é útil ou interessante?"
            maxlength="2000"
          ></textarea>
          
          <!-- Character Counter -->
          <div class="absolute bottom-3 right-3 text-sm text-text-muted bg-white px-2 py-1 rounded">
            {{ description.length }}/2000
          </div>
        </div>
        
        <!-- Progress bar for character count -->
        <div class="mt-2 w-full bg-bg-muted rounded-full h-1">
          <div 
            class="h-1 rounded-full transition-all duration-300"
            :class="{
              'bg-primary': description.length >= 50,
              'bg-warning': description.length > 0 && description.length < 50,
              'bg-border-medium': description.length === 0
            }"
            :style="{ width: `${Math.min((description.length / 2000) * 100, 100)}%` }"
          ></div>
        </div>
      </div>
      
      <!-- Tips Section -->
      <div class="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
        <div class="flex items-start">
          <div class="flex-shrink-0 mt-0.5">
            <svg class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-primary mb-2">Dicas para sua descrição:</h3>
            <ul class="text-sm text-text-secondary space-y-1">
              <li class="flex items-start">
                <span class="text-primary mr-2 mt-1">•</span>
                Pense em ferramentas de IA que você já usou (assistentes virtuais, recomendações, etc.)
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2 mt-1">•</span>
                Considere tanto exemplos simples quanto complexos
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2 mt-1">•</span>
                Não se preocupe em ser tecnicamente perfeito - queremos sua perspectiva!
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Navigation Buttons -->
      <div class="flex justify-between">
        <button 
          @click="goBack" 
          class="px-6 py-3 bg-bg-light text-text-secondary rounded-lg font-medium hover:bg-bg-muted transition-colors duration-200 flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Anterior
        </button>
        
        <button 
          @click="proceed" 
          :disabled="!description.trim() || description.length < 50"
          class="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 disabled:bg-border-medium disabled:text-text-muted disabled:cursor-not-allowed transition-all duration-200 flex items-center"
        >
          Continuar
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      
      <!-- Minimum characters hint -->
      <div v-if="description.length > 0 && description.length < 50" class="mt-3 text-sm text-warning text-center">
        Mínimo de 50 caracteres necessário ({{ 50 - description.length }} restantes)
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

const router = useRouter()
const surveyStore = useSurveyStore()
const description = ref('')

onMounted(() => {
  description.value = surveyStore.data.aiDescription || ''
})

function saveDescription() {
  surveyStore.updateData('aiDescription', description.value)
}

function goBack() {
  surveyStore.previousStep()
  router.push('/receioesperanca')
}

function proceed() {
  if (description.value.trim() && description.value.length >= 50) {
    surveyStore.nextStep()
    router.push('/demographics')
  }
}
</script>
