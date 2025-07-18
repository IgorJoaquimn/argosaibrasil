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

      <!-- Lista em grade com dois checkboxes por linha -->
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
            class="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded"
            :disabled="!safeSelectedContexts.includes(context.value) && safeSelectedContexts.length >= 3"

          />
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
        <button @click="goBack" class="btn-go-back">Voltar</button>
        <button @click="proceed" :disabled="!canProceed" class="btn-proceed">Continuar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useSurveyStore } from '@/stores/survey'
import { useSurveyNavigation } from '@/composables/useSurveyNavigation'

const surveyStore = useSurveyStore()
const { goBack, proceed: navigateNext } = useSurveyNavigation()

const selectedContexts = ref<string[]>([])
const otherText = ref('')

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

const safeSelectedContexts = computed(() => 
  Array.isArray(selectedContexts.value) ? selectedContexts.value : []
)

const canProceed = computed(() => 
  selectedContexts.value.length > 0 && selectedContexts.value.length <= 3
)

onMounted(() => {
  // Só sobrescreve se ainda não estiver setado
  if (selectedContexts.value.length === 0 && Array.isArray(surveyStore.data.selectedSectors)) {
    selectedContexts.value = [...surveyStore.data.selectedSectors]
  }
  if (!otherText.value && typeof surveyStore.data.otherSector === 'string') {
    otherText.value = surveyStore.data.otherSector
  }
})

// Atualiza o store sempre que selectedContexts mudar
watch(selectedContexts, (newVal) => {
  if (JSON.stringify(newVal) !== JSON.stringify(surveyStore.data.selectedSectors)) {
    surveyStore.updateData('selectedSectors', newVal)
  }
}, { deep: true, flush: 'sync' })

// Atualiza o store com o texto dos "outros"
watch(otherText, (newVal) => {
  if (selectedContexts.value.includes('outros')) {
    surveyStore.updateData('otherSector', newVal)
  }
},{ flush: 'sync' })

function proceed() {
  // salva manualmente ANTES de navegar
  surveyStore.updateData('selectedSectors', selectedContexts.value)
  surveyStore.updateData('otherSector', otherText.value)
  navigateNext()
}

function goBackAndSave() {
  surveyStore.updateData('selectedSectors', selectedContexts.value)
  surveyStore.updateData('otherSector', otherText.value)
  goBack()
}

</script>
