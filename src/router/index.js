import { createRouter, createWebHistory } from 'vue-router'
import NewsList from '../pages/NewsList.vue'
import NewsDetails from '../pages/NewsDetails.vue'

const routes = [
  { path: '/', component: NewsList },
  { path: '/news/:id', component: NewsDetails, props: true }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
