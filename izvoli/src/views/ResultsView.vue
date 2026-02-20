<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/store.js";
import PartyDonutChart from "@/components/PartyDonutChart.vue";
import TheLoader from "@/components/TheLoader.vue";

const store = useMainStore();
const router = useRouter();

const topThreeResults = computed(() => {
  return store.results.slice(0, 3);
});

const chosenParties = ref([]);

function selectAllParties() {
  chosenParties.value = [...store.results.map((res) => res.party_id)];
}

function unselectAllParties() {
  chosenParties.value = [];
}

function partyImage(partyId) {
  return store.quizData.parties.find((p) => p.id === partyId)?.image || null;
}

function partyName(partyId) {
  return store.quizData.parties.find((p) => p.id === partyId)?.name || "???";
}

function partyOurAnswers(partyId) {
  return store.quizData.parties.find((p) => p.id === partyId)?.our_answers;
}

const compareWithTopThreeParties = () => {
  const parties = [...topThreeResults.value.map((res) => res.party_id)];
  store.partiesToCompare = parties;
  router.push({ name: "resultsByParty", params: { idx: 1 } });
};

const compareWithChosenParties = () => {
  const parties = [...chosenParties.value];
  store.partiesToCompare = parties;
  router.push({ name: "resultsByParty", params: { idx: 1 } });
};

function onCopyLinkClicked() {
  const linkEl = document.getElementById("website-link");
  const buttonEl = document.querySelector(".copy-link-button");
  linkEl.select();
  navigator.clipboard
    .writeText(linkEl.value)
    .then(() => {
      buttonEl.textContent = "Skopirano!";
      setTimeout(() => {
        buttonEl.textContent = "Kopiraj!";
      }, 2000);
    })
    .catch(() => {
      // eslint-disable-next-line no-alert
      alert("Prišlo je do napake. Poskusi znova.");
    });
}

onMounted(() => {
  if (!store.quizFinished) {
    router.push({ name: "introduction" });
    return;
  }
  if (!store.resultsCalculated) {
    store.calculateResults();
  }
});
</script>

