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
import { BRAZILIAN_STATES } from '@/constants/survey'

const surveyStore = useSurveyStore()
const { goBack, proceed: navigateNext } = useSurveyNavigation()

const demographics = reactive({
  state: ''
})

const estados = BRAZILIAN_STATES

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
