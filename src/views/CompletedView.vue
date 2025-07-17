<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-8 text-center">
      <div class="mb-8">
        <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Survey Completed!</h2>
        
        <p class="text-lg text-gray-700 mb-6">
          Thank you for participating in the Argos AI Brasil survey. Your responses are valuable 
          for understanding AI perceptions in Brazil.
        </p>
      </div>
      
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="text-xl font-semibold text-blue-900 mb-3">What happens next?</h3>
        <div class="text-blue-700 space-y-2">
          <p>• Your responses have been securely saved and anonymized</p>
          <p>• The data will be analyzed to understand AI perceptions across different groups</p>
          <p>• Results will be published in academic publications and reports</p>
          <p>• You can follow our research at Argos AI Brasil for updates</p>
        </div>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">Survey Summary</h3>
        <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span class="font-medium">Selected Context:</span>
            {{ getContextName(surveyStore.data.selectedContext) }}
          </div>
          <div>
            <span class="font-medium">Impact Sector:</span>
            {{ getSectorName(surveyStore.data.impactSector) }}
          </div>
          <div>
            <span class="font-medium">Completion Date:</span>
            {{ new Date().toLocaleDateString('pt-BR') }}
          </div>
          <div>
            <span class="font-medium">Response ID:</span>
            {{ responseId }}
          </div>
        </div>
      </div>
      
      <div class="space-y-4">
        <button 
          @click="downloadData" 
          class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mr-4"
        >
          Download My Responses
        </button>
        
        <button 
          @click="restartSurvey" 
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Take Survey Again
        </button>
      </div>
      
      <div class="mt-8 pt-6 border-t border-gray-200">
        <p class="text-sm text-gray-500">
          For questions about this research, contact: 
          <a href="mailto:research@argosaibrasil.org" class="text-blue-600 hover:text-blue-800">
            research@argosaibrasil.org
          </a>
        </p>
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
const responseId = ref('')

onMounted(() => {
  // Generate a simple response ID for user reference
  responseId.value = Date.now().toString(36) + Math.random().toString(36).substr(2)
})

const contextMap: Record<string, string> = {
  'academic': 'Academic/Research',
  'technology': 'Technology Professional',
  'business': 'Business Professional',
  'healthcare': 'Healthcare Professional',
  'education': 'Education Professional',
  'public_sector': 'Public Sector',
  'general_public': 'General Public',
  'other': 'Other'
}

const sectorMap: Record<string, string> = {
  'healthcare': 'Healthcare',
  'education': 'Education',
  'finance': 'Financial Services',
  'agriculture': 'Agriculture',
  'manufacturing': 'Manufacturing',
  'transportation': 'Transportation',
  'public_services': 'Public Services',
  'entertainment': 'Entertainment & Media',
  'retail': 'Retail & Commerce',
  'energy': 'Energy'
}

function getContextName(value?: string) {
  return value ? contextMap[value] || value : 'Not specified'
}

function getSectorName(value?: string) {
  return value ? sectorMap[value] || value : 'Not specified'
}

function downloadData() {
  const data = {
    responseId: responseId.value,
    completionDate: new Date().toISOString(),
    responses: surveyStore.data
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `argos-ai-survey-${responseId.value}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function restartSurvey() {
  if (confirm('Are you sure you want to restart the survey? This will clear all your current responses.')) {
    surveyStore.resetSurvey()
    router.push('/consent')
  }
}
</script>
