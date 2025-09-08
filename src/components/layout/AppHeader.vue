<template>
  <header class="w-full bg-background border-b border-primary-500">
    <div class="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      <div class="flex items-center justify-between w-full py-4">
        <!-- Logo + Title Section (Left) -->
        <div class="flex items-center" style="gap: 1rem;">
         
          <img alt="Argos IA Brasil" src="@/assets/logo_argos.png" class="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-25 lg:h-25 object-contain flex-shrink-0" />
        <h1 class="flex-1 text-xl sm:text-3xl lg:text-3xl font-semibold text-primary-500 break-words">
          {{ headerTitle }}
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

  <!-- Confirmation Dialogs -->
  <ConfirmationDialog
    :show="abandonDialog.show"
    :title="abandonDialog.title"
    :message="abandonDialog.message"
    :confirm-text="abandonDialog.confirmText"
    :cancel-text="abandonDialog.cancelText"
    :type="abandonDialog.type"
    @confirm="confirmAbandon"
    @cancel="hideAbandon"
  />

  <ConfirmationDialog
    :show="finishDialog.show"
    :title="finishDialog.title"
    :message="finishDialog.message"
    :confirm-text="finishDialog.confirmText"
    :cancel-text="finishDialog.cancelText"
    :type="finishDialog.type"
    @confirm="confirmFinish"
    @cancel="hideFinish"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'
import { useEventNavigation } from '@/composables/useEventNavigation'
import { useDialog } from '@/composables/useDialog'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog.vue'

const router = useRouter()
const surveyStore = useSurveyStore()
const { getCurrentEventContext } = useEventNavigation()
const { 
  abandonDialog, 
  finishDialog, 
  showAbandon, 
  showFinish, 
  hideAbandon, 
  hideFinish 
} = useDialog()

// Compute the header title based on event context
const headerTitle = computed(() => {
  const eventContext = getCurrentEventContext()
  
  switch (eventContext) {
    case 'test':
      return 'Argos IA Brasil (Rodando em teste)'
    default:
      return 'Argos IA Brasil'
  }
})

function handleAbandon() {
  showAbandon()
}

function handleFinish() {
  showFinish()
}

async function confirmAbandon() {
  try {
    await surveyStore.abandonSurvey()
    hideAbandon()
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
    hideFinish()
    // Navigate to the completed page
    router.push('/completed')
  } catch (error) {
    console.error('Error finishing survey:', error)
    // Optionally show an error message to the user
  }
}
</script>


