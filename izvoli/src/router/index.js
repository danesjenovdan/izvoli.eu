import { createRouter, createWebHistory } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import InstructionsView from "@/views/InstructionsView.vue";
import IntroductionView from "@/views/IntroductionView.vue";
import LandingView from "@/views/LandingView.vue";
import PrivacyPolicyView from "@/views/PrivacyPolicyView.vue";
import QuestionView from "@/views/QuestionView.vue";
import ResultsByPartyView from "@/views/ResultsByPartyView.vue";
import ResultsView from "@/views/ResultsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
    },
    {
      path: "/intro",
      name: "introduction",
      component: IntroductionView,
    },
    {
      path: "/navodila",
      name: "instructions",
      component: InstructionsView,
    },
    {
      path: "/o-aplikaciji",
      name: "about",
      component: AboutView,
    },
    {
      path: "/politika-zasebnosti",
      name: "privacyPolicy",
      component: PrivacyPolicyView,
    },
    {
      path: "/vprasanje/:idx",
      name: "question",
      component: QuestionView,
    },
    {
      path: "/rezultati",
      name: "results",
      component: ResultsView,
    },
    {
      path: "/rezultati/:idx",
      name: "resultsByParty",
      component: ResultsByPartyView,
    },
  ],
});

export default router;
