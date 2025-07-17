<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Choose Your Context</h2>
      
      <p class="text-gray-700 mb-8">
        Please select the context that best describes your background or area of interest. 
        This will help us understand your perspective on AI.
      </p>
      
      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div 
          v-for="context in contexts" 
          :key="context.value"
          @click="selectContext(context.value)"
          class="p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
          :class="{
            'border-blue-600 bg-blue-50': selectedContext === context.value,
            'border-gray-300 hover:border-gray-400': selectedContext !== context.value
          }"
        >
          <div class="flex items-center mb-3">
            <div class="w-3 h-3 rounded-full mr-3"
                 :class="{
                   'bg-blue-600': selectedContext === context.value,
                   'bg-gray-300': selectedContext !== context.value
                 }">
            </div>
            <h3 class="text-lg font-semibold">{{ context.title }}</h3>
          </div>
          <p class="text-gray-600">{{ context.description }}</p>
        </div>
      </div>
      
      <div class="flex justify-between">
        <button 
          @click="goBack" 
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>
        
        <button 
          @click="proceed" 
          :disabled="!selectedContext"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Continue
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
const selectedContext = ref('')

const contexts = [
  {
    value: 'academic',
    title: 'Academic/Research',
    description: 'Student, researcher, or academic professional'
  },
  {
    value: 'technology',
    title: 'Technology Professional',
    description: 'Software developer, data scientist, IT professional'
  },
  {
    value: 'business',
    title: 'Business Professional',
    description: 'Manager, entrepreneur, business analyst'
  },
  {
    value: 'healthcare',
    title: 'Healthcare Professional',
    description: 'Doctor, nurse, healthcare administrator'
  },
  {
    value: 'education',
    title: 'Education Professional',
    description: 'Teacher, professor, education administrator'
  },
  {
    value: 'public_sector',
    title: 'Public Sector',
    description: 'Government employee, public policy professional'
  },
  {
    value: 'general_public',
    title: 'General Public',
    description: 'Citizen interested in AI developments'
  },
  {
    value: 'other',
    title: 'Other',
    description: 'Other professional background'
  }
]

onMounted(() => {
  selectedContext.value = surveyStore.data.selectedContext || ''
})

function selectContext(value: string) {
  selectedContext.value = value
  surveyStore.updateData('selectedContext', value)
}

function goBack() {
  surveyStore.previousStep()
  router.push('/consent')
}

function proceed() {
  if (selectedContext.value) {
    surveyStore.nextStep()
    router.push('/impact')
  }
}
</script>
