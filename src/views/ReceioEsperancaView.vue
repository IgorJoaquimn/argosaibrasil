

<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Preocupações e Expectativas</h2>

  
      
      <!-- Seus receios -->
      <section class="mb-10">
        <h3 class="text-xl font-semibold text-gray-900 mb-2 text-left">Suas preocupações em relação à IA:</h3>
        <label for="fear-scale" class="block mb-1 text-gray-700 text-left">
          Em uma escala de 0 a 10, quanto você se <span style="font-weight: 700;">sente preocupado(a) </span> com os riscos da IA?
        </label>

        <input id="fear-scale" type="range" min="0" max="10" step="1" v-model="fearScale" class="w-full" @input="saveFears"/>
      
        <div class="flex justify-between text-sm text-gray-500 mt-1 select-none border-t pt-1">
          <span>0</span>
          <span>10</span>
        </div>

  <div class="w-full mt-2 flex items-center justify-between text-sm text-gray-700">
  <span class="text-left">Nenhuma preocupação</span>
  <span class="text-lg font-bold text-blue-700 bg-gray-100 px-3 py-1 rounded shadow text-center">{{ fearScale }}</span>
  <span class="text-right">Extremamente preocupado(a)</span>
</div>


<!-- Textos abaixo dos números -->
      <label for="fear-Text" class="block mb-1 text-gray-700 text-left">
         O que mais te <span style="font-weight: 700;">preocupa</span> em relação à IA?
        </label>

        <textarea
          v-model="fearText"
          @input="saveFears"
          rows="4"
          placeholder="O que mais te preocupa na IA?"
          class="mt-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
      </section>

   
      
      
      <section>
        <h3 class="text-xl font-semibold text-gray-900 mb-2 text-left">Suas esperanças em relação à IA:</h3>
        <label for="hope-scale" class="block mb-1 text-gray-700 text-left">
          Em uma escala de 0 a 10, quanto você se <span style="font-weight: 700;">sente otimista</span> sobre os benefícios da IA?
        </label>
        <input 
          id="hope-scale" 
          type="range" 
          min="0" max="10" step="1" 
          v-model="hopeScale"
          class="w-full"
          @input="saveHopes"
        />

        <div class="flex justify-between text-sm text-gray-500 mt-1 select-none border-t pt-1">
          <span>0</span>
          <span>10</span>
        </div>

        <div class="w-full mt-2 flex items-center justify-between text-sm text-gray-700">
          <span class="text-left">Nada otimista</span>
          <span class="text-lg font-bold text-blue-700 bg-gray-100 px-3 py-1 rounded shadow text-center">{{ hopeScale }}</span>
          <span class="text-right">Muito otimista</span>
        </div>


      <br>

        <!-- Textos abaixo dos números -->
        
        <label for="hopeText" class="block mb-1 text-gray-700 text-left">
          O que mais te deixa <span style="font-weight: 700;">otimista</span> em relação à IA?
        </label>
        <textarea
          v-model="hopeText"
          @input="saveHopes"
          rows="4"
          placeholder="O que mais te dá esperança em relação à IA?"
          class="mt-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
      </section>

   

     <!-- Botões -->
      <div class="flex justify-between mt-6">
        <button @click="goBackHandler" class="btn-go-back">Voltar</button>
        <button @click="proceed" class="btn-proceed">Continuar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'
import { useSurveyNavigation } from '@/composables/useSurveyNavigation'

const surveyStore = useSurveyStore()
const { goBack, proceed: navigateNext } = useSurveyNavigation()
const route = useRoute()

const fearScale = ref(0)
const hopeScale = ref(0)
const fearText = ref('')
const hopeText = ref('')

function loadData() {
  const data = surveyStore.data.receiosEesperancas || {}
  fearScale.value = typeof data.fearScale === 'number' ? data.fearScale : 0
  hopeScale.value = typeof data.hopeScale === 'number' ? data.hopeScale : 0
  fearText.value = data.receios || ''
  hopeText.value = data.esperancas || ''
  console.log(fearScale.value, hopeScale.value)
}

onMounted(() => {
  loadData()
})

watch(() => route.fullPath, () => {
  loadData()
})


function saveFears() {
  const current = surveyStore.data.receiosEesperancas || {}
  const newData = { 
    ...current, 
    receios: fearText.value, 
    fearScale: Number(fearScale.value)  // forçar número
  }
  surveyStore.updateData('receiosEesperancas', newData)
  console.log('Salvando receios:', newData)
 
}

function saveHopes() {
  const current = surveyStore.data.receiosEesperancas || {}
  const newData = { 
    ...current, 
    esperancas: hopeText.value, 
    hopeScale: Number(hopeScale.value)  // forçar número
  }
  surveyStore.updateData('receiosEesperancas', newData)
  console.log('Salvando esperancas:', newData)
 
}


//const canProceed = computed(() => {
  //return fearText.value.trim().length > 0 || hopeText.value.trim().length > 0
//})

function proceed() {
  //if(canProceed.value){
    navigateNext()
  //}
}

function goBackHandler() {
  goBack()
}


</script>

<style scoped>
/* Estilização customizada do slider */

input[type='range'] {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #d1d5db;
  outline: none;
  margin-top: 4px;
  margin-bottom: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
  margin-top: -7px;
  transition: background-color 0.3s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(37,99,235,0.15);
}
input[type='range']:active::-webkit-slider-thumb {
  background: #1d4ed8;
  box-shadow: 0 4px 12px rgba(37,99,235,0.25);
}
input[type='range']::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(37,99,235,0.15);
}
input[type='range']:active::-moz-range-thumb {
  background: #1d4ed8;
  box-shadow: 0 4px 12px rgba(37,99,235,0.25);
}
input[type='range']::-ms-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(37,99,235,0.15);
}
input[type='range']:active::-ms-thumb {
  background: #1d4ed8;
  box-shadow: 0 4px 12px rgba(37,99,235,0.25);
}
input[type='range']:focus {
  outline: none;
  box-shadow: 0 0 0 2px #2563eb44;
}
</style>
