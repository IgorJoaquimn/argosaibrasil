// Survey related type definitions

export interface ReceiosEsperancas {
  receios?: string
  esperancas?: string
  fearScale?: number
  hopeScale?: number
}

export interface Demographics {
  age?: string
  gender?: string
  customGender?: string
  state?: string
  occupation?: string
  profession?: string
  otherProfession?: string
}

export interface PageTimestamp {
  firstVisit: string
  lastVisit: string
  visitCount: number
  totalTimeSpent?: number // in milliseconds
}

export interface SurveyData {
  consentTerms?: boolean
  selectedContext?: string
  impactSector?: string
  receiosEesperancas?: ReceiosEsperancas
  aiDescription?: string
  demographics?: Demographics
  aiPriorities?: (string | null | undefined)[]
  aiPrioritiesIndex: number
  aiPrioritiesReturnFromNextStep: boolean
  selectedSectors: string[]
  otherSector: string
  desistiu?: boolean
  incompleto?: boolean
  pairs?: (string | null | undefined)[]
  pageTimestamps?: {
    [pageName: string]: PageTimestamp
  }
  eventContext?: string
}

// Dialog related types
export interface DialogState {
  show: boolean
  title: string
  message: string
  confirmText: string
  cancelText: string
  type: 'danger' | 'primary' | 'warning'
}

// Navigation types
export type EventContext = 'test' | 'production' | 'development'

// Common button types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}
