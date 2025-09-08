import { ref } from 'vue'
import type { DialogState } from '@/types'

export function useDialog() {
  const showAbandonDialog = ref(false)
  const showFinishDialog = ref(false)

  const abandonDialog = ref<DialogState>({
    show: false,
    title: 'Confirmar Desistência',
    message: 'Tem certeza que deseja desistir da pesquisa? Todos os seus dados serão apagados.',
    confirmText: 'Sim, desistir',
    cancelText: 'Cancelar',
    type: 'danger'
  })

  const finishDialog = ref<DialogState>({
    show: false,
    title: 'Finalizar Pesquisa',
    message: 'Tem certeza que deseja finalizar a pesquisa agora? Seus dados atuais serão salvos como incompletos.',
    confirmText: 'Sim, finalizar',
    cancelText: 'Cancelar',
    type: 'primary'
  })

  function showAbandon() {
    abandonDialog.value.show = true
    showAbandonDialog.value = true
  }

  function showFinish() {
    finishDialog.value.show = true
    showFinishDialog.value = true
  }

  function hideAbandon() {
    abandonDialog.value.show = false
    showAbandonDialog.value = false
  }

  function hideFinish() {
    finishDialog.value.show = false
    showFinishDialog.value = false
  }

  return {
    // Dialog states
    showAbandonDialog,
    showFinishDialog,
    abandonDialog,
    finishDialog,
    
    // Dialog actions
    showAbandon,
    showFinish,
    hideAbandon,
    hideFinish
  }
}
