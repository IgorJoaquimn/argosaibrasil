import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'
import { useEventNavigation } from '@/composables/useEventNavigation'

export function useSurveyNavigation() {
  const router = useRouter()
  const route = useRoute()
  const surveyStore = useSurveyStore()
  const { getCurrentEventContext, navigateToPage } = useEventNavigation()

  // Route mapping based on the survey steps (without event context)
  const routeMap: Record<string, { next?: string; previous?: string }> = {
    '/consent': { next: '/context' },
    '/context': { next: '/receioesperanca', previous: '/consent' },
    '/receioesperanca': { next: '/demographics', previous: '/context' },
    '/demographics': { next: '/demographics-gender', previous: '/receioesperanca' },
    '/demographics-gender': { next: '/demographics-state', previous: '/demographics' },
    '/demographics-state': { next: '/demographics-occupation', previous: '/demographics-gender' },
    '/demographics-occupation': { next: '/ai-priorities', previous: '/demographics-state' },
    '/ai-priorities': { next: '/describe-ai', previous: '/demographics-occupation' },
    '/describe-ai': { next: '/completed', previous: '/ai-priorities' },
    '/completed': { previous: '/describe-ai' }
  }

  // Get the current route without the event context for mapping
  const getCurrentRoutePath = () => {
    const eventContext = getCurrentEventContext()
    return route.path.replace(`/${eventContext}`, '')
  }

  const currentRoute = computed(() => getCurrentRoutePath())
  const currentRouteConfig = computed(() => routeMap[currentRoute.value] || {})

  function goBack() {
    const previousRoute = currentRouteConfig.value.previous
    if (previousRoute) {
      surveyStore.previousStep()
      navigateToPage(previousRoute)
    }
  }

  function proceed() {
    const nextRoute = currentRouteConfig.value.next
    if (nextRoute) {
      surveyStore.nextStep()
      navigateToPage(nextRoute)
    }
  }

  // Generic function to navigate to a specific route with store sync
  function navigateTo(routePath: string, updateStore: 'next' | 'previous' | 'none' = 'none') {
    if (updateStore === 'next') {
      surveyStore.nextStep()
    } else if (updateStore === 'previous') {
      surveyStore.previousStep()
    }
    navigateToPage(routePath)
  }

  const canGoBack = computed(() => !!currentRouteConfig.value.previous)
  const canProceed = computed(() => !!currentRouteConfig.value.next)

  return {
    goBack,
    proceed,
    navigateTo,
    canGoBack,
    canProceed,
    currentRoute,
    routeMap
  }
}
