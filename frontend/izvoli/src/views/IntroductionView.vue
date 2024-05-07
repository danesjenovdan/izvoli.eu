<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const storeInitialized = computed(() => store.getters.getStoreInitialized)
const quizFinished = computed(() => store.getters.getQuizFinished)

onMounted(() => {
  console.log('introduction on mounted')
  if (!storeInitialized.value) {
    store.dispatch('initializeStore').then((quiz_finished) => {
      if (quiz_finished) {
        router.push('/rezultati')
      }
    })
  }
  if (quizFinished.value) {
    router.push('/rezultati')
  }
})
</script>

<template>
  <main class="container">
    <div class="body">
      <p class="introduction">
        Politične stranke, med katerimi bomo izbirali na volitvah 24. 4. 2022, imajo različne
        programe in prioritete. Ker želimo volivkam in volivcem olajšati odločitev, smo razvili
        Volitvomat, s pomočjo katerega lahko vsak preveri, s katerimi strankami se po stališčih in
        prepričanjih najbolj ujema.
      </p>
      <p>
        Orodje temelji na odgovorih strank na 138 zahtev, ki so jih skupaj postavile civilnodružbene
        organizacije, združene v iniciativo Glas ljudstva. H konkretnim odzivom smo večkrat pozvali
        prav vse stranke, toda številne svojih zavez niso želele prispevati. A ni še prepozno – vse
        stranke, ki nam bodo posredovale svoje zaveze, bomo takoj vključili v Volitvomat.
      </p>
      <p>
        V Volitvomatu je zbranih 40 zahtev, na katere lahko podaš svoj odgovor. Na podlagi
        rezultatov izveš, katera izmed sodelujočih strank najbolj ustreza tvojim stališčem, lahko pa
        tudi podrobneje raziščeš, na katerih točkah so razhajanja največja in zakaj.
      </p>
      <p>
        In za konec: ne pozabi deliti povezave do Volitvomata s prijateljicami in prijatelji, saj
        jim lahko tako olajšaš odločitev.
      </p>
      <div class="button-wrapper">
        <RouterLink to="/vprasanje/1" class="button-go">
          Vstopi <img src="../assets/img/puscica.svg" alt="" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.body {
  padding-inline: 100px;
  padding-top: 72px;
  padding-bottom: 56px;

  @media (max-width: 575.98px) {
    padding-inline: 21px;
    padding-top: 24px;
    padding-bottom: 33px;
  }

  p {
    margin-bottom: 24px;
    font-size: 15px;
    line-height: 24px;

    &.introduction {
      font-size: 24px;
      line-height: 34px;

      @media (max-width: 575.98px) {
        font-size: 21px;
        line-height: 27px;
      }
    }
  }

  .button-wrapper {
    margin-top: 56px;
    text-align: center;

    @media (max-width: 575.98px) {
      margin-top: 33px;
    }
  }
}
</style>
