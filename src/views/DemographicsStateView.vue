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
          class="btn-go-back"
        >
          Voltar
        </button>

        <button
          @click="proceed"
          :disabled="!canProceed"
          class="btn-proceed"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import { useSurveyStore } from '@/stores/survey'
import { useSurveyNavigation } from '@/composables/useSurveyNavigation'

const surveyStore = useSurveyStore()
const { goBack, proceed: navigateNext } = useSurveyNavigation()

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

function proceed() {
  if (canProceed.value) {
    saveDemographics()
    navigateNext()
  }
}
</script>
