// Application routes constants

export const ROUTES = {
  HOME: '/',
  CONSENT: '/consent',
  CONTEXT: '/context',
  IMPACT: '/impact',
  RECEIO_ESPERANCA: '/receio-esperanca',
  DESCRIBE_AI: '/describe-ai',
  DEMOGRAPHICS: '/demographics',
  DEMOGRAPHICS_GENDER: '/demographics/gender',
  DEMOGRAPHICS_OCCUPATION: '/demographics/occupation', 
  DEMOGRAPHICS_STATE: '/demographics/state',
  AI_PRIORITIES: '/ai-priorities',
  SUMMARY: '/summary',
  COMPLETED: '/completed'
} as const

export type RoutePath = typeof ROUTES[keyof typeof ROUTES]
