<template>
  <div class="border border-primary-200 rounded-lg overflow-hidden">
    <button
      @click="$emit('toggle')"
      class="w-full px-4 py-4 bg-background hover:bg-background-light text-left flex items-center justify-between transition-colors duration-200"
    >
      <h3 class="text-lg font-medium text-primary-500">{{ title }}</h3>
      <svg
        :class="['w-5 h-5 text-primary-400 transition-transform duration-200', { 'rotate-180': isOpen }]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <Transition name="accordion">
      <div v-if="isOpen" class="px-4 pb-4 bg-background">
        <div class="pt-2 border-t border-primary-200">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  isOpen: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
