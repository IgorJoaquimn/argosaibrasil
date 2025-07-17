<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Preocupações e Expectativas</h2>
      
      <!-- Seus receios -->
      <section class="mb-10">
        <h3 class="text-xl font-semibold text-gray-900 mb-2 text-left">Suas preocupações em relação à IA:</h3>
        <label for="fear-scale" class="block mb-1 text-gray-700 text-left">
          Em uma escala de 1 a 5, quanto você se sente preocupado(a) com os riscos da IA?
        </label>
        <input 
          id="fear-scale" 
          type="range" 
          min="1" max="5" step="1" 
          v-model="fearScale"
          class="w-full"
          @input="saveFears"
        />
        <div class="grid grid-cols-5 justify-between text-sm text-gray-600 mt-1 px-1 select-none">
          <span class="text-center">1</span>
          <span class="text-center">2</span>
          <span class="text-center">3</span>
          <span class="text-center">4</span>
          <span class="text-center">5</span>
        </div>

<!-- Textos abaixo dos números -->
<div class="grid grid-cols-5 text-[0.7rem] text-gray-500 mt-1 px-1 select-none">
  <span class="text-center">Sem receio nenhum</span>
  <span></span>
  <span></span>
  <span></span>
  <span class="text-center">Muito receoso(a)</span>
</div> <br>
        <textarea
          v-model="fearText"
          @input="saveFears"
          rows="4"
          placeholder="O que mais te preocupa na IA?"
          class="mt-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
      </section>

      <br>
      
      
      <section>
        <h3 class="text-xl font-semibold text-gray-900 mb-2 text-left">Suas esperanças em relação à IA:</h3>
        <label for="hope-scale" class="block mb-1 text-gray-700 text-left">
          Em uma escala de 1 a 5, quanto você se sente otimista sobre os benefícios da IA?
        </label>
        <input 
          id="hope-scale" 
          type="range" 
          min="1" max="5" step="1" 
          v-model="hopeScale"
          class="w-full"
          @input="saveHopes"
        />
       <div class="grid grid-cols-5 justify-between text-sm text-gray-600 mt-1 px-1 select-none">
  <span class="text-center">1</span>
  <span class="text-center">2</span>
  <span class="text-center">3</span>
  <span class="text-center">4</span>
  <span class="text-center">5</span>
</div>

<!-- Textos abaixo dos números -->
<div class="grid grid-cols-5 text-[0.7rem] text-gray-500 mt-1 px-1 select-none">
  <span class="text-center">Sem esperança alguma</span>
  <span></span>
  <span></span>
  <span></span>
  <span class="text-center">Cheio(a) de esperança</span>
</div>
        <br>
        <textarea
          v-model="hopeText"
          @input="saveHopes"
          rows="4"
          placeholder="O que mais te dá esperança em relação à IA?"
          class="mt-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
      </section>

     <!-- Botões -->
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

const router = useRouter()
const surveyStore = useSurveyStore()

const fearScale = ref(3)
const hopeScale = ref(3)
const fearText = ref('')
const hopeText = ref('')



onMounted(() => {
  const data = surveyStore.data.receiosEesperancas || {}
  fearScale.value = data.fearScale ?? 3
  hopeScale.value = data.hopeScale ?? 3
  fearText.value = data.receios || ''
  hopeText.value = data.esperancas || ''
})





function saveFears() {
  const current = surveyStore.data.receiosEesperancas || {}
  surveyStore.updateData('receiosEesperancas', { ...current, receios: fearText.value, fearScale: fearScale.value })
}

function saveHopes() {
  const current = surveyStore.data.receiosEesperancas || {}
  surveyStore.updateData('receiosEesperancas', { ...current, esperancas: hopeText.value, hopeScale: hopeScale.value })
}


const canProceed = computed(() => {
  return fearText.value.trim().length > 0 || hopeText.value.trim().length > 0
})

function goBack() {
  surveyStore.previousStep()
  router.push('/impact')
}

function proceed() {
  if(canProceed.value){
    surveyStore.nextStep()
    router.push('/demographics')
  }
}




</script>

<style scoped>
/* Estilização customizada do slider */

input[type='range'] {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #d1d5db; /* cinza claro */
  outline: none;
  margin-top: 4px;
  margin-bottom: 4px;
  cursor: pointer;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #2563eb; /* azul */
  cursor: pointer;
  margin-top: -7px; /* alinhar no centro da barra */
  transition: background-color 0.3s ease;
}

input[type='range']::-webkit-slider-thumb:hover {
  background: #1d4ed8;
}

input[type='range']::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

input[type='range']::-moz-range-thumb:hover {
  background: #1d4ed8;
}
</style>
