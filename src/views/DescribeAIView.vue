<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-xl p-6 lg:p-8">
     <h2 class="text-2xl lg:text-3xl font-semibold text-primary mb-4 text-center">
        Última Pergunta!
      </h2>
      <h3 class="text-2xl lg:text-3xl font-semibold text-primary mb-4">
       Para terminar, imagine que alguém da sua família pergunta: 
     "O que é essa tal de inteligência artificial?"
      </h3>
<br>
<br>
      
      <!-- Text Area with Character Counter -->
      <div class="mb-6">
        <div class="relative">
      <textarea
  v-model="description"
  @input="saveDescription"
  rows="8"
  class="w-full pr-16 px-4 py-4 border border-border-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-primary placeholder-text-muted transition-all duration-200"
  placeholder="Como você explicaria IA para alguém? Que exemplos você daria? O que a IA pode fazer que é útil ou interessante?"
  maxlength="2000"
></textarea>

          
          <!-- Character Counter -->
          <div class="absolute bottom-2 right-3 text-xs text-text-muted bg-white px-2 py-1 rounded shadow-sm">
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
      
      <br><br>
      
      <!-- Navigation Buttons -->
      <div class="flex justify-between">
        <button 
          @click="goBack" 
          class="px-6 py-3 bg-bg-light text-text-secondary rounded-lg font-medium hover:bg-bg-muted transition-colors duration-200 flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Voltar
        </button>
        
        <button 
          @click="proceed" 
          :disabled="false"
          class="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 disabled:bg-border-medium disabled:text-text-muted disabled:cursor-not-allowed transition-all duration-200 flex items-center"
        >
          Concluir
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
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
  router.push('/ai-priorities')
}

function proceed() {
  surveyStore.nextStep()
  router.push('/completed')
}



</script>
