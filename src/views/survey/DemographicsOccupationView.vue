<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-xl p-6 lg:p-8">
      <h2 class="text-2xl lg:text-3xl font-semibold text-primary mb-4 text-center">
        Informações Demográficas
      </h2>

      <div class="mb-8">
        <label class="block text-lg font-medium text-primary mb-4">
          Qual a sua ocupação principal?
        </label>
  

        <div class="space-y-3">
          <label
            v-for="option in professionOptions"
            :key="option.value"
            class="flex items-center space-x-3 text-sm text-gray-700"
          > 
            <input
              type="radio"
              name="profession"
              :value="option.value"
              v-model="demographics.profession"
              @change="onProfessionChange"
              class="form-radio h-4 w-4 text-primary"
            /> &nbsp; &nbsp;
            <span>{{ option.label }}</span>
          </label>

          <!-- Campo aberto para "Outro" -->
          <div v-if="demographics.profession === 'outro'" class="mt-2">
            <input
              type="text"
              v-model="demographics.otherProfession"
              @input="saveDemographics"
              placeholder="Por favor, especifique"
              class="w-full p-3 border rounded-md text-gray-700"
            />
          </div>
        </div>
      </div>
<br><br>
      <div class="flex justify-between">
        <button @click="goBack" class="btn-go-back">Voltar </button>
        <button @click="proceed" :disabled="!canProceed" class="btn-proceed">Continuar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import { useSurveyStore } from '@/stores/survey'
import { useSurveyNavigation } from '@/composables/useSurveyNavigation'
import { OCCUPATION_CATEGORIES } from '@/constants/survey'

const surveyStore = useSurveyStore()
const { goBack, proceed: navigateNext } = useSurveyNavigation()

const demographics = reactive({
  profession: '',
  otherProfession: ''
})

const professionOptions = OCCUPATION_CATEGORIES

const canProceed = computed(() => {
  if (demographics.profession === 'outro') {
    return demographics.otherProfession.trim().length > 0
  }
  return demographics.profession !== ''
})

onMounted(() => {
  const saved = surveyStore.data.demographics || {}
  demographics.profession = saved.profession || ''
  demographics.otherProfession = saved.otherProfession || ''
})

function saveDemographics() {
  surveyStore.updateData('demographics', {
    ...surveyStore.data.demographics,
    profession: demographics.profession,
    otherProfession: demographics.otherProfession
  })
}

function onProfessionChange() {
  // Quando muda a profissão, resetar o texto aberto se não for "outro"
  if (demographics.profession !== 'outro') {
    demographics.otherProfession = ''
  }
  saveDemographics()
}

function proceed() {
  if (canProceed.value) {
    saveDemographics()
    navigateNext()
  }
}
</script>
