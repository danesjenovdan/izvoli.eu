import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import IntroductionView from '../views/IntroductionView.vue'
import QuestionView from '../views/QuestionView.vue'
import ResultsView from '../views/ResultsView.vue'
// import StatisticsView from '../views/StatisticsView.vue'
import ResultsByPartyView from '../views/ResultsByPartyView.vue'
// import NoCandidatesView from '../views/NoCandidatesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/intro',
      name: 'introduction',
      component: IntroductionView
    },
    // {
    //   path: '/:slug/ni-podatkov',
    //   name: 'noCandidates',
    //   component: NoCandidatesView
    // },
    {
      path: '/vprasanje/:id',
      name: 'question',
      component: QuestionView
    },
    {
      path: '/rezultati',
      name: 'results',
      component: ResultsView
    },
    {
      path: '/rezultati/:id',
      name: 'resultsByParty',
      component: ResultsByPartyView
    }
    // {
    //   path: '/:slug/statistika',
    //   name: 'statistics',
    //   component: StatisticsView
    // }
  ]
})

export default router
