<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">AI Impact Sector</h2>
      
      <p class="text-gray-700 mb-8">
        Which sector do you think AI will have the most significant impact on in Brazil?
      </p>
      
      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div 
          v-for="sector in sectors" 
          :key="sector.value"
          @click="selectSector(sector.value)"
          class="p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
          :class="{
            'border-blue-600 bg-blue-50': selectedSector === sector.value,
            'border-gray-300 hover:border-gray-400': selectedSector !== sector.value
          }"
        >
          <div class="flex items-center mb-3">
            <div class="w-3 h-3 rounded-full mr-3"
                 :class="{
                   'bg-blue-600': selectedSector === sector.value,
                   'bg-gray-300': selectedSector !== sector.value
                 }">
            </div>
            <h3 class="text-lg font-semibold">{{ sector.title }}</h3>
          </div>
          <p class="text-gray-600">{{ sector.description }}</p>
        </div>
      </div>
      
      <div class="flex justify-between">
        <button 
          @click="goBack" 
          class="btn-go-back"
        >
          Previous
        </button>
        
        <button 
          @click="proceed" 
          :disabled="!selectedSector"
          class="btn-proceed"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSurveyStore } from '@/stores/survey'
import { useSurveyNavigation } from '@/composables/useSurveyNavigation'

const surveyStore = useSurveyStore()
const { goBack, proceed: navigateNext } = useSurveyNavigation()
const selectedSector = ref('')

const sectors = [
  {
    value: 'healthcare',
    title: 'Healthcare',
    description: 'Medical diagnosis, treatment, and healthcare management'
  },
  {
    value: 'education',
    title: 'Education',
    description: 'Learning platforms, educational content, and teaching methods'
  },
  {
    value: 'finance',
    title: 'Financial Services',
    description: 'Banking, insurance, investment, and financial technology'
  },
  {
    value: 'agriculture',
    title: 'Agriculture',
    description: 'Precision farming, crop monitoring, and agricultural optimization'
  },
  {
    value: 'manufacturing',
    title: 'Manufacturing',
    description: 'Industrial automation, quality control, and production optimization'
  },
  {
    value: 'transportation',
    title: 'Transportation',
    description: 'Autonomous vehicles, logistics, and traffic management'
  },
  {
    value: 'public_services',
    title: 'Public Services',
    description: 'Government services, public safety, and urban planning'
  },
  {
    value: 'entertainment',
    title: 'Entertainment & Media',
    description: 'Content creation, gaming, and media production'
  },
  {
    value: 'retail',
    title: 'Retail & Commerce',
    description: 'E-commerce, customer service, and supply chain'
  },
  {
    value: 'energy',
    title: 'Energy',
    description: 'Smart grids, renewable energy, and energy efficiency'
  }
]

onMounted(() => {
  selectedSector.value = surveyStore.data.impactSector || ''
})

function selectSector(value: string) {
  selectedSector.value = value
  surveyStore.updateData('impactSector', value)
}

function proceed() {
  if (selectedSector.value) {
    navigateNext()
  }
}
</script>
