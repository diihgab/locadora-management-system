<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">{{ filme.titulo }}</h3>

      <div class="space-y-3">
        <div class="flex items-center text-sm">
          <Film class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
          <span class="w-20 text-gray-500 dark:text-gray-400">Gênero:</span>
          <span class="text-gray-800 dark:text-gray-200">{{ filme.genero }}</span>
        </div>

        <div class="flex items-center text-sm">
          <Calendar class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
          <span class="w-20 text-gray-500 dark:text-gray-400">Ano:</span>
          <span class="text-gray-800 dark:text-gray-200">{{ filme.anoLancamento }}</span>
        </div>

        <div class="flex items-center text-sm">
          <Tag class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
          <span class="w-20 text-gray-500 dark:text-gray-400">Status:</span>
          <span
              :class="{
            'px-2 py-1 rounded-full text-xs font-medium': true,
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': filme.status === 'disponível',
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': filme.status === 'alugado'
          }"
          >
          {{ filme.status }}
        </span>
        </div>
      </div>

      <div class="mt-6 flex space-x-3">
        <button
            @click="$emit('edit', filme.id)"
            class="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
        >
          <Edit class="w-4 h-4 inline-block mr-1" /> Editar
        </button>
        <button
            @click="$emit('delete', filme.id)"
            class="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
        >
          <Trash2 class="w-4 h-4 inline-block mr-1" /> Excluir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Film, Calendar, Tag, Edit, Trash2 } from 'lucide-vue-next'

export default {
  name: 'FilmeCard',
  components: {
    Film,
    Calendar,
    Tag,
    Edit,
    Trash2
  },
  props: {
    filme: {
      type: Object,
      required: true
    }
  }
}
</script>