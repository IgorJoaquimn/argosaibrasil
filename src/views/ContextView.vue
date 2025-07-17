<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
        Setores Impactados pela IA
      </h2>

      <p class="text-gray-700 mb-6 text-center">
        Na sua opinião, quais setores serão mais transformados pela IA no Brasil nos próximos 10 anos?<br />
        <span class="text-sm text-gray-500">(Marque de 1 a 3 opções)</span>
      </p>
      <br>

      <!-- Tabela para as opções -->
      <table class="w-full mb-6 table-fixed border-collapse">
  <tbody>
    <tr v-for="(pair, index) in contextPairs" :key="index">
      <td class="py-2 pr-4">
        <div class="flex items-center space-x-3">
          <input
            type="checkbox"
            :id="pair[0].value"
            :value="pair[0].value"
            v-model="selectedContexts"
            class="w-5 h-5 text-blue-600 border-gray-300 rounded"
            :disabled="
              !selectedContexts.includes(pair[0].value) && selectedContexts.length >= 3
            "
          /> &nbsp;
          <label
            :for="pair[0].value"
            class="text-gray-800 text-base cursor-pointer select-none"
          >
            {{ pair[0].title }}
          </label>
        </div>
      </td>
      <td v-if="pair[1]" class="py-2 pl-4">
        <div class="flex items-center space-x-3">
          <input
            type="checkbox"
            :id="pair[1].value"
            :value="pair[1].value"
            v-model="selectedContexts"
            class="w-5 h-5 text-blue-600 border-gray-300 rounded"
            :disabled="
              !selectedContexts.includes(pair[1].value) && selectedContexts.length >= 3
            "
          /> &nbsp;
          <label
            :for="pair[1].value"
            class="text-gray-800 text-base cursor-pointer select-none"
          >
            {{ pair[1].title }}
          </label>
        </div>
      </td>
      <td v-else></td>
    </tr>
  </tbody>
</table>
<!-- Campo "Outros" aparece somente se checkbox "outros" estiver marcado -->
<div v-if="selectedContexts.includes('outros')" class="mb-6">
  <label
    for="outro-text"
    class="block mb-2 text-gray-800 font-medium"
  >
    Por favor, especifique:
  </label>
  <input
    id="outro-text"
    v-model="otherText"
    type="text"
    placeholder="Descreva aqui"
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
<br>
      <div class="flex justify-between mt-6">
        <button
          @click="goBack"
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Voltar
        </button>

        <button
          @click="proceed"
          :disabled="selectedContexts.length === 0 || selectedContexts.length > 3"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

const router = useRouter()
const surveyStore = useSurveyStore()

const selectedContexts = ref<string[]>([])
const otherText = ref('')

const contexts = [
  { value: 'economia', title: 'Economia' },
  { value: 'educacao', title: 'Educação' },
  { value: 'saude', title: 'Saúde' },
  { value: 'ciencia', title: 'Avanços científicos' },
  { value: 'direitos', title: 'Direitos humanos e aspectos sociais' },
  { value: 'politica', title: 'Política' },
  { value: 'entretenimento', title: 'Entretenimento' },
  { value: 'justica', title: 'Justiça e segurança pública' },
  { value: 'meio_ambiente', title: 'Meio ambiente' },
  { value: 'transporte', title: 'Transporte e mobilidade' },
  { value: 'agricultura', title: 'Agricultura' },
  { value: 'outros', title: 'Outros' }

]

// Divide o array em pares para 2 colunas
const contextPairs = computed(() => {
  const pairs = []
  for (let i = 0; i < contexts.length; i += 2) {
    pairs.push([contexts[i], contexts[i + 1]])
  }
  return pairs
})

onMounted(() => {
  selectedContexts.value = surveyStore.data.selectedSectors || []
  otherText.value = surveyStore.data.otherSector || ''
})

function goBack() {
  surveyStore.previousStep()
  router.push('/consent')
}

function proceed() {
  if (selectedContexts.value.length > 0 && selectedContexts.value.length <= 3) {
    surveyStore.updateData('selectedSectors', selectedContexts.value)
    if (selectedContexts.value.includes('outros')) {
      surveyStore.updateData('otherSector', otherText.value)
    }
    surveyStore.nextStep()
    router.push('/receioesperanca')
  }
}
</script>
