<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-xl border border-border-light p-6 lg:p-8">
      <h2 class="text-2xl lg:text-3xl font-semibold text-primary mb-4">
        Informações Demográficas
      </h2>
      
      <p class="text-text-secondary mb-8 leading-relaxed">
        Para finalizar, nos ajude a entender melhor os participantes da pesquisa fornecendo 
        algumas informações demográficas básicas. Essas informações permanecerão anônimas.
      </p>
      
      <!-- Age Selection -->
      <div class="mb-8">
        <label class="block text-lg font-medium text-primary mb-4">
          Qual é a sua faixa etária?
        </label>
        
        <div class="space-y-3">
          <label
            v-for="option in ageOptions"
            :key="option.value"
            class="relative cursor-pointer"
          >
            <input
              v-model="demographics.age"
              :value="option.value"
              @change="saveDemographics"
              type="radio"
              name="age"
              class="sr-only"
            >
            <div
              class="p-4 border-2 rounded-lg text-center transition-all duration-200 hover:border-primary"
              :class="{
                'border-primary bg-primary/5 text-primary': demographics.age === option.value,
                'border-border-medium text-text-secondary hover:text-primary': demographics.age !== option.value
              }"
            >
              <span class="font-medium">{{ option.label }}</span>
            </div>
          </label>
        </div>
      </div>
      
      <!-- Navigation Buttons -->
      <div class="flex justify-between">
        <button 
          @click="goBack" 
          class="px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary-600 transition-colors duration-200 flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Anterior
        </button>
        
        <button 
          @click="proceed" 
          :disabled="!demographics.age"
          class="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 disabled:bg-border-medium disabled:text-text-muted disabled:cursor-not-allowed transition-all duration-200 flex items-center"
        >
          Finalizar Pesquisa
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
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

const demographics = ref({
  age: ''
})

const ageOptions = [
  { value: '18-24', label: '18-24 anos' },
  { value: '25-34', label: '25-34 anos' },
  { value: '35-44', label: '35-44 anos' },
  { value: '45-54', label: '45-54 anos' },
  { value: '55-64', label: '55-64 anos' },
  { value: '65+', label: '65+ anos' }
]

onMounted(() => {
  const savedDemographics = surveyStore.data.demographics || {}
  demographics.value = {
    age: savedDemographics.age || ''
  }
})

function saveDemographics() {
  surveyStore.updateData('demographics', demographics.value)
}

function goBack() {
  surveyStore.previousStep()
  router.push('/describe-ai')
}

function proceed() {
  if (demographics.value.age) {
    surveyStore.nextStep()
    router.push('/completed')
  }
}
</script>
