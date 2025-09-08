<template>
  <button
    @click="$emit('click')"
    class="w-full text-left px-4 py-3 text-sm font-medium text-primary-400 hover:text-primary-500 hover:bg-background-light rounded-lg transition-colors duration-200"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()

defineEmits<{
  click: []
}>()
</script>
