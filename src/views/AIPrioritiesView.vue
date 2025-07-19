<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl lg:text-3xl font-semibold text-primary text-center">
      Em qual dessas direções você esperaria que <span
                style="font-weight: 700;">o Brasil tivesse avançado</span> no uso da IA daqui a 10 anos?
    </h2>
    <br>
    <p class="text-gray-600 text-sm mb-4">
  Clique em uma das caixas abaixo para indicar sua preferência.
</p>
    <br>




    <!--div class="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-6 mb-2 items-stretch"-->
    <div class="relative grid grid-cols-2 gap-4 sm:gap-6 mb-2">
     
      <!-- Caixa A + contador -->
      <!--div class="flex flex-col"-->
      
     <button 
          @click="selectOption(currentPair.optionA.value)"
          :class="['min-h-[96px] w-full py-4 px-3 border rounded-lg cursor-pointer select-none text-center transition text-sm sm:text-base flex items-center justify-center text-wrap whitespace-normal',
          aiPriorities[currentIndex] === currentPair.optionA.value
          ? 'bg-blue-100 border-blue-500'
          : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
          ]">
  {{ currentPair.optionA.label }}
</button>

  
       <button 
          @click="selectOption(currentPair.optionB.value)"
          :class="['min-h-[96px] w-full py-4 px-3 border rounded-lg cursor-pointer select-none text-center transition text-sm sm:text-base flex items-center justify-center text-wrap whitespace-normal',
          aiPriorities[currentIndex] === currentPair.optionB.value
          ? 'bg-blue-100 border-blue-500'
          : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
          ]">
  {{ currentPair.optionB.label }}
</button>


         

   
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-600 font-semibold text-sm sm:text-base pointer-events-none">ou</div>
        
</div>


  <div class="text-xs sm:text-sm text-gray-500 mt-2 text-left">
      {{ currentIndex + 1 }}/{{ pairs.length }}
  </div>


    
    <div class="flex flex-wrap justify-between gap-2 sm:gap-4 mt-4">

    <!-- Botão Voltar -->
      <button
        @click="goBack"
        class="flex-1 basis-[48%] sm:basis-auto sm:max-w-[140px] bg-gray-200 text-gray-700 rounded-md font-medium transition-colors duration-150 border-none cursor-pointer hover:bg-gray-300 py-3 px-6 text-sm"
        @mouseover="(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'"
        @mouseout="(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'">
        Voltar
      </button>

  


    <!-- Botão Pular  (somente até o último par E se ainda não respondeu) -->
    <button 
    v-if="currentPending"
    @click="skip"
    :disabled="currentIndex === pairs.length -1 && currentAnswered"
    class="flex-1 basis-[48%] sm:basis-auto sm:max-w-[140px] text-gray-200 text-gray-700 rounded-md font-medium transition-colors duration-150 border-none cursor-pointer hover:bg-gray-300 py-3 px-6 text-sm">
    
      Pular
    </button>

   

   <!-- Botão Continuar  -->
  <button
    v-if="currentAnswered"
    @click="proceed"
    :disable='!canProceed'
    class="flex-1 basis-[48%] sm:basis-auto sm:max-w-[140px] text-sm"
    :style="canProceed ? activeStyle : disabledStyle"
    >
    Continuar
  </button>

  </div>
</div>


   



   
 
</template>

<script setup lang="ts">

import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'
import { useSurveyNavigation } from '@/composables/useSurveyNavigation'

const surveyStore = useSurveyStore()
const { goBack:goBackStep, proceed: navigateNext } = useSurveyNavigation()
const router = useRouter()
const route = useRoute()

const canProceed = computed(() => currentAnswered.value) // ou allAnswered.value, dependendo da lógica desejada


const activeStyle = {
  padding: '0.75rem 1.5rem',
  color: 'white',
  borderRadius: '0.5rem',
  fontWeight: 500,
  transition: 'background-color 0.15s ease-in-out',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: 'var(--primary-green)',
}

const disabledStyle = {
  padding: '0.75rem 1.5rem',
  color: 'white',
  borderRadius: '0.5rem',
  fontWeight: 500,
  border: 'none',
  cursor: 'not-allowed',
  backgroundColor: '#8fae9f',
}


const aiPriorities = computed(() => 
  Array.isArray(surveyStore.data.aiPriorities)
    ? surveyStore.data.aiPriorities
    : []
)


// Pares fixos por ora, depois pode vir do banco
const pairs = [
  {
    optionA: { label: 'Promover inclusão social com IA', value: 'inclusao_social' },
    optionB: { label: 'Evitar que a IA aprofunde desigualdades', value: 'evitar_desigualdades' }
  },
  {
    optionA: { label: 'Fomentar inovação tecnológica', value: 'fomentar_inovacao' },
    optionB: { label: 'Garantir segurança e privacidade', value: 'seguranca_privacidade' }
  },
  {
    optionA: { label: 'Ampliar acesso à educação com IA', value: 'acesso_educacao' },
    optionB: { label: 'Reduzir viés e discriminação em sistemas de IA', value: 'reduzir_vies' }
  },
  {
    optionA: { label: 'Promover sustentabilidade ambiental', value: 'sustentabilidade' },
    optionB: { label: 'Manter controle humano sobre decisões importantes', value: 'controle_humano' }
  },
  {
    optionA: { label: 'Expandir uso de IA na saúde pública', value: 'ia_saude_publica' },
    optionB: { label: 'Evitar dependência excessiva de tecnologia', value: 'evitar_dependencia' }
  }
]

