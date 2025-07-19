<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
        Setores Impactados pela IA
      </h2>

      <p class="text-gray-700 mb-6 text-center">
        Na sua opinião, <span
                style="font-weight: 700;">quais setores serão mais transformados pela IA no Brasil</span> nos próximos 10 anos?<br />
        <span class="text-sm text-gray-500">(Marque de 1 a 3 opções)</span>
      </p>

      

      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-6">
        <div
          v-for="(context, index) in contexts"
          :key="index"
          class="flex items-start gap-2"
        >
          <input
            type="checkbox"
            :id="context.value"
            :value="context.value"
            v-model="selectedContexts"
            :checked="selectedContexts.includes(context.value)"
            @change="(e) => toggleCheckbox(context.value, e.target.checked)"
            class="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded"/>
          <label
            :for="context.value"
            class="text-gray-800 text-base cursor-pointer select-none break-words"
          >
            {{ context.title }}
          </label>
        </div>
      </div>

      <!-- Campo "Outros" aparece somente se checkbox "outros" estiver marcado -->
      <div v-if="selectedContexts.includes('outros')" class="mb-6">
        <label
          for="outro-text"
          class="block mb-2 text-gray-800 font-medium"
        >
          Por favor, especifique:
        </label>
        <input
          id="outro-text"
          v-model="otherText"
          type="text"
          placeholder="Descreva aqui"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="flex justify-between mt-6">
        <button @click="handleGoBack" class="btn-go-back">Voltar</button>
        <button @click="proceed" class="btn-proceed">Continuar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useSurveyStore } from '@/stores/survey'
import { useSurveyNavigation } from '@/composables/useSurveyNavigation'

const surveyStore = useSurveyStore()
const { goBack, proceed: navigateNext } = useSurveyNavigation()

const selectedContexts = ref<string[]>([])
const otherText = ref('')



onMounted(() => {
  // Garante que selectedContexts seja array simples, convertendo Proxy se necessário
  if (surveyStore.data.selectedSectors) {
    const stored = surveyStore.data.selectedSectors
    selectedContexts.value = Array.isArray(stored)
      ? [...stored]
      : Object.values(stored)
  } else {
    selectedContexts.value = []
  }

  if (surveyStore.data.otherSector) {
    otherText.value = surveyStore.data.otherSector
  }
})




// Atualiza o store quando selectedContexts muda
watch(selectedContexts, (newVal) => {
  surveyStore.updateData('selectedSectors', newVal)
}, { deep: true, flush: 'sync' })

// Atualiza o store quando otherText muda, só se 'outros' estiver selecionado
watch(otherText, (newVal) => {
  if (selectedContexts.value.includes('outros')) {
    surveyStore.updateData('otherSector', newVal)
  }
}, { flush: 'sync' })


const contexts = [
  { value: 'economia', title: 'Economia' },
  { value: 'educacao', title: 'Educação' },
  { value: 'saude', title: 'Saúde' },
  { value: 'ciencia', title: 'Avanços científicos' },
  { value: 'politica', title: 'Política' },
  { value: 'entretenimento', title: 'Entretenimento'},
  { value: 'agricultura', title: 'Agricultura' },
  { value: 'meio_ambiente', title: 'Meio ambiente' },
  { value: 'justica', title: 'Justiça e segurança pública' },
  { value: 'transporte', title: 'Transporte e mobilidade' },
  { value: 'direitos', title: 'Direitos humanos e aspectos sociais' },
  { value: 'outros', title: 'Outros' }
]

//const safeSelectedContexts = computed(() => 
  //Array.isArray(selectedContexts.value) ? selectedContexts.value : []
//)

//const canProceed = computed(() => selectedContexts.value.length <= 3)

function toggleCheckbox(value: string, checked: boolean) {
  if (checked) {
    if (selectedContexts.value.length < 3 && !selectedContexts.value.includes(value)) {
      selectedContexts.value.push(value)
    }
  } else {
    const index = selectedContexts.value.indexOf(value)
    if (index !== -1) {
      selectedContexts.value.splice(index, 1)
    }
  }
}


function proceed() {
  // salva manualmente ANTES de navegar
  surveyStore.updateData('selectedSectors', selectedContexts.value)
  surveyStore.updateData('otherSector', otherText.value)
  navigateNext()
  //console.log('Selected Sectors in store:', surveyStore.data.selectedSectors)
  
}

function handleGoBack() {
  surveyStore.updateData('selectedSectors', selectedContexts.value)
  surveyStore.updateData('otherSector', otherText.value)
  goBack()  // chama a função importada para navegar
}

</script>
