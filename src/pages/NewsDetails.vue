<template>
  <div class="details">
    <button @click="$router.back()">Назад</button>
    <div v-if="!item">Загрузка...</div>
    <div v-else>
      <h1>{{ item.title }}</h1>
      <div class="meta">{{ formatDate(item.published_at) }} · {{ item.source }}</div>
      <img :src="item.image" alt="" />
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '../stores/newsStore'

const route = useRoute()
const store = useNewsStore()
const id = Number(route.params.id)

onMounted(async () => {
  if (!store.all.length) await store.fetchFromNewsApi()
})

const item = computed(() => store.all.find(n => n.id === id) || null)

function formatDate(s) {
  return new Date(s).toLocaleString()
}
</script>
