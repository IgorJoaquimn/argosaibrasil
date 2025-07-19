<template>
  <header class="w-full bg-background border-b border-primary-500">
    <div class="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      <div class="flex items-center justify-between w-full py-4">
        <!-- Logo + Title Section (Left) -->
        <div class="flex items-center" style="gap: 1rem;">
         
          <img alt="Argos IA Brasil" src="@/assets/logo_argos.png" class="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-25 lg:h-25 object-contain flex-shrink-0" />
        <h1 class="flex-1 text-xl sm:text-3xl lg:text-3xl font-semibold text-primary-500 break-words">

          Argos IA Brasil
          </h1>
        </div>
        <!-- Navigation Section (Right) -->
        <nav class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <button
            @click="handleAbandon"
            class="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Desistir
          </button>
          <button
            @click="handleFinish"
            class="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 hover:border-primary-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Finalizar
          </button>
        </nav>
      </div>
    </div>
  </header>

  <!-- Confirmation Dialog for Abandon -->
  <div v-if="showAbandonDialog" class="fixed inset-0 blur-overlay flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-md mx-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Confirmar Desistência</h3>
      <p class="text-gray-600 mb-6">
        Tem certeza que deseja desistir da pesquisa? Todos os seus dados serão apagados.
      </p>
      <div class="flex gap-3 justify-end">
        <button
          @click="showAbandonDialog = false"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Cancelar
        </button>
        <button
          @click="confirmAbandon"
          class="px-4 py-2 text-sm font-medium text-white bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 transition-colors duration-200"
        >
          Sim, desistir
        </button>
      </div>
    </div>
  </div>

  <!-- Confirmation Dialog for Finish -->
  <div v-if="showFinishDialog" class="fixed inset-0 blur-overlay flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-md mx-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Finalizar Pesquisa</h3>
      <p class="text-gray-600 mb-6">
        Tem certeza que deseja finalizar a pesquisa agora? Seus dados atuais serão salvos como incompletos.
      </p>
      <div class="flex gap-3 justify-end">
        <button
          @click="showFinishDialog = false"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Cancelar
        </button>
        <button
          @click="confirmFinish"
          class="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Sim, finalizar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

const router = useRouter()
const surveyStore = useSurveyStore()

const showAbandonDialog = ref(false)
const showFinishDialog = ref(false)

function handleAbandon() {
  showAbandonDialog.value = true
}

function handleFinish() {
  showFinishDialog.value = true
}

async function confirmAbandon() {
  try {
    await surveyStore.abandonSurvey()
    showAbandonDialog.value = false
    // Navigate to the initial consent page
    router.push('/completed')
  } catch (error) {
    console.error('Error abandoning survey:', error)
    // Optionally show an error message to the user
  }
}

async function confirmFinish() {
  try {
    await surveyStore.finishIncomplete()
    showFinishDialog.value = false
    // Navigate to the completed page
    router.push('/completed')
  } catch (error) {
    console.error('Error finishing survey:', error)
    // Optionally show an error message to the user
  }
}
</script>

<style scoped>
.blur-overlay {
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
