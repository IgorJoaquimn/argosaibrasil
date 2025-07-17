<template>
  <div class="max-w-3xl mx-auto text-center">
    <div class="bg-white rounded-xl border border-border-light p-8 lg:p-12">
      <div class="mb-8">
        <div class="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
        </div>
        
        <h2 class="text-3xl lg:text-4xl font-bold text-primary mb-4">
          Bem-vindo à Pesquisa Argos IA Brasil
        </h2>
        
        <p class="text-lg text-text-secondary leading-relaxed mb-8">
          Esta pesquisa tem como objetivo compreender percepções, esperanças e preocupações 
          sobre a inteligência artificial no Brasil. Sua participação é muito importante 
          para entendermos melhor como a sociedade brasileira vê a IA.
        </p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="text-center p-4">
          <div class="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="font-semibold text-primary mb-1">5-10 minutos</h3>
          <p class="text-sm text-text-secondary">Tempo estimado</p>
        </div>
        
        <div class="text-center p-4">
          <div class="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <h3 class="font-semibold text-primary mb-1">Anônimo</h3>
          <p class="text-sm text-text-secondary">Dados protegidos</p>
        </div>
        
        <div class="text-center p-4">
          <div class="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <h3 class="font-semibold text-primary mb-1">Voluntário</h3>
          <p class="text-sm text-text-secondary">Participação livre</p>
        </div>
      </div>
      
      <div class="space-y-4">
        <button 
          @click="startSurvey"
          class="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 text-lg"
        >
          Iniciar Pesquisa
        </button>
        
        <p class="text-sm text-text-muted">
          Ao continuar, você concorda com os termos de consentimento
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

const router = useRouter()
const surveyStore = useSurveyStore()

function startSurvey() {
  surveyStore.resetSurvey()
  router.push('/consent')
}
</script>
