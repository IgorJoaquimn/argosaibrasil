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
      <br>
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

      <div class="flex justify-end mt-6">
        <button
          @click="proceed"
          :disabled="!canProceed"
          class="px-6 py-3 rounded-lg font-medium text-white transition-colors"
          :class="canProceed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'"
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
  age: ''
})

const canProceed = computed(() => demographics.age !== '')

const ageOptions = [
  { value: '18-', label: 'Abaixo de 18 anos' },
  { value: '18-24', label: '18-24 anos' },
  { value: '25-34', label: '25-34 anos' },
  { value: '35-44', label: '35-44 anos' },
  { value: '45-54', label: '45-54 anos' },
  { value: '55-64', label: '55-64 anos' },
  { value: '65+', label: '65+ anos' },
  { value: 'nao-informar', label: 'Prefiro não informar' }
]

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
    router.push('/demographics-gender') // ou qualquer rota desejada
  }
}





</script>
