<template>
  <div>
    <FilmeForm @submitted="fetchFilmes" />
    <FilmeList :key="listKey" />
  </div>
</template>

<script>
import { ref } from 'vue'
import FilmeForm from '@/components/FilmeForm.vue'
import FilmeList from '@/components/FilmeList.vue'

export default {
  name: 'Home',
  components: {
    FilmeForm,
    FilmeList
  },
  setup() {
    const listKey = ref(0)

    const fetchFilmes = () => {
      listKey.value += 1
    }

    return {
      listKey,
      fetchFilmes
    }
  }
}
</script>