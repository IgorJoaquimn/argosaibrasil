import { ref } from 'vue'
import type { Router } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

let isSetup = false

export function setupAutoSave(router: Router) {
  if (isSetup) return
  
  const surveyStore = useSurveyStore()
  
  async function saveData() {
    try {
      await surveyStore.saveData()
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }

  // Set up navigation guard to save data before each route change
  router.beforeEach(async (to, from, next) => {
    if (from.name && from.name !== to.name) {
      await saveData()
    }
    next()
  })
  
  isSetup = true
}

export function useAutoSave() {
  const surveyStore = useSurveyStore()
  const isSaving = ref(false)

  async function saveData() {
    try {
      isSaving.value = true
      await surveyStore.saveData()
    } catch (error) {
      console.error('Error saving data:', error)
    } finally {
      isSaving.value = false
    }
  }

  return {
    isSaving,
    saveData
  }
}
