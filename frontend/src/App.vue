<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">
        Sistema de Gerenciamento de Locadora
      </h1>
      <FilmeForm @submitted="refreshList" />
      <FilmeList ref="filmeList" />
    </div>
  </div>
</template>

<script>
import FilmeForm from '@/components/FilmeForm.vue'
import FilmeList from '@/components/FilmeList.vue'

export default {
  name: 'App',
  components: {
    FilmeForm,
    FilmeList
  },
  methods: {
    refreshList() {
      this.$refs.filmeList.fetchFilmes()
    }
  }
}
</script>

<style>
@import './assets/tailwind.css';

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>