<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen transition-colors duration-300">
    <div class="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 animate-gradient">
      <nav class="bg-white dark:bg-gray-800 shadow-md">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
            Sistema de Gerenciamento de Locadora
          </h1>
          <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            <Sun v-if="isDarkMode" class="w-6 h-6 text-yellow-400" />
            <Moon v-else class="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </nav>

      <main class="container mx-auto px-6 py-8">
        <div class="grid gap-8">
          <section class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Adicionar Filme</h2>
            <FilmeForm @submitted="refreshList" />
          </section>

          <section class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <FilmeList ref="filmeList" />
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import FilmeForm from '@/components/FilmeForm.vue'
import FilmeList from '@/components/FilmeList.vue'
import { Sun, Moon } from 'lucide-vue-next'

export default {
  name: 'App',
  components: {
    FilmeForm,
    FilmeList,
    Sun,
    Moon
  },
  setup() {
    const isDarkMode = ref(false)
    const filmeList = ref(null)

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
      localStorage.setItem('darkMode', isDarkMode.value)
    }

    const refreshList = () => {
      filmeList.value.fetchFilmes()
    }

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
      isDarkMode.value = true
    }

    return {
      isDarkMode,
      toggleDarkMode,
      refreshList,
      filmeList
    }
  }
}
</script>

<style>
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>