<template>
  <main class="container">
    <div v-if="store.resultsCalculated" class="body">
      <div class="content">
        <h1>Najbolj se ujemaš s:</h1>
        <div class="top-three">
          <PartyDonutChart
            v-for="result in topThreeResults"
            :key="result.party_id"
            :result="result"
          />
        </div>
        <div class="button-wrapper">
          <button class="button-go" @click="compareWithTopThreeParties">
            Primerjaj svoje odgovore s temi strankami
            <img src="../assets/img/puscica.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="share-link">
        <h2 class="title">Deli povezavo še z drugimi!</h2>
        <div class="link-group">
          <input
            id="website-link"
            type="text"
            maxlength="20"
            required=""
            onfocus="this.select()"
            value="izvoli.si"
          />
          <button
            type="button"
            class="copy-link-button"
            @click="onCopyLinkClicked"
          >
            Kopiraj!
          </button>
        </div>
      </div>
      <div class="more-info">
        <h2>
          <span>Izberi stranke za primerjavo</span>
          <button v-if="chosenParties.length == 0" @click="selectAllParties">
            Izberi vse stranke
          </button>
          <button v-if="chosenParties.length > 0" @click="unselectAllParties">
            Odstrani vse stranke
          </button>
        </h2>
        <div class="parties">
          <div
            v-for="result in store.results"
            :key="result.party_id"
            class="party"
          >
            <label :for="`chosen-party-${result.party_id}`">
              <input
                :id="`chosen-party-${result.party_id}`"
                v-model="chosenParties"
                type="checkbox"
                :value="result.party_id"
              />
              <img
                :src="partyImage(result.party_id)"
                class="party-image"
                alt=""
              />
              {{ partyName(result.party_id) }}
            </label>

            <div v-if="partyOurAnswers(result.party_id)" class="our-answers">
              <div class="alert">
                <div>
                  Niso odgovorili ampak smo mi pregledali njihovo stališče
                </div>
              </div>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :aria-valuenow="result.percentage"
                  aria-valuemin="0"
                  :aria-valuemax="100"
                  :style="{ width: `${result.percentage}%` }"
                  :class="{
                    'border-end':
                      result.percentage > 0 && result.percentage < 100,
                  }"
                ></div>
              </div>
            </div>
            <div v-else class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :aria-valuenow="result.percentage"
                aria-valuemin="0"
                :aria-valuemax="100"
                :style="{ width: `${result.percentage}%` }"
                :class="{
                  'border-end':
                    result.percentage > 0 && result.percentage < 100,
                }"
              ></div>
            </div>
            <span class="party-percentage">{{ result.percentage }} %</span>
          </div>
        </div>
        <div class="button-wrapper">
          <button class="button-go" @click="compareWithChosenParties">
            Primerjaj svoje odgovore z izbranimi strankami
            <img src="../assets/img/puscica.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
    <div v-else class="loader-container">
      <TheLoader />
    </div>
    <div class="restart-buttons">
      <button
        v-if="store.resultsCalculated && store.quizFinished"
        class="restart-quiz"
        @click="store.restartQuiz"
      >
        Ponovno reši
      </button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.body {
  .button-wrapper {
    margin-top: 3.5rem;
    text-align: center;

    @media (max-width: 575.98px) {
      margin-top: 1.5rem;
    }

    .button-go {
      font-size: 1.25rem;
      line-height: 1.2;
      padding-inline: 1.25rem;
      padding-block: 0.75rem;

      @media (max-width: 575.98px) {
        font-size: 0.875rem;
      }
    }
  }

  .content {
    padding-inline: 6rem;
    padding-block: 3.25rem 4rem;

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

    .top-three {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;

      @media (max-width: 575.98px) {
        gap: 0.5rem;
      }
    }
  }

  .more-info {
    border-top: 2px solid black;
    background-color: #eaf5ff;
    padding-inline: 6rem;
    padding-block: 3.25rem 4rem;

    @media (max-width: 575.98px) {
      padding-inline: 1.5rem;
      padding-block: 2rem;
    }

    h2 {
      font-size: 1.25rem;
      line-height: 1.2;
      font-weight: 700;

      @media (max-width: 575.98px) {
        display: flex;
        align-items: center;
        font-size: 1.125rem;
      }

      button {
        flex-shrink: 0;
        display: inline-flex;
        margin-left: 1rem;
        padding: 0;
        background: transparent;
        border: none;
        border-bottom: 1px solid #0e3d97;
        color: #0e3d97;
        font-size: 1rem;
        line-height: 1;
        font-weight: 400;
        cursor: pointer;

        @media (max-width: 575.98px) {
          font-size: 0.875rem;
        }
      }
    }

    .parties {
      margin-top: 1.75rem;

      .party {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        @media (max-width: 767.98px) {
          display: grid;
          grid-template-columns: 4fr 1fr;
          margin-bottom: 1.125rem;
        }

        label {
          flex: 1.25;
          display: flex;
          align-items: center;
          min-width: 300px;
          margin-right: 1.25rem;
          font-size: 1rem;
          line-height: 1.2;
          font-weight: 700;
          cursor: pointer;

          @media (max-width: 767.98px) {
            grid-row: 1;
            grid-column: 1;
            min-width: auto;
            margin-right: 0;
            font-size: 0.875rem;
          }

          input[type="checkbox"] {
            flex-shrink: 0;
            position: relative;
            appearance: none;
            background-color: transparent;
            width: 1rem;
            height: 1rem;
            border: 1px solid black;
            cursor: pointer;

            &:checked {
              background-color: #fff;

              &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 9px;
                height: 5px;
                border: solid #000;
                border-width: 0 0 2px 2px;
                transform: scale(1) rotate(-45deg) translateX(-12%)
                  translateY(90%);
              }
            }

            &:focus-visible {
              outline: 2px solid #006fc3;
              outline-offset: 2px;

              &:not(:checked) {
                background-color: #fff;
              }
            }
          }

          .party-image {
            flex-shrink: 0;
            margin-left: 1rem;
            margin-right: 0.5rem;
            width: 2.25rem;
            height: 2.25rem;
            background-color: #fff;
            border: 1px solid #000;
            border-radius: 50%;
            object-fit: contain;
          }
        }

        .progress {
          flex: 2;
          height: 1.25rem;
          background-color: #fff;
          border: 1px solid #000;
          overflow: hidden;

          @media (max-width: 767.98px) {
            grid-row: 2;
            grid-column: 1 / -1;
            margin-left: 2rem;
            margin-top: 0.5rem;
            height: 0.875rem;
          }

          .progress-bar {
            background-color: #65a3ff;
            height: 100%;
            border-radius: inherit;
            animation: progressBar 1.5s ease-in-out forwards;

            @keyframes progressBar {
              from {
                width: 0;
              }
            }

            &.border-end {
              border-right: 1px solid black;
            }
          }
        }

        .our-answers {
          flex: 2;

          @media (max-width: 767.98px) {
            grid-row: 2;
            grid-column: 1 / -1;
          }

          .alert {
            margin-bottom: 0.25rem;
            color: #d00;
            font-size: 0.75rem;
            font-weight: 400;

            @media (max-width: 767.98px) {
              margin-left: 2rem;
              margin-top: 0.5rem;
            }
          }

          .progress-bar {
            background-color: #fcc;
          }
        }

        .party-percentage {
          flex: 0.25;
          min-width: 50px;
          margin-left: 0.5rem;
          text-align: right;
          font-size: 1rem;
          line-height: 1.25rem;

          @media (max-width: 767.98px) {
            grid-row: 1;
            grid-column: 2;
            min-width: auto;
            font-size: 0.875rem;
            margin-left: 0;
          }
        }
      }
    }
  }

  .share-link {
    border-top: 2px solid black;
    background-color: #fff;
    padding-inline: 6rem;
    padding-block: 2rem;
    text-align: center;

    @media (max-width: 575.98px) {
      padding-inline: 1.5rem;
      padding-block: 2rem;
    }

    h2 {
      font-size: 1.25rem;
      line-height: 1.2;
      font-weight: 700;

      @media (max-width: 575.98px) {
        font-size: 1.125rem;
      }
    }

    .link-group {
      display: flex;
      gap: 1rem;
      max-width: 400px;
      margin-top: 1.75rem;
      margin-inline: auto;

      @media (max-width: 575.98px) {
        flex-direction: column;
      }

      input[type="text"] {
        flex: 1;
        padding: 0.5rem;
        font: inherit;
        font-size: 1rem;
        line-height: 1.2;
        font-weight: 700;
        border: 1px solid #000;
        background-color: #eaf5ff;

        @media (max-width: 575.98px) {
          font-size: 0.875rem;
        }

        &:focus-visible {
          outline: 2px solid #006fc3;
          outline-offset: 2px;
        }
      }

      button {
        flex: 0.5;
        display: block;
        width: 100%;
        padding-block: 0.40625rem;
        padding-inline: 0.875rem;
        background-color: #65a3ff;
        border: 2px solid #000;
        font: inherit;
        font-size: 1rem;
        font-weight: 700;
        text-align: left;
        cursor: pointer;

        &:hover {
          background-color: #006fc3;
          color: #fff;
        }

        &:focus-visible {
          outline: 2px solid #006fc3;
          outline-offset: 2px;
        }
      }
    }
  }
}

.restart-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a,
  button {
    display: inline-flex;
    align-items: center;
    padding: 6px 11px 6px 14px;
    background: transparent;
    background-repeat: no-repeat;
    background-position: center right 11px;
    background-size: 21px;
    border: 2px solid black;
    font-size: 1rem;
    line-height: 1.2;
    font-weight: 700;
    color: #000;
    text-decoration: none;
    cursor: pointer;

    @media (max-width: 575.98px) {
      font-size: 0.875rem;
    }

    &::after {
      content: "";
      display: inline-block;
      width: 1.25rem;
      height: 1.25rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      margin-left: 0.25rem;
    }

    &:hover {
      background-color: #fff;
    }

    &:focus-visible {
      outline: 2px solid #006fc3;
      outline-offset: 2px;
    }

    &.restart-quiz {
      &::after {
        background-image: url("../assets/img/reset.svg");
      }
    }
  }
}
</style>
