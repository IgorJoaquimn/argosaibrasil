import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface SurveyData {
  consentTerms?: boolean
  selectedContext?: string
  impactSector?: string
  hopesAndFears?: {
    hopes?: string
    fears?: string
  }
  aiDescription?: string
  demographics?: {
    age?: string
    gender?: string
    education?: string
    profession?: string
    aiExperience?: string
  }
}

export const useSurveyStore = defineStore('survey', () => {
  const currentStep = ref(0)
  const data = ref<SurveyData>({})

  const steps = [
    { path: '/consent', name: 'Consent Terms', key: 'consentTerms' },
    { path: '/context', name: 'Choose Context', key: 'selectedContext' },
    { path: '/impact', name: 'AI Impact Sector', key: 'impactSector' },
    { path: '/hopes-fears', name: 'Hopes and Fears', key: 'hopesAndFears' },
    { path: '/describe-ai', name: 'Describe AI', key: 'aiDescription' },
    { path: '/demographics', name: 'Demographics', key: 'demographics' }
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

  function updateData(key: keyof SurveyData, value: any) {
    data.value[key] = value
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
