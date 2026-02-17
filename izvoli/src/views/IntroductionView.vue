<script setup></script>

<template>
  <main class="container">
    <div class="body">
      <p class="lead">
        Politične stranke, med katerimi bomo izbirali na volitvah 22. 3. 2026,
        imajo različne programe in prioritete. Ker želimo volivkam in volivcem
        olajšati odločitev, smo razvili Izvoli.si, s pomočjo katerega lahko vsak
        preveri, s katerimi strankami se po stališčih in prepričanjih najbolj
        ujema.
      </p>
      <p>
        V Izvoli.si je zbranih 40 zahtev, na katere lahko podaš svoj odgovor. Na
        podlagi rezultatov izveš, katera izmed sodelujočih strank najbolj
        ustreza tvojim stališčem, lahko pa tudi podrobneje raziščeš, na katerih
        točkah so razhajanja največja in zakaj.
      </p>
      <p>
        In za konec: ne pozabi deliti povezave do Izvoli.si s prijateljicami in
        prijatelji, saj jim lahko tako olajšaš odločitev.
      </p>
      <div class="button-wrapper">
        <RouterLink :to="{ name: 'instructions' }" class="button-go">
          Vstopi <img src="../assets/img/puscica.svg" alt="" />
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
