<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Lista de Filmes</h2>
      <span class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300">
      Total: {{ filmes.length }} filmes
    </span>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="filmes.length === 0" class="bg-gray-50 dark:bg-gray-700 rounded-xl p-12 text-center">
      <Film class="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhum filme cadastrado</h3>
      <p class="text-gray-500 dark:text-gray-400">Adicione um novo filme usando o formulário acima.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FilmeCard
          v-for="filme in filmes"
          :key="filme.id"
          :filme="filme"
          @delete="deleteFilme"
          @edit="editFilme"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import FilmeCard from './molecules/FilmeCard.vue'
import { Film } from 'lucide-vue-next'

export default {
  name: 'FilmeList',
  components: {
    FilmeCard,
    Film
  },
  setup() {
    const filmes = ref([])
    const loading = ref(true)

    const fetchFilmes = async () => {
      try {
        loading.value = true
        const response = await api.get('/filmes')
        filmes.value = response.data
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      } finally {
        loading.value = false
      }
    }

    const deleteFilme = async (id) => {
      if (confirm('Tem certeza que deseja excluir este filme?')) {
        try {
          await api.delete(`/filmes/${id}`)
          filmes.value = filmes.value.filter(filme => filme.id !== id)
        } catch (error) {
          console.error('Erro ao deletar filme:', error)
        }
      }
    }

    const editFilme = (id) => {
      // Implement edit functionality
      console.log('Editar filme:', id)
    }

    onMounted(fetchFilmes)

    return {
      filmes,
      loading,
      deleteFilme,
      editFilme,
      fetchFilmes
    }
  }
}
</script>