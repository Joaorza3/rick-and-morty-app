import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharacterDetails from '../views/CharacterDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/character/:id',
      name: 'CharacterDetails',
      component: CharacterDetails,
    },
  ],
})

export default router
