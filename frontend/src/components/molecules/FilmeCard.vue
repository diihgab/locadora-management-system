<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-102">
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ filme.titulo }}</h3>
      <div class="space-y-2">
        <p class="text-gray-600">
          <span class="font-medium">Gênero:</span> {{ filme.genero }}
        </p>
        <p class="text-gray-600">
          <span class="font-medium">Ano:</span> {{ filme.anoLancamento }}
        </p>
        <p class="flex items-center space-x-2">
          <span class="font-medium text-gray-600">Status:</span>
          <span
              :class="{
              'px-2 py-1 rounded-full text-sm font-medium': true,
              'bg-green-100 text-green-800': filme.status === 'disponível',
              'bg-red-100 text-red-800': filme.status === 'alugado'
            }"
          >
            {{ filme.status }}
          </span>
        </p>
      </div>
      <div class="mt-4 flex space-x-2">
        <button
            @click="$emit('edit', filme.id)"
            class="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Editar
        </button>
        <button
            @click="$emit('delete', filme.id)"
            class="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilmeCard',
  props: {
    filme: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>