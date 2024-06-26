import { createRouter, createWebHistory } from 'vue-router'
// import LandingView from '../views/LandingView.vue'
import IntroductionView from '../views/IntroductionView.vue'
import InstructionsView from '@/views/InstructionsView.vue'
import QuestionView from '../views/QuestionView.vue'
import ResultsView from '../views/ResultsView.vue'
import ResultsByPartyView from '../views/ResultsByPartyView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'introduction',
      component: IntroductionView
    },
    {
      path: '/intro',
      name: 'introduction-old',
      component: IntroductionView
    },
    {
      path: '/navodila',
      name: 'instructions',
      component: InstructionsView
    },
    {
      path: '/o-aplikaciji',
      name: 'about',
      component: AboutView
    },
    {
      path: '/politika-zasebnosti',
      name: 'privacyPolicy',
      component: PrivacyPolicyView
    },
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
  ]
})

export default router
