import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface SurveyData {
  consentTerms?: boolean
  selectedContext?: string
  // impactSector?: string
  receiosEesperancas?: {
    receios?: string
    esperancas?: string
  }
  aiDescription?: string
  demographics?: {
    age?: string
    gender?: string
    state?: string
    occupation?: string
  }
  
  aiPriorities?: (string | null)[]
}

export const useSurveyStore = defineStore('survey', () => {
  const currentStep = ref(0)
  const data = ref<SurveyData>({})

  const steps = [
    { path: '/consent', name: 'Consent Terms', key: 'consentTerms' },
    { path: '/context', name: 'Choose Context', key: 'selectedContext' },
   // { path: '/impact', name: 'AI Impact Sector', key: 'impactSector' },
    { path: '/receioesperanca', name: 'Receios e Esperanças', key: 'receioesperanca' },
    { path: '/demographics', name: 'Demographics', key: 'demographics' },
    { path: '/demographics-gender', name: 'Demographics Gender', key: 'demographics-gender' },
    { path: '/demographics-state', name: 'Demographics State', key: 'demographics-state' },
    { path: '/demographics-occupation', name: 'Demographics Occupation', key: 'demographics-occupation' },
    { path: '/ai-priorities', name: 'AI Priorities', key: 'ai-priorities' },
    { path: '/describe-ai', name: 'Describe AI', key: 'aiDescription' },
    { path: '/summary', name:'Survey Summary', key:'summary'}
  ]

  const currentStepData = computed(() => steps[currentStep.value])
  const isLastStep = computed(() => currentStep.value === steps.length - 1)
  const isFirstStep = computed(() => currentStep.value === 0)

  function nextStep() {
    if (!isLastStep.value) {
      currentStep.value++
    }
  }

  function previousStep() {
    if (!isFirstStep.value) {
      currentStep.value--
    }
  }

  function goToStep(step: number) {
    if (step >= 0 && step < steps.length) {
      currentStep.value = step
    }
  }

  // function updateData(key: keyof SurveyData, value: any) {
  //   data.value[key] = value
  // }

  function updateData(key: keyof SurveyData, value: any) {
  if (typeof data.value[key] === 'object' && data.value[key] !== null && typeof value === 'object') {
    data.value[key] = { ...data.value[key], ...value }
  } else {
    data.value[key] = value
  }
}



  function resetSurvey() {
    currentStep.value = 0
    data.value = {}
  }

  return {
    currentStep,
    data,
    steps,
    currentStepData,
    isLastStep,
    isFirstStep,
    nextStep,
    previousStep,
    goToStep,
    updateData,
    resetSurvey
  }
}, {
  persist: true
})
