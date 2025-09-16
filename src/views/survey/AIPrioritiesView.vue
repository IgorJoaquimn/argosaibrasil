<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl lg:text-3xl font-semibold text-primary text-center">
      Em qual dessas direções você esperaria que <span style="font-weight: 700;">o Brasil tivesse avançado</span> no uso da IA daqui a 10 anos?
    </h2>
    <br />
    <p class="text-gray-600 text-sm mb-4">
      Clique em uma das caixas abaixo para indicar sua preferência.
    </p>
    <br />

    <div class="relative grid grid-cols-2 gap-4 sm:gap-6 mb-2" v-if="currentPair">
      <button
        @click="selectOption(currentPair.optionA.value)"
        :class="[
          'min-h-[96px] w-full py-4 px-3 border rounded-lg cursor-pointer select-none text-center transition text-sm sm:text-base flex items-center justify-center text-wrap whitespace-normal',
          aiPriorities[currentIndex] === currentPair.optionA.value
            ? 'bg-blue-100 border-blue-500'
            : 'bg-gray-100 border-gray-300 hover:bg-gray-200',
        ]"
      >
        {{ currentPair.optionA.label }}
      </button>

      <button
        @click="selectOption(currentPair.optionB.value)"
        :class="[
          'min-h-[96px] w-full py-4 px-3 border rounded-lg cursor-pointer select-none text-center transition text-sm sm:text-base flex items-center justify-center text-wrap whitespace-normal',
          aiPriorities[currentIndex] === currentPair.optionB.value
            ? 'bg-blue-100 border-blue-500'
            : 'bg-gray-100 border-gray-300 hover:bg-gray-200',
        ]"
      >
        {{ currentPair.optionB.label }}
      </button>

      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-600 font-semibold text-sm sm:text-base pointer-events-none"
      >
        ou
      </div>
    </div>

    <div v-else>
      <p class="text-center text-gray-500 py-4">Carregando pares de opções...</p>
    </div>

    <div class="text-xs sm:text-sm text-gray-500 mt-2 text-left">
      <template v-if="pairs.length > 0">
        {{ currentIndex + 1 }}/{{ pairs.length }}
      </template>
      <template v-else>
        Carregando pares de opções...
      </template>
    </div>

    <div class="flex flex-wrap justify-between gap-2 sm:gap-4 mt-4">
      <!-- Botão Voltar -->
      <button
        @click="goBack"
        class="flex-1 basis-[48%] sm:basis-auto sm:max-w-[140px] bg-gray-200 text-gray-700 rounded-md font-medium transition-colors duration-150 border-none cursor-pointer hover:bg-gray-300 py-3 px-6 text-sm">
        Voltar
      </button>

      <!-- Botão Pular (somente até o último par e se ainda não respondeu) -->
      <button
        v-if="currentPending"
        @click="skip"
        :disabled="
          pairs.length === 0 ||
          (currentIndex === pairs.length - 1 && currentAnswered)
        "
        class="flex-1 basis-[48%] sm:basis-auto sm:max-w-[140px] text-gray-200 text-gray-700 rounded-md font-medium transition-colors duration-150 border-none cursor-pointer hover:bg-gray-300 py-3 px-6 text-sm"
      >
        Pular
      </button>

      <!-- Botão Continuar -->
      <button
        v-if="allAnswered && currentIndex === pairs.length - 1"
        @click="proceed"
        :disabled="!canProceed"
        class="flex-1 basis-[48%] sm:basis-auto sm:max-w-[140px] text-sm"
        :style="canProceed ? activeStyle : disabledStyle"
      >
        Continuar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSurveyStore } from '@/stores/survey'
import { useRouter, useRoute } from 'vue-router'
import { generateRandomPairs } from '@/utils/pairGenerator'
import hopesText from '@/assets/hopes.txt?raw'
import fearsText from '@/assets/fears.txt?raw'