const currentIndex = ref(0)

// Inicializa array de respostas e índice no store se necessário
onMounted(() => {
  console.log('onMounted: route.query.index=', route.query.index)
  console.log('onMounted: aiPrioritiesReturnFromNextStep=', surveyStore.data.aiPrioritiesReturnFromNextStep)
  console.log('onMounted: aiPrioritiesIndex before logic=', surveyStore.data.aiPrioritiesIndex)


  const storedAnswers = Array.isArray(surveyStore.data.aiPriorities)
    ? surveyStore.data.aiPriorities
    : []
  const returnFromNext = surveyStore.data.aiPrioritiesReturnFromNextStep
  let indexToStart = 0

  if (route.query.index) {
    const queryIndex = Number(route.query.index)
    if (!isNaN(queryIndex) && queryIndex >= 0 && queryIndex < pairs.length) {
      indexToStart = queryIndex
    }
  } else if (returnFromNext) {
    // Se a flag está ativa, volta para o índice salvo no store
    indexToStart = surveyStore.data.aiPrioritiesIndex ?? pairs.length - 1
    // Reseta a flag para evitar loop infinito
    surveyStore.updateData('aiPrioritiesReturnFromNextStep', false)
  } else {
    // Caso normal: vai para o primeiro índice incompleto ou zero
    const firstIncompleteIndex = storedAnswers.findIndex(a => a === undefined)
    indexToStart = firstIncompleteIndex !== -1 ? firstIncompleteIndex : 0
  }

  surveyStore.updateData('aiPrioritiesIndex', indexToStart)
  currentIndex.value = indexToStart

})

watch(
  () => route.query.index,
  (newIndex) => {
    if (newIndex !== undefined) {
      const indexNumber = Number(newIndex)
      if (!isNaN(indexNumber) && indexNumber >= 0 && indexNumber < pairs.length) {
        currentIndex.value = indexNumber
        surveyStore.updateData('aiPrioritiesIndex', indexNumber)
      }
    }
  }
)


watch(currentIndex, (newIndex) => {
  if (newIndex >= 0 && newIndex < pairs.length) {
    surveyStore.updateData('aiPrioritiesIndex', newIndex)
  }
})


const currentPair = computed(() => pairs[currentIndex.value])

// Verifica se a pergunta atual foi respondida (null é válido, undefined não)
const currentAnswered = computed(() => {
  const answers = surveyStore.data.aiPriorities
  return Array.isArray(answers) && answers[currentIndex.value] !== undefined
})

// Verifica se todas as perguntas têm resposta (null ou string, mas não undefined)
const allAnswered = computed(() => {
  const answers = surveyStore.data.aiPriorities
  return Array.isArray(answers) 
  && answers.length === pairs.length 
  && answers.every(a => a !== undefined)
})

const currentPending = computed(() => {
  const answers = surveyStore.data.aiPriorities
  if (!Array.isArray(answers)) return true
  return answers[currentIndex.value] === undefined
})



function saveAnswer(value: string | null) {
  console.log('Saving:', value)
  const currentAnswers = Array.isArray(surveyStore.data.aiPriorities) 
  ? [...surveyStore.data.aiPriorities] 
  : Array(pairs.length).fill(undefined)

  currentAnswers[currentIndex.value] = value
  surveyStore.updateArrayData('aiPriorities', currentAnswers)
}


function selectOption(value: string) {
  console.log('Option selected:', value)
  saveAnswer(value)
  if (currentIndex.value < pairs.length - 1) 
    currentIndex.value++
}  
  

function skip() {
  saveAnswer('skipped')
  if (currentIndex.value < pairs.length - 1) 
    currentIndex.value++
}  


function proceed() {
  if (allAnswered.value){
    surveyStore.updateData('aiPrioritiesIndex', currentIndex.value)
    navigateNext()
  }
}


function goBack() {
  const currentIdx = surveyStore.data.aiPrioritiesIndex ?? 0
  console.log('goBack: aiPrioritiesIndex=', currentIdx)
  
  if (currentIdx > 0) {
    const prevIdx = currentIdx - 1
    surveyStore.updateData('aiPrioritiesIndex', prevIdx)
    surveyStore.updateData('aiPrioritiesReturnFromNextStep', true)
    router.push({ path: '/ai-priorities', query: { index: prevIdx } })
  } else {
    // Aqui navega para a página anterior do survey
    // Exemplo fixo, altere conforme sua navegação real:
    router.push('/demographics-occupation')
  }

 
}



</script>
