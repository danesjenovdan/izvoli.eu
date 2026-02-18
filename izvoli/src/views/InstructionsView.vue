<script setup></script>

<template>
  <main class="container">
    <div class="body">
      <h1>Kako uporabljati aplikacijo?</h1>
      <div class="buttons">
        <div>
          <div class="instructions">
            <div>Se ne strinjaš?</div>
            <span>Pritisni spodnji gumb ali potegni kartico v levo</span>
          </div>
          <button type="button" class="disagree" disabled>
            <img src="../assets/img/ne-strinjam.svg" alt="" />
          </button>
        </div>
        <div>
          <div class="instructions">
            <div>Se strinjaš?</div>
            <span>Pritisni spodnji gumb ali potegni kartico v desno</span>
          </div>
          <button type="button" class="agree" disabled>
            <img src="../assets/img/strinjam.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="buttons">
        <div>
          <div class="instructions">Prejšnja trditev</div>
          <button type="button" class="back" disabled>
            <div>
              <img src="../assets/img/puscica-trikotnik.svg" alt="" />
              <img src="../assets/img/puscica-trikotnik.svg" alt="" />
            </div>
          </button>
        </div>
        <div>
          <div class="instructions">Preskoči</div>
          <button type="button" class="skip" disabled>
            <div>
              <img src="../assets/img/puscica-trikotnik.svg" alt="" />
              <img src="../assets/img/puscica-trikotnik.svg" alt="" />
            </div>
          </button>
        </div>
      </div>
      <div class="button-wrapper">
        <RouterLink
          :to="{ name: 'question', params: { idx: 1 } }"
          class="button-go"
        >
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

  h1 {
    margin-bottom: 1em;
    font-size: 2rem;
    line-height: 1.2;
    text-align: center;

    @media (max-width: 575.98px) {
      font-size: 1.5rem;
    }
  }

  .buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    align-items: flex-end;
    margin-top: 2.5rem;

    @media (max-width: 575.98px) {
      gap: 0.75rem;
      margin-top: 1.5rem;
    }

    & > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .instructions {
      margin-bottom: 0.5rem;
      font-size: 0.75rem;
      line-height: 1.2;
      font-weight: 400;

      div {
        margin-bottom: 0.25rem;
        font-size: 1.125rem;
        line-height: 1.2;
        font-weight: 700;
        text-transform: uppercase;
      }
    }

    .agree,
    .disagree,
    .back,
    .skip {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: flex-start;
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid #000;
      cursor: default;
    }

    .back,
    .skip {
      padding: 0.5rem 0.75rem;
      width: auto;
      font-size: 1rem;
      line-height: 1.3;
      font-weight: 400;
      color: inherit;
      text-decoration: none;

      & > div {
        display: flex;
      }

      img {
        height: 1rem;
        transform: rotate(90deg);

        &:first-of-type {
          margin-right: -0.375rem;
        }
      }
    }

    .skip {
      justify-content: flex-end;

      img {
        transform: rotate(-90deg);
      }
    }

    .agree,
    .disagree {
      gap: 1rem;
      justify-content: center;
      width: auto;
      padding: 1.25rem 1.5rem;
      background-color: #eaf5ff;
      border-width: 2px;
      font-size: 1.125rem;
      line-height: 1.2;
      font-weight: 700;

      @media (max-width: 575.98px) {
      }

      img {
        height: 2rem;
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
