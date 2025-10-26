import { defineStore } from 'pinia'
import axios from 'axios'

export const useNewsStore = defineStore('news', {
  state: () => ({
    all: [],
    perPage: 5,
    visibleCount: 10,
    loading: false,
    error: null,
    query: '',
    category: 'All',
  }),
  getters: {
    categories(state) {
      const set = new Set(state.all.map(n => n.category))
      return ['All', ...Array.from(set)]
    },
    filtered(state) {
      let list = state.all
      if (state.category !== 'All') list = list.filter(n => n.category === state.category)
      if (state.query) {
        const q = state.query.toLowerCase()
        list = list.filter(
          n =>
            n.title.toLowerCase().includes(q) ||
            n.description.toLowerCase().includes(q)
        )
      }
      return list
    },
    paged(state) {
  return this.filtered.slice(0, state.visibleCount)
}

  },
  actions: {
    async fetchFromNewsApi(query = 'technology', pageSize = 20) {
      this.loading = true
      try {
        const res = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: query,
            language: 'en',
            sortBy: 'publishedAt',
            pageSize,
            apiKey: '9480b8ec9d2d4ba8beaf5470d7c8f9b4'
          }
        })

        this.all = res.data.articles.map((a, index) => ({
          id: index + 1,
          title: a.title || 'Без заголовка',
          category: a.source?.name || 'General',
          source: a.source?.name || 'Unknown',
          published_at: a.publishedAt,
          image: a.urlToImage || 'https://via.placeholder.com/400x200?text=No+image',
          description: a.description || 'Описание недоступно.'
        }))

        this.error = null
      } catch (err) {
        console.error(err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    setQuery(q) {
      this.query = q
    },
    setCategory(c) {
      this.category = c
    },
    increasePerPage() {
  this.visibleCount += this.perPage
}
  },
  

})
