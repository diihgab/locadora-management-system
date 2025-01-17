<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Lista de Filmes</h2>
    <div v-if="loading" class="text-center py-4">
      <p class="text-gray-600">Carregando filmes...</p>
    </div>
    <div v-else-if="filmes.length === 0" class="text-center py-12 bg-white rounded-lg shadow-md">
      <p class="text-gray-500 text-lg">Nenhum filme cadastrado</p>
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

export default {
  name: 'FilmeList',
  components: {
    FilmeCard
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
      editFilme
    }
  }
}
</script>