<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-8 text-center leading-snug">
      Em qual dessas direções você esperaria que o Brasil tivesse avançado no uso da IA?
    </h2>
    <br>
    <br>

  
    <div class="flex items-start justify-center gap-6 mb-6">
      <!-- Caixa A + contador -->
      <div class="flex flex-col items-center flex-1">
        <button
          @click="selectOption(currentPair.optionA.value)"
          class="flex-1 max-w-[45%] p-6 border rounded-lg cursor-pointer select-none text-center transition break-words bg-gray-100 border-gray-300 hover:bg-gray-200"
        >
          {{ currentPair.optionA.label }}
        </button>
        <div class="text-sm text-gray-500 mt-2 self-start">
          {{ currentIndex + 1 }}/{{ pairs.length }}
        </div>
      </div>

      <!-- Texto "ou" -->
      <div class="flex items-center justify-center text-gray-600 font-semibold select-none text-lg pt-6">
        ou
      </div>

      <!-- Caixa B -->
      <div class="flex flex-col items-center flex-1">
        <button
          @click="selectOption(currentPair.optionB.value)"
          class="flex-1 max-w-[45%] p-6 border rounded-lg cursor-pointer select-none text-center transition break-words bg-gray-100 border-gray-300 hover:bg-gray-200"
        >
          {{ currentPair.optionB.label }}
        </button>
      </div>
    </div>

    <!-- Botão Pular -->
<div class="flex flex-col items-center gap-4 mb-6">
  <button
    v-if="currentIndex < pairs.length - 1"
    @click="skip"
    class="px-4 py-2 text-gray-600 hover:text-gray-900 cursor-pointer"
  >
    Pular
  </button>

  <button
    v-if="currentIndex === pairs.length - 1"
    @click="proceed"
    class="btn-proceed"
  >
    Continuar
  </button>
</div>



    <!-- Botão Voltar -->
    <div class="flex justify-start">
      <button
        @click="goBack"
        class="btn-go-back"
      >
        Voltar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSurveyStore } from '@/stores/survey'
import { useSurveyNavigation } from '@/composables/useSurveyNavigation'

const surveyStore = useSurveyStore()
const { goBack, proceed: navigateNext } = useSurveyNavigation()

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
const currentPair = computed(() => pairs[currentIndex.value])

function selectOption(value: string) {
  saveAnswer(value)

  if (currentIndex.value < pairs.length - 1) {
    currentIndex.value++
  } else {
    // Finalizou todas as perguntas
    navigateNext()
  }
}

function skip() {
  saveAnswer(null)
 
  if (currentIndex.value < pairs.length - 1) {
    currentIndex.value++
  } else {
    navigateNext()
  }
}

function saveAnswer(value: string | null) {
  // Cria uma cópia para evitar mutação direta
  const currentAnswers = Array.isArray(surveyStore.data.aiPriorities) ? [...surveyStore.data.aiPriorities] : []
  currentAnswers[currentIndex.value] = value
  surveyStore.updateData('aiPriorities', currentAnswers)
}

// For the manual proceed button (when on last question)
function proceed() {
  navigateNext()
}
</script>
