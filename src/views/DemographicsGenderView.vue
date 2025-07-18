<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-xl p-6 lg:p-8">
      <h2 class="text-2xl lg:text-3xl font-semibold text-primary mb-4 text-center">
        Informações Demográficas
      </h2>

      <div class="mb-8">
        <label class="block text-lg font-medium text-primary mb-4">
          Como você se identifica?
        </label>
        <br>
        <div class="space-y-3">
          <label
            v-for="option in genderOptions"
            :key="option.value"
            class="flex items-center space-x-3 text-sm text-gray-700"
          >
            <input
              type="radio"
              name="gender"
              :value="option.value"
              v-model="demographics.gender"
              @change="saveDemographics"
              class="form-radio h-4 w-4 text-primary"
            />&nbsp; &nbsp;
            <span>{{ option.label }}</span>
          </label>
        </div>
        <div v-if="demographics.gender === 'outro'" class="mt-4">
          <input
            type="text"
            v-model="demographics.customGender"
            @input="saveDemographics"
            placeholder="Descreva aqui"
            class="w-full p-2 border rounded-md"
          />
        </div>
      </div>
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
  gender: '',
  customGender: ''
})

const genderOptions = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'transgenero', label: 'Transgênero' },
  { value: 'nao-binario', label: 'Não binário' },
  { value: 'nao-informar', label: 'Prefiro não informar' },
  { value: 'outro', label: 'Prefiro descrever de outra forma' }
]

const canProceed = computed(() => {
  return demographics.gender !== '' && (
    demographics.gender !== 'outro' || demographics.customGender.trim() !== ''
  )
})

onMounted(() => {
  const savedDemographics = surveyStore.data.demographics || {}
  demographics.gender = savedDemographics.gender || ''
  demographics.customGender = savedDemographics.customGender || ''
})

function saveDemographics() {
  surveyStore.updateData('demographics', {
    gender: demographics.gender,
    customGender: demographics.gender === 'outro' ? demographics.customGender : ''
  })
}

function proceed() {
  if (canProceed.value) {
    saveDemographics()
    navigateNext()
  }
}
</script>
