<template>
  <div class="page">
    <div class="controls">
      <input
        v-model="queryLocal"
        @keyup.enter="onSearch"
        placeholder="Поиск новостей..."
      />
      <button @click="onSearch">Поиск</button>

      <select v-model="store.category">
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-if="error" class="error">Ошибка: {{ error }}</div>

    <div class="grid">
      <NewsCard v-for="item in paged" :key="item.id" :news="item" />
    </div>

    <button
      v-if="paged.length < filtered.length"
      @click="loadMore"
      class="load-more"
    >
      Показать ещё
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useNewsStore } from '../stores/newsStore'
import NewsCard from '../components/NewsCard.vue'

const store = useNewsStore()
const queryLocal = ref(store.query)

onMounted(() => {
  if (!store.all.length) store.fetchFromNewsApi()
})

function onSearch() {
  const q = queryLocal.value?.trim()
  store.setQuery(q)
  store.fetchFromNewsApi(q || 'world')
}

function loadMore() {
  store.increasePerPage()
}

const loading = computed(() => store.loading)
const error = computed(() => store.error)
const categories = computed(() => store.categories)
const paged = computed(() => store.paged)
const filtered = computed(() => store.filtered)
</script>
