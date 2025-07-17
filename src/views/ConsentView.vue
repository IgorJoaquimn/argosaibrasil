<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-background rounded-xl p-6 lg:p-8">
      <h1 class="text-2xl lg:text-3xl font-semibold text-primary-500 mb-6">
        Termo de Consentimento
      </h1>
      
      <!-- Consent Text Box -->
      <div class="mb-8">
        <div class="bg-background-light border border-primary-200 rounded-lg p-4 h-80 overflow-y-auto">
          <div class="text-primary-500 leading-relaxed space-y-4">
            <p class="font-semibold text-lg">Seja bem-vindo(a)!</p>
            
            <p>Esta pesquisa está sendo realizada por pesquisadores do Departamento de Ciência da Computação da Universidade Federal de Minas Gerais (UFMG) e visa entender melhor as percepções da comunidade acadêmica sobre a inteligência artificial.</p>
            
            <p>A sua participação consiste em responder a um questionário anônimo, com perguntas sobre sua opinião, experiências e percepções relacionadas ao tema.</p>
            
            <p class="font-medium">Ao participar, você está de acordo com os seguintes pontos:</p>
            
            <ul class="space-y-3 pl-4">
              <li class="flex items-start">
                <span class="text-primary-400 mr-2 mt-1">•</span>
                <span>A participação é voluntária e você pode interromper o preenchimento a qualquer momento ou pular qualquer pergunta que não quiser responder.</span>
              </li>
              
              <li class="flex items-start">
                <span class="text-primary-400 mr-2 mt-1">•</span>
                <span>Nenhum dado pessoal será coletado. As respostas serão usadas somente para fins de pesquisa acadêmica, e sempre de forma anônima e agregada.</span>
              </li>
              
              <li class="flex items-start">
                <span class="text-primary-400 mr-2 mt-1">•</span>
                <span>Todos os dados serão tratados de forma segura e em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</span>
              </li>
              
              <li class="flex items-start">
                <span class="text-primary-400 mr-2 mt-1">•</span>
                <span>Os resultados poderão ser utilizados em análises, relatórios e publicações científicas.</span>
              </li>
              
              <li class="flex items-start">
                <span class="text-primary-400 mr-2 mt-1">•</span>
                <span>Esta é uma pesquisa de opinião pública com participantes não identificáveis, e por isso está dispensada de avaliação pelo Comitê de Ética, conforme a Resolução CNS nº 510/2016, o Ofício Circular nº 17/2022/CONEP/SECNS/MS, e o artigo 26 da Resolução CNS nº 674/2022.</span>
              </li>
            </ul>
            
            <p>Em caso de dúvidas, você pode entrar em contato com a equipe de pesquisa pelo e-mail: <a href="mailto:argosia@dcc.ufmg.br" class="text-primary-600 hover:text-primary-700 underline">argosia@dcc.ufmg.br</a>.</p>
            
            <p class="font-semibold">Muito obrigado(a) pela sua colaboração!</p>
          </div>
        </div>
      </div>
      
      <!-- Consent Checkbox -->
      <div class="flex items-center justify-center space-x-4 w-full mb-10">
        <input 
          id="consent" 
          v-model="agreed" 
          type="checkbox" 
          class="w-5 h-5 text-primary-500 bg-background border-primary-300 rounded focus:ring-primary-500 focus:ring-2 focus:ring-offset-0 mt-0.5"
        >
        <label for="consent" class="ml-3 text-primary-500 leading-relaxed">
          Concordo em participar desta pesquisa e consinto com a coleta e uso dos meus dados 
          conforme descrito acima.
        </label>
      </div>
      
      <!-- Action Button -->
      <div class="flex justify-center w-full">
        <button 
          @click="proceed" 
          :disabled="!agreed"
          class="px-8 py-3 bg-primary-500 rounded-lg font-medium hover:bg-primary-600 disabled:bg-primary-200 disabled:text-primary-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
        >
          Continuar para a Pesquisa
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'
import AccordionItem from '@/components/AccordionItem.vue'

const router = useRouter()
const surveyStore = useSurveyStore()
const agreed = ref(false)

const openSections = ref({
  collect: false,
  rights: false,
  data: false
})

onMounted(() => {
  agreed.value = surveyStore.data.consentTerms || false
})

function toggleSection(section: keyof typeof openSections.value) {
  openSections.value[section] = !openSections.value[section]
}

function proceed() {
  if (agreed.value) {
    surveyStore.updateData('consentTerms', true)
    surveyStore.nextStep()
    router.push('/context')
  }
}
</script>
