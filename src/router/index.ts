import { createRouter, createWebHistory } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'
import ConsentView from '@/views/ConsentView.vue'
import ContextView from '@/views/ContextView.vue'
import ImpactView from '@/views/ImpactView.vue'
import ReceioEsperancaView from '@/views/ReceioEsperancaView.vue'
import DescribeAIView from '@/views/DescribeAIView.vue'
import DemographicsView from '@/views/DemographicsView.vue'
import CompletedView from '@/views/CompletedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/consent'
    },
    {
      path: '/consent',
      name: 'consent',
      component: ConsentView
    },
    {
      path: '/context',
      name: 'context',
      component: ContextView
    },
    {
      path: '/impact',
      name: 'impact',
      component: ImpactView
    },
    {
      path: '/receioesperanca',
      name: 'receioesperanca',
      component: ReceioEsperancaView
    },
    {
      path: '/describe-ai',
      name: 'describe-ai',
      component: DescribeAIView
    },
    {
      path: '/demographics',
      name: 'demographics',
      component: DemographicsView
    },
    {
      path: '/completed',
      name: 'completed',
      component: CompletedView
    }
  ]
})

// Navigation guard to sync route with store
router.beforeEach((to) => {
  const surveyStore = useSurveyStore()
  const stepIndex = surveyStore.steps.findIndex(step => step.path === to.path)
  if (stepIndex !== -1) {
    surveyStore.goToStep(stepIndex)
  }
})

export default router
