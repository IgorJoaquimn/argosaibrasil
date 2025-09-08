<template>
  <div class="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow">
    <h2 class="text-3xl font-bold mb-6 text-center">Resumo das suas respostas</h2>

    <div v-if="Object.keys(surveyData).length === 0" class="text-center text-gray-500">
      Nenhuma resposta salva ainda.
    </div>

    <div v-else class="space-y-4">
      <div v-for="(value, key) in surveyData" :key="key" class="border rounded p-4">
        <h3 class="font-semibold capitalize mb-2">{{ formatKey(key) }}</h3>

        <pre class="whitespace-pre-wrap text-sm text-gray-700">
          {{ formatValue(value) }}
        </pre>
      </div>
    </div>

    <div class="mt-8 flex justify-center gap-4">
      <button @click="restartSurvey" class="px-6 py-3 bg-gray-200 rounded hover:bg-gray-300">
        Reiniciar Pesquisa
      </button>
    </div>
  </div>

<button
  @click="resetSurveyAndReload"
  class="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
>
  Resetar formulário
</button>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

const surveyStore = useSurveyStore()
const router = useRouter()

const surveyData = computed(() => surveyStore.data || {})

function formatKey(key: string) {
  // Exemplo simples para deixar as chaves mais legíveis
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

function formatValue(value: any) {
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2)
  }
  return value || 'Não informado'
}

function restartSurvey() {
  if (confirm('Deseja reiniciar a pesquisa? Isso apagará suas respostas atuais.')) {
    surveyStore.resetSurvey()
    router.push('/consent')
  }
}

function resetForm() {
  surveyStore.$reset()
  router.push('/') // ou qualquer rota inicial do seu formulário
}

function resetSurveyAndReload() {
  surveyStore.resetSurvey()
  location.reload() // força recarregar tudo e ir para o começo
}

</script>
