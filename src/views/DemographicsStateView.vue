<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-xl p-6 lg:p-8">
      <h2 class="text-2xl lg:text-3xl font-semibold text-primary mb-4 text-center">
        Informações Demográficas
      </h2>

      <div class="mb-8">
        <label class="block text-lg font-medium text-primary mb-4">
          Em que estado você reside?
        </label>
<br>
        <select
          v-model="demographics.state"
          @change="saveDemographics"
          class="w-full p-3 border rounded-md text-gray-700"
        >
          <option value="" disabled>Selecione um estado</option>
          <option v-for="estado in estados" :key="estado.value" :value="estado.value">
            {{ estado.label }}
          </option>
        </select>
      </div>
<br>
<br>
      <div class="flex justify-between">
        <button
          @click="goBack"
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Voltar
        </button>

        <button
          @click="proceed"
          :disabled="!canProceed"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

const router = useRouter()
const surveyStore = useSurveyStore()

const demographics = reactive({
  state: ''
})

const estados = [
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
]

const canProceed = computed(() => demographics.state !== '')

onMounted(() => {
  const saved = surveyStore.data.demographics || {}
  demographics.state = saved.state || ''
})

function saveDemographics() {
  surveyStore.updateData('demographics', {
    ...surveyStore.data.demographics,
    state: demographics.state
  })
}

function goBack() {
  surveyStore.previousStep()
  router.push('/demographics-gender') // ou a etapa anterior que você tiver
}

function proceed() {
  if (canProceed.value) {
    surveyStore.nextStep()
    router.push('/demographics-occupation') // ou a próxima etapa definida
  }
}
</script>
