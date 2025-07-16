 import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Example of a store with custom persistence configuration
export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const email = ref('')
  const preferences = ref({
    theme: 'light',
    language: 'en',
    notifications: true
  })
  
  const isLoggedIn = computed(() => name.value !== '')
  
  function login(userName: string, userEmail: string) {
    name.value = userName
    email.value = userEmail
  }
  
  function logout() {
    name.value = ''
    email.value = ''
  }
  
  function updatePreferences(newPrefs: Partial<typeof preferences.value>) {
    preferences.value = { ...preferences.value, ...newPrefs }
  }

  return { 
    name, 
    email, 
    preferences, 
    isLoggedIn, 
    login, 
    logout, 
    updatePreferences 
  }
}, {
  persist: {
    // Store only specific fields
    paths: ['name', 'email', 'preferences'],
    // Use sessionStorage instead of localStorage
    storage: sessionStorage,
    // Custom serializer (optional)
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  }
})