const surveyStore = useSurveyStore()
const router = useRouter()
const route = useRoute()

function navigateNext() {
  router.push('/describe-ai') // substitua pela rota correta
}

const pairs = ref<any[]>([])
const currentIndex = ref(0)

// Guarda respostas localmente
const aiPriorities = ref<(string | null)[]>([])

const currentPair = computed(() => pairs.value[currentIndex.value] ?? null)

const currentAnswered = computed(() => {
  return aiPriorities.value[currentIndex.value] !== undefined && aiPriorities.value[currentIndex.value] !== null
})
const allAnswered = computed(() => {
  if (pairs.value.length === 0) return false
  return aiPriorities.value.length === pairs.value.length && aiPriorities.value.every((a: any) => a !== null && a !== undefined)
})
const currentPending = computed(() => {
  return aiPriorities.value[currentIndex.value] === null || aiPriorities.value[currentIndex.value] === undefined
})
const canProceed = computed(() => allAnswered.value)

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

function saveAnswer(value: string | null) {
  aiPriorities.value[currentIndex.value] = value
  surveyStore.updateData('aiPriorities', aiPriorities.value)
  console.log('Resposta salva:', value, 'para índice', currentIndex.value)
}

function selectOption(value: string) {
  saveAnswer(value)
  if (currentIndex.value < pairs.value.length - 1) {
    currentIndex.value++
    surveyStore.updateData('aiPrioritiesIndex', currentIndex.value)
  }
}

function skip() {
  saveAnswer('skipped')
  if (currentIndex.value < pairs.value.length - 1) {
    currentIndex.value++
    surveyStore.updateData('aiPrioritiesIndex', currentIndex.value)
  }
}

function proceed() {
  if (canProceed.value) {
    surveyStore.updateData('aiPrioritiesIndex', currentIndex.value)
    navigateNext()
    //alert('Continuar para próxima etapa!') 
    // Coloque aqui sua lógica de navegação
  }
}





function goBack() {
  if (currentIndex.value > 0) {
    // Go back to previous pair
    currentIndex.value--
    // Update store with current index
    surveyStore.updateData('aiPrioritiesIndex', currentIndex.value)
  } else {
    // Go to previous page in survey
    router.push('/demographics-occupation')
  }
}

onMounted(() => {
  const hopes = hopesText.split('\n').map(line => line.trim()).filter(Boolean)
  const fears = fearsText.split('\n').map(line => line.trim()).filter(Boolean)

  // Generate pairs (check if they already exist in store first)
  if (surveyStore.data.pairs && surveyStore.data.pairs.length > 0) {
    pairs.value = surveyStore.data.pairs
  } else {
    const userId = surveyStore.getOrCreateUserId()
    pairs.value = generateRandomPairs(hopes, fears, 5, userId)
    surveyStore.updateData('pairs', pairs.value)
  }

  // Initialize answers array
  if (surveyStore.data.aiPriorities && surveyStore.data.aiPriorities.length > 0) {
    aiPriorities.value = surveyStore.data.aiPriorities.map((item: any) => item ?? null)
  } else {
    aiPriorities.value = Array(pairs.value.length).fill(null)
  }

  // Set current index from route query, store, or default to 0
  const queryIndex = route.query.index ? parseInt(route.query.index as string) : null
  const storeIndex = surveyStore.data.aiPrioritiesIndex ?? 0
  
  currentIndex.value = queryIndex !== null ? queryIndex : storeIndex
  
  // Ensure currentIndex is within valid bounds
  if (currentIndex.value >= pairs.value.length) {
    currentIndex.value = pairs.value.length - 1
  }
  if (currentIndex.value < 0) {
    currentIndex.value = 0
  }
  
  // Update store with current index
  surveyStore.updateData('aiPrioritiesIndex', currentIndex.value)
})
</script>

<style scoped>
:root {
  --primary-green: #2a9d8f;
}
</style>
