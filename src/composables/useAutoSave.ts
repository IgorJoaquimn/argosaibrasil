import { ref } from 'vue'
import type { Router } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

let isSetup = false
let currentPageStartTime: string | null = null

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

  // Set up navigation guard to save data and track page visits
  router.beforeEach(async (to, from, next) => {
    // Track exit from previous page (calculate time spent)
    if (from.name && currentPageStartTime) {
      const exitTime = new Date().toISOString()
      const pageName = from.name.toString()
      surveyStore.calculateTimeSpent(pageName, exitTime)
    }
    
    // Save data when navigating away from a page
    if (from.name && from.name !== to.name) {
      await saveData()
    }
    
    next()
  })
  
  // Track entry to new page
  router.afterEach((to) => {
    if (to.name) {
      const pageName = to.name.toString()
      surveyStore.trackPageVisit(pageName)
      currentPageStartTime = new Date().toISOString()
    }
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
  
  function trackPageVisit(pageName: string) {
    surveyStore.trackPageVisit(pageName)
  }
  
  function getPageVisitInfo(pageName: string) {
    return surveyStore.getPageVisitInfo(pageName)
  }
  
  function calculateTimeSpent(pageName: string, exitTime?: string) {
    return surveyStore.calculateTimeSpent(pageName, exitTime)
  }

  return {
    isSaving,
    saveData,
    trackPageVisit,
    getPageVisitInfo,
    calculateTimeSpent
  }
}
