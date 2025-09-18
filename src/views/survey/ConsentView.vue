<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
    <!-- Título -->
    <h1 class="text-xl font-bold text-primary-500 text-center">
      Termo de Consentimento
    </h1>

    <!-- Bem-vindo -->
    <p class="text-primary-500 font-medium mb-4 text-center">
      Seja bem-vindo(a)!
    </p>

    <!-- Sobre a pesquisa -->
    <div class="bg-white shadow rounded-lg p-4 text-primary-500 space-y-2">
      <p>
        Pesquisa realizada por pesquisadores do <strong>DCC/UFMG</strong> sobre <strong>percepções da comunidade acadêmica</strong> em inteligência artificial.
      </p>
      <p>
        Participação: responder a um <strong>questionário anônimo</strong> sobre sua <strong>opinião, experiências e percepções</strong> relacionadas a IA.
      </p>
      <p>
        As respostas serão utilizadas <strong>somente para fins de pesquisa acadêmica</strong>.
      </p>
      <p class="font-medium text-primary-600">
        ⏱️ Duração: <strong>cerca de 5 minutos</strong>.
      </p>
    </div>

    <!-- Pontos essenciais -->
    <div class="bg-primary-50 border-l-4 border-primary-500 rounded-lg p-4 text-primary-500 space-y-1">
      <p class="font-medium">
        Ao participar, <strong>você concorda com:</strong>
      </p>
      <ul class="list-disc pl-6 space-y-1">
        <li><strong>A participação é voluntária</strong>, podendo interromper ou pular perguntas.</li>
        <li><strong>O questionário é anônimo</strong>, sem coleta de dados pessoais.</li>
        <li>Os resultados poderão ser utilizados em <strong>análises, relatórios e publicações científicas</strong>.</li>
      </ul>
    </div>

    <!-- Ética e confidencialidade -->
    <div class="bg-white shadow rounded-lg p-4 text-primary-500 space-y-1">
      <p>
        Todos os dados serão tratados de forma segura e conforme a <strong>LGPD (Lei nº 13.709/2018)</strong>.
      </p>

      <p>
        Esta é uma <strong>pesquisa de opinião pública, com participantes não identificáveis</strong>, e por isso está dispensada de avaliação pelo Comitê de Ética (Resolução CNS nº 510/2016, Ofício Circular nº 17/2022, Art. 26 da Resolução CNS nº 674/2022).
      </p>
    </div>

    <!-- Contato -->
    <div class="bg-white shadow rounded-lg p-4 text-primary-500">
     <p>
        Em caso de dúvidas, você pode entrar em contato pelo e-mail: <a href="mailto:argosiabrasil@gmail.com" class="text-primary-600 hover:text-primary-700 underline">argosiabrasil@gmail.com</a>
      </p>
    </div>

    <!-- Checkbox de consentimento -->
    <div class="flex items-center">
      <input id="consent" v-model="agreed" type="checkbox" class="w-5 h-5 text-primary-500 bg-background border-primary-300 rounded focus:ring-primary-500 focus:ring-2 focus:ring-offset-0 mt-0.5">
      <label for="consent" class="ml-3 text-primary-500 leading-relaxed">
        Concordo em participar desta pesquisa e aceito responder ao questionário.
      </label>
    </div>

    <!-- Botão de prosseguir -->
    <div class="flex justify-center w-full">
    <button @click="proceed" :disabled="!agreed"
          class="btn-proceed flex items-center whitespace-nowrap justify-center">
          Participar da pesquisa
          <svg class="w-4 h-4 ml-2" fill="none" stroke="white" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSurveyStore } from '@/stores/survey'
import { useSurveyNavigation } from '@/composables/useSurveyNavigation'

const surveyStore = useSurveyStore()
const { proceed: navigateNext } = useSurveyNavigation()
const agreed = ref(false)

const openSections = ref({
  collect: false,
  rights: false,
  data: false
})

onMounted(() => {
  agreed.value = surveyStore.data.consentTerms || false
})

function toggleSection(section: keyof typeof openSections.value) {
  openSections.value[section] = !openSections.value[section]
}

function proceed() {
  if (agreed.value) {
    surveyStore.updateData('consentTerms', true)
    navigateNext()
  }
}
</script>


