<!-- src/views/DemographicsAgeView.vue -->
<template>
  <div class="max-w-3xl mx-auto py-8">
    <div class="bg-white rounded-xl p-6 lg:p-8 shadow">
      <h2 class="text-2xl font-semibold text-center text-primary mb-6">
        Informações Demográficas
      </h2>

      <label class="block text-lg font-medium text-primary mb-4">
        Qual é a sua faixa etária?
      </label>
     
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <label
          v-for="option in ageOptions"
          :key="option.value"
          class="flex items-center space-x-3"
        >
          <input
            type="radio"
            name="age"
            v-model="demographics.age"
            :value="option.value"
            @change="saveDemographics"
            class="form-radio text-blue-600 h-4 w-4"
          />&nbsp; &nbsp;
          <span>{{ option.label }}</span>
        </label>
      </div>

      <div class="flex justify-between mt-6">
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
import { AGE_OPTIONS } from '@/constants/survey'

const surveyStore = useSurveyStore()
const { goBack, proceed: navigateNext } = useSurveyNavigation()

const demographics = reactive({
  age: ''
})

const canProceed = computed(() => demographics.age !== '')

const ageOptions = AGE_OPTIONS

onMounted(() => {
  const saved = surveyStore.data.demographics
  if (saved?.age) {
    demographics.age = saved.age
  }
})

function saveDemographics() {
  const currentDemo = surveyStore.data.demographics || {}
  surveyStore.updateData('demographics', { ...currentDemo, ...demographics })
}

function proceed() {
  if (canProceed.value) {
    saveDemographics()
    navigateNext()
  }
}
</script>
