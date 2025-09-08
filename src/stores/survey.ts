import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SurveyData } from '@/types'




export const useSurveyStore = defineStore('survey', () => {
  const currentStep = ref(0)
  const data = ref<Partial<SurveyData>>({
      aiPrioritiesIndex: 0,
      aiPrioritiesReturnFromNextStep: false,
      selectedSectors: [],
      otherSector: '',
      pageTimestamps: {},
      eventContext: 'test' // default value
    })

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
  if (
    typeof data.value[key] === 'object' &&
    data.value[key] !== null &&
    typeof value === 'object'
  ) {
    data.value[key] = { ...(data.value[key] as object), ...value } as any
  } else {
    (data.value as any)[key] = value
  }
}

function updateArrayData(key: keyof SurveyData, newArray: any[]) {
  if (!Array.isArray(newArray)) {
    console.warn(`updateArrayData: esperado array para a chave ${key}, mas recebeu:`, newArray)
    return
  }
  ;(data.value as any)[key] = [...newArray]
}

  function trackPageVisit(pageName: string) {
    const now = new Date().toISOString()
    
    if (!data.value.pageTimestamps) {
      data.value.pageTimestamps = {}
    }
    
    if (!data.value.pageTimestamps[pageName]) {
      // First visit to this page
      data.value.pageTimestamps[pageName] = {
        firstVisit: now,
        lastVisit: now,
        visitCount: 1
      }
    } else {
      // Update for subsequent visits
      data.value.pageTimestamps[pageName].lastVisit = now
      data.value.pageTimestamps[pageName].visitCount += 1
    }
    
    console.log(`📊 Page visit tracked: ${pageName}`, data.value.pageTimestamps[pageName])
  }
  
  function getPageVisitInfo(pageName: string) {
    return data.value.pageTimestamps?.[pageName] || null
  }
  
  function calculateTimeSpent(pageName: string, exitTime?: string) {
    const pageInfo = data.value.pageTimestamps?.[pageName]
    if (!pageInfo) return 0
    
    const startTime = new Date(pageInfo.lastVisit).getTime()
    const endTime = exitTime ? new Date(exitTime).getTime() : Date.now()
    const timeSpent = endTime - startTime
    
    // Update total time spent
    if (!pageInfo.totalTimeSpent) {
      pageInfo.totalTimeSpent = 0
    }
    pageInfo.totalTimeSpent += timeSpent
    
    return timeSpent
  }
  
  function setEventContext(eventContext: string) {
    data.value.eventContext = eventContext
    console.log(`🎯 Event context set to: ${eventContext}`)
  }
  
  function getEventContext(): string {
    return data.value.eventContext || 'test'
  }

  function generateUniqueId(): string {
    const timestamp = Date.now().toString(36)              // Base36 timestamp
    const randomPart = Math.random().toString(36).substr(2, 6) // 6 random chars
    return `${timestamp}-${randomPart}`
  }

  function getOrCreateUserId(): string {
    const key = 'userId'
    let id = localStorage.getItem(key)
    if (!id) {
      id = generateUniqueId()
      localStorage.setItem(key, id)
    }
    return id
  }


  async function saveData() {
    try {
      const eventContext = getEventContext()
      const fileName = `events/${eventContext}/survey-${getOrCreateUserId()}.json`
      const FUNCTION_URL = 'https://argosaibrasil-cf-649632774475.southamerica-east1.run.app/'

      console.log(`💾 Saving data to: ${fileName}`)

      // 1. Request signed URL from backend
      const response = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName,
          method: 'PUT'
        })
      })

      const result = await response.json()

      if (!response.ok || !result.signed_url) {
        console.error('Failed to get signed URL:', result)
        throw new Error('Could not retrieve signed URL')
      }

      const signedUrl = result.signed_url
      // 2. Upload data to the signed URL
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.value)
      })

      if (!uploadResponse.ok) {
        throw new Error('Upload failed')
      }

      console.log('✅ Data uploaded successfully')
    } catch (error) {
      console.error('❌ Error saving data:', error)
    }
  }

  function resetSurvey() {
    const currentEventContext = getEventContext() // Preserve the event context
    currentStep.value = 0
    data.value = {
      aiPrioritiesIndex: 0,
      aiPrioritiesReturnFromNextStep: false,
      selectedSectors: [],
      otherSector: '',
      pageTimestamps: {},
      eventContext: currentEventContext // Restore the event context
    }
  }

  async function abandonSurvey() {
    try {
      // Set desistiu flag and clear other data except this flag
      resetSurvey()
      data.value.desistiu = true
      // Save the data with the desistiu flag
      await saveData()
      resetSurvey()
      } catch (error) {
      console.error('Error abandoning survey:', error)
    }
  }

  async function finishIncomplete() {
    try {
      // Set incompleto flag and save current data
      data.value.incompleto = true
      await saveData()
      resetSurvey()
    } catch (error) {
      console.error('Error finishing incomplete survey:', error)
    }
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
    updateArrayData,
    trackPageVisit,
    getPageVisitInfo,
    calculateTimeSpent,
    setEventContext,
    getEventContext,
    saveData,
    resetSurvey,
    abandonSurvey,
    finishIncomplete
  }
}, {
  persist: true
})
