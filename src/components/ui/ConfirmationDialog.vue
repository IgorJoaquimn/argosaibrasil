<template>
  <Teleport to="body">
    <div 
      v-if="show" 
      class="fixed inset-0 blur-overlay flex items-center justify-center z-50"
      @click.self="emit('cancel')"
    >
      <div class="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ title }}
        </h3>
        <p class="text-gray-600 mb-6">
          {{ message }}
        </p>
        <div class="flex gap-3 justify-end">
          <button
            @click="emit('cancel')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {{ cancelText }}
          </button>
          <button
            @click="emit('confirm')"
            :class="confirmButtonClasses"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  show: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'primary' | 'warning'
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  type: 'primary'
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const confirmButtonClasses = computed(() => {
  const baseClasses = 'text-white border focus:ring-2 focus:ring-offset-2'
  
  switch (props.type) {
    case 'danger':
      return `${baseClasses} bg-red-600 border-red-600 hover:bg-red-700 focus:ring-red-500`
    case 'warning':
      return `${baseClasses} bg-yellow-600 border-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500`
    case 'primary':
    default:
      return `${baseClasses} bg-primary-600 border-primary-600 hover:bg-primary-700 focus:ring-primary-500`
  }
})
</script>

<style scoped>
.blur-overlay {
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
