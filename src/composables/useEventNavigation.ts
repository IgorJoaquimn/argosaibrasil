import { useRouter, useRoute } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

export function useEventNavigation() {
  const router = useRouter()
  const route = useRoute()
  const surveyStore = useSurveyStore()
  
  function getCurrentEventContext(): string {
    // Try to get from route params first
    const eventFromRoute = route.params.event as string
    if (eventFromRoute) {
      return eventFromRoute
    }
    
    // Fall back to store
    return surveyStore.getEventContext()
  }
  
  function navigateToPage(pagePath: string) {
    const eventContext = getCurrentEventContext()
    const fullPath = `/${eventContext}${pagePath}`
    router.push(fullPath)
  }
  
  function navigateToPageWithEvent(eventContext: string, pagePath: string) {
    const fullPath = `/${eventContext}${pagePath}`
    router.push(fullPath)
  }
  
  function updateEventContext(newEventContext: string) {
    surveyStore.setEventContext(newEventContext)
    // Optionally navigate to the same page with new event context
    const currentPath = route.path.replace(`/${getCurrentEventContext()}`, '')
    navigateToPageWithEvent(newEventContext, currentPath)
  }
  
  function getEventAwareUrl(pagePath: string, eventContext?: string): string {
    const event = eventContext || getCurrentEventContext()
    return `/${event}${pagePath}`
  }
  
  return {
    getCurrentEventContext,
    navigateToPage,
    navigateToPageWithEvent,
    updateEventContext,
    getEventAwareUrl
  }
}
