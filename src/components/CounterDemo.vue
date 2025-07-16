<template>
  <div class="counter-demo">
    <h3>Persistent Counter Demo</h3>
    <p>Current count: <strong>{{ store.count }}</strong></p>
    <p>Double count: <strong>{{ store.doubleCount }}</strong></p>
    <div class="buttons">
      <button @click="store.increment">+1</button>
      <button @click="store.decrement">-1</button>
      <button @click="resetCounter">Reset</button>
    </div>
    <p class="info">
      <small>This counter value persists when you refresh the page!</small>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

function resetCounter() {
  store.count = 0
}
</script>

<style scoped>
.counter-demo {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
}

.buttons {
  margin: 15px 0;
}

.buttons button {
  margin: 0 5px;
  padding: 8px 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.buttons button:hover {
  background: #369870;
}

.info {
  color: #666;
  margin-top: 15px;
}
</style>
