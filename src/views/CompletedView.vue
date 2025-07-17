<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-8 text-center">
      <div class="mb-5">
        

      <!-- Ícone de sucesso (verde) reduzido -->

<br>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Questionário concluído!</h2>
        <br>
        <p class="text-lg text-gray-700 mb-6">
          Obrigado por participar do nosso questionário sobre o futuro da IA no Brasil. Suas respostas são valiosas para compreendermos as percepções sobre IA no país.
        </p>
      </div>
      
      <!--div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="text-xl font-semibold text-blue-900 mb-3">What happens next?</h3>
        <div class="text-blue-700 space-y-2">
          <p>• Your responses have been securely saved and anonymized</p>
          <p>• The data will be analyzed to understand AI perceptions across different groups</p>
          <p>• Results will be published in academic publications and reports</p>
          <p>• You can follow our research at Argos AI Brasil for updates</p>
        </div>
      </div-->

      <pre class="text-left text-xs bg-gray-100 p-4 rounded mt-4">
  {{ JSON.stringify(surveyStore.data, null, 2) }}
</pre>
      
      <div class="bg-gray-50 rounded-lg p-6 mb-8">
        
        <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          
         
          <div>
            <span class="font-medium">Completion Date:</span>
            {{ new Date().toLocaleDateString('pt-BR') }}
          </div>
          <!--div>
            <span class="font-medium">Response ID:</span>
            {{ responseId }}
          </div-->
        </div>
      </div>
      
     
      
      <div class="mt-8 pt-6 border-t border-gray-200">
        <p class="text-sm text-gray-500">
          Em caso de dúvidas sobre esta pesquisa, entre em contato:
          <a href="mailto:argosiabrasil@gmail.com" class="text-blue-600 hover:text-blue-800">
            argosiabrasil@gmail.com
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSurveyStore } from '@/stores/survey'

const router = useRouter()
const surveyStore = useSurveyStore()
const responseId = ref('')

onMounted(() => {
  // Generate a simple response ID for user reference
  responseId.value = Date.now().toString(36) + Math.random().toString(36).substr(2)
})



function downloadData() {
  const data = {
    responseId: responseId.value,
    completionDate: new Date().toISOString(),
    responses: surveyStore.data
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `argos-ai-survey-${responseId.value}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function restartSurvey() {
  if (confirm('Are you sure you want to restart the survey? This will clear all your current responses.')) {
    surveyStore.resetSurvey()
    router.push('/consent')
  }
}



function finishSurvey() {
  // pode salvar dados, finalizar etapas, etc.
  router.push('/summary')  // navega para a página de resumo
}
</script>
