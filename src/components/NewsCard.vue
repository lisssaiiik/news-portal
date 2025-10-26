<template>
  <article class="card">
    <img :src="news.image" alt="" class="thumb" />
    <div class="card-body">
      <h2>{{ news.title }}</h2>
      <div class="meta">{{ formatDate(news.published_at) }} · {{ news.source }} · {{ news.category }}</div>
      <p v-if="expanded" class="desc">{{ news.description }}</p>
      <div class="actions">
        <button @click="toggle">{{ expanded ? 'Свернуть' : 'Читать далее' }}</button>
        <router-link :to="`/news/${news.id}`">Открыть</router-link>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ news: Object })
const expanded = ref(false)
function toggle() { expanded.value = !expanded.value }
function formatDate(s) { return new Date(s).toLocaleString() }
</script>
