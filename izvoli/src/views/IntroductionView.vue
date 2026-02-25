<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { RouterLink } from "vue-router";

const isMobile = ref(window.innerWidth <= 575.98);

const routerTo = computed(() => {
  if (isMobile.value) return { name: "instructions" };
  else return { name: "question", params: { idx: 1 } };
});

function calcMobile() {
  isMobile.value = window.innerWidth <= 575.98;
}

onMounted(() => {
  window.addEventListener("resize", calcMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calcMobile);
});
</script>

<template>
  <main class="container">
    <div class="body">
      <p class="lead">
        Preveri, katera stranka se najbolj ujema s tvojimi stališči!
      </p>
      <p class="lead">
        Na državnozborskih volitvah 22. marca izbiraš prihodnost. Politične
        stranke imajo zelo različne programe in prioritete. Volilni pripomoček
        Izvoli.si ti pomaga izbrati tisto, ki ti je najbližje.
      </p>
      <p>
        V volilnem kvizu je zbranih 30 (od skupno 130 zahtev), ki jih je civilna
        iniciativa
        <a
          href="https://glas-ljudstva.si/"
          target="_blank"
          rel="noopener noreferrer"
          >Glas ljudstva</a
        >
        pred volitvami zbrala in naslovila na vse politične stranke, ki na
        volitvah kandidirajo. Stranke so se lahko do njih opredelile tako, da so
        se zavezale k njihovi uresničitvi ali pa se z njimi niso strinjale.
      </p>
      <p>
        Zaveze je podalo osem strank oziroma volilnih list. Štiri večje stranke
        na pozive civilne družbe niso odgovorile, zato smo za njih na podlagi
        njihovih predvolilnih programov podali ocene.
      </p>
      <p>Tvoji odgovori bodo shranjeni samo na tvoji napravi.</p>
      <div class="button-wrapper">
        <RouterLink :to="routerTo" class="button-go">
          Začni <img src="../assets/img/puscica.svg" alt="" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.body {
  padding-inline: 6rem;
  padding-block: 4.5rem;

  @media (max-width: 575.98px) {
    padding-inline: 1.5rem;
    padding-block: 2rem;
  }

  p {
    line-height: 1.5;

    &.lead {
      font-size: 1.5rem;

      @media (max-width: 575.98px) {
        font-size: 1.25rem;
      }
    }

    &:not(:last-child) {
      margin-bottom: 1em;
    }

    a {
      display: inline-block;
      color: inherit;

      &:hover {
        text-decoration-color: #006fc3;
        text-decoration-thickness: 2px;
      }

      &:focus-visible {
        outline: 2px solid #006fc3;
        outline-offset: 2px;
      }
    }
  }

  .button-wrapper {
    margin-top: 3.5rem;
    text-align: center;

    @media (max-width: 575.98px) {
      margin-top: 1.5rem;
    }
  }
}
</style>
