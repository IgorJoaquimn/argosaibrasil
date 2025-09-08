import { createRouter, createWebHashHistory } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'
import ConsentView from '@/views/survey/ConsentView.vue'
import ContextView from '@/views/survey/ContextView.vue'
// import ImpactView from '@/views/survey/ImpactView.vue'
import ReceioEsperancaView from '@/views/survey/ReceioEsperancaView.vue'
import DemographicsView from '@/views/survey/DemographicsView.vue'
import DemographicsGenderView from '@/views/survey/DemographicsGenderView.vue'
import DemographicsStateView from '@/views/survey/DemographicsStateView.vue'
import DemographicsOccupationView from '@/views/survey/DemographicsOccupationView.vue'
import AIPrioritiesView from '@/views/survey/AIPrioritiesView.vue'
import DescribeAIView from '@/views/survey/DescribeAIView.vue'
import CompletedView from '@/views/CompletedView.vue'
import SurveySummary from '@/views/survey/SurveySummary.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/test/consent'
    },
    // Handle event parameter with trailing slash
    {
      path: '/:event/',
      redirect: to => `/${to.params.event}/consent`
    },
    // Routes with event parameter
    {
      path: '/:event/consent',
      name: 'consent',
      component: ConsentView
    },
    {
      path: '/:event/context',
      name: 'context',
      component: ContextView
    },
    {
      path: '/:event/receioesperanca',
      name: 'receioesperanca',
      component: ReceioEsperancaView
    },
    {
      path: '/:event/demographics',
      name: 'demographics',
      component: DemographicsView
    },
    {
      path: '/:event/demographics-gender',
      name: 'demographics-gender',
      component: DemographicsGenderView
    },
    {
      path: '/:event/demographics-state',
      name: 'demographics-state',
      component: DemographicsStateView
    },
    {
      path: '/:event/demographics-occupation',
      name: 'demographics-occupation',
      component: DemographicsOccupationView
    },
    {
      path: '/:event/ai-priorities',
      name: 'ai-priorities',
      component: AIPrioritiesView
    },
    {
      path: '/:event/describe-ai',
      name: 'describe-ai',
      component: DescribeAIView
    },
    {
      path: '/:event/completed',
      name: 'completed',
      component: CompletedView
    },
    {
      path: '/:event/summary',
      name: 'SurveySummary',
      component: SurveySummary
    },
    // Legacy routes without event parameter (redirect to test)
    {
      path: '/consent',
      redirect: '/test/consent'
    },
    {
      path: '/context',
      redirect: '/test/context'
    },
    {
      path: '/receioesperanca',
      redirect: '/test/receioesperanca'
    },
    {
      path: '/demographics',
      redirect: '/test/demographics'
    },
    {
      path: '/demographics-gender',
      redirect: '/test/demographics-gender'
    },
    {
      path: '/demographics-state',
      redirect: '/test/demographics-state'
    },
    {
      path: '/demographics-occupation',
      redirect: '/test/demographics-occupation'
    },
    {
      path: '/ai-priorities',
      redirect: '/test/ai-priorities'
    },
    {
      path: '/describe-ai',
      redirect: '/test/describe-ai'
    },
    {
      path: '/completed',
      redirect: '/test/completed'
    },
    {
      path: '/summary',
      redirect: '/test/summary'
    }
  ]
})



// Navigation guard to sync route with store and extract event parameter
router.beforeEach((to) => {
  const surveyStore = useSurveyStore()
  
  // Extract event parameter from route
  const eventParam = to.params.event as string
  if (eventParam) {
    surveyStore.setEventContext(eventParam)
  }
  
  // Find step index by path pattern (remove event parameter for matching)
  const pathWithoutEvent = to.path.replace(`/${eventParam}`, '')
  const stepIndex = surveyStore.steps.findIndex(step => step.path === pathWithoutEvent)
  if (stepIndex !== -1) {
    surveyStore.goToStep(stepIndex)
  }
})

export default router
