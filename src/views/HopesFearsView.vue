<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Hopes and Fears</h2>
      
      <p class="text-gray-700 mb-8">
        Please share your thoughts about AI technology. What are your hopes and fears regarding 
        the development and adoption of artificial intelligence?
      </p>
      
      <div class="space-y-6 mb-8">
        <div>
          <label for="hopes" class="block text-lg font-medium text-gray-900 mb-3">
            What are your hopes for AI? 🌟
          </label>
          <textarea
            id="hopes"
            v-model="hopes"
            @input="saveHopes"
            rows="5"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="What positive impacts do you hope AI will bring to society, your profession, or daily life?"
          ></textarea>
        </div>
        
        <div>
          <label for="fears" class="block text-lg font-medium text-gray-900 mb-3">
            What are your concerns about AI? ⚠️
          </label>
          <textarea
            id="fears"
            v-model="fears"
            @input="saveFears"
            rows="5"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="What potential risks, challenges, or negative impacts concern you about AI development?"
          ></textarea>
        </div>
      </div>
      
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-blue-700">
              Your responses are automatically saved as you type. Feel free to take your time 
              and be as detailed as you'd like.
            </p>
          </div>
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
          :disabled="!hopes.trim() && !fears.trim()"
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
const hopes = ref('')
const fears = ref('')

onMounted(() => {
  const data = surveyStore.data.hopesAndFears || {}
  hopes.value = data.hopes || ''
  fears.value = data.fears || ''
})

function saveHopes() {
  const current = surveyStore.data.hopesAndFears || {}
  surveyStore.updateData('hopesAndFears', { ...current, hopes: hopes.value })
}

function saveFears() {
  const current = surveyStore.data.hopesAndFears || {}
  surveyStore.updateData('hopesAndFears', { ...current, fears: fears.value })
}

function goBack() {
  surveyStore.previousStep()
  router.push('/impact')
}

function proceed() {
  if (hopes.value.trim() || fears.value.trim()) {
    surveyStore.nextStep()
    router.push('/describe-ai')
  }
}
</script>
