<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-2">
        <label for="titulo" class="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
            type="text"
            id="titulo"
            v-model="form.titulo"
            required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
            placeholder="Nome do filme"
        >
      </div>

      <div class="space-y-2">
        <label for="genero" class="block text-sm font-medium text-gray-700">
          Gênero
        </label>
        <input
            type="text"
            id="genero"
            v-model="form.genero"
            required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
            placeholder="Ex: Ação, Comédia, Drama"
        >
      </div>

      <div class="space-y-2">
        <label for="anoLancamento" class="block text-sm font-medium text-gray-700">
          Ano de Lançamento
        </label>
        <input
            type="number"
            id="anoLancamento"
            v-model="form.anoLancamento"
            required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
            placeholder="Ex: 2025"
        >
      </div>

      <div class="space-y-2">
        <label for="status" class="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
            id="status"
            v-model="form.status"
            required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
        >
          <option value="disponível">Disponível</option>
          <option value="alugado">Alugado</option>
        </select>
      </div>
    </div>

    <div class="flex justify-end">
      <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
        <span>{{ isEditing ? 'Atualizar' : 'Adicionar' }}</span>
      </button>
    </div>
  </form>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

export default {
  name: 'FilmeForm',
  props: {
    filmeId: {
      type: Number,
      default: null
    }
  },
  setup(props, { emit }) {
    const form = ref({
      titulo: '',
      genero: '',
      anoLancamento: null,
      status: 'disponível'
    })
    const isEditing = ref(false)
    const loading = ref(false)

    onMounted(async () => {
      if (props.filmeId) {
        isEditing.value = true
        try {
          const response = await api.get(`/filmes/${props.filmeId}`)
          form.value = response.data
        } catch (error) {
          console.error('Erro ao buscar filme:', error)
        }
      }
    })

    const submitForm = async () => {
      try {
        loading.value = true
        if (isEditing.value) {
          await api.put(`/filmes/${props.filmeId}`, form.value)
        } else {
          await api.post('/filmes', form.value)
        }
        form.value = {
          titulo: '',
          genero: '',
          anoLancamento: null,
          status: 'disponível'
        }
        emit('submitted')
      } catch (error) {
        console.error('Erro ao salvar filme:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      isEditing,
      loading,
      submitForm
    }
  }
}
</script>