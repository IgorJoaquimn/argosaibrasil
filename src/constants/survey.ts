// Survey related constants

export const SURVEY_STEPS = [
  'consent',
  'context', 
  'impact',
  'receio-esperanca',
  'describe-ai',
  'demographics',
  'demographics-gender',
  'demographics-occupation',
  'demographics-state',
  'ai-priorities',
  'summary'
] as const

export const CONTEXTS = [
  { value: 'economia', title: 'Economia' },
  { value: 'educacao', title: 'Educação' },
  { value: 'saude', title: 'Saúde' },
  { value: 'ciencia', title: 'Avanços científicos' },
  { value: 'politica', title: 'Política' },
  { value: 'entretenimento', title: 'Entretenimento'},
  { value: 'agricultura', title: 'Agricultura' },
  { value: 'meio_ambiente', title: 'Meio ambiente' },
  { value: 'justica', title: 'Justiça e segurança pública' },
  { value: 'transporte', title: 'Transporte e mobilidade' },
  { value: 'direitos', title: 'Direitos humanos e aspectos sociais' },
  { value: 'outros', title: 'Outros' }
] as const

export const IMPACT_SECTORS = [
  'Muito Positivo',
  'Positivo',
  'Neutro',
  'Negativo',
  'Muito Negativo'
] as const

export const AGE_OPTIONS = [
  { value: '18-', label: 'Abaixo de 18 anos' },
  { value: '18-24', label: '18-24 anos' },
  { value: '25-34', label: '25-34 anos' },
  { value: '35-44', label: '35-44 anos' },
  { value: '45-54', label: '45-54 anos' },
  { value: '55-64', label: '55-64 anos' },
  { value: '65+', label: '65+ anos' },
  { value: 'nao-informar', label: 'Prefiro não informar' }
] as const

export const GENDER_OPTIONS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'transgenero', label: 'Transgênero' },
  { value: 'nao-binario', label: 'Não binário' },
  { value: 'nao-informar', label: 'Prefiro não informar' },
  { value: 'outro', label: 'Prefiro descrever de outra forma' }
] as const

export const OCCUPATION_CATEGORIES = [
  { value: 'graduacao', label: 'Estudante de graduação' },
  { value: 'posgraduacao', label: 'Estudante de pós-graduação' },
  { value: 'docente', label: 'Docente' },
  { value: 'pesquisador', label: 'Pesquisador(a)' },
  { value: 'tecnico_cientifico', label: 'Profissional técnico/científico' },
  { value: 'outro', label: 'Outro' },
  { value: 'nao_informar', label: 'Prefiro não informar' }
] as const

export const BRAZILIAN_STATES = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
  { value: 'nao-informar', label: 'Prefiro não informar' }
] as const

// Type definitions
export type SurveyStep = typeof SURVEY_STEPS[number]
export type Context = typeof CONTEXTS[number]
export type ImpactSector = typeof IMPACT_SECTORS[number]
export type AgeOption = typeof AGE_OPTIONS[number]
export type GenderOption = typeof GENDER_OPTIONS[number]
export type OccupationCategory = typeof OCCUPATION_CATEGORIES[number]
export type BrazilianState = typeof BRAZILIAN_STATES[number]
