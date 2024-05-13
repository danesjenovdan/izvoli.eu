<script setup>
import { ref, computed, onMounted, toRaw, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import PartyDonutChart from '../components/PartyDonutChart.vue'

const store = useStore()
const router = useRouter()

const storeInitialized = computed(() => store.getters.getStoreInitialized)
const quizFinished = computed(() => store.getters.getQuizFinished)
const parties = computed(() => store.getters.getParties)
const results = computed(() => store.getters.getResults)
const answers = computed(() => store.getters.getAnswers)
const questions = computed(() => store.getters.getQuestions)
const questionsList = computed(() => store.getters.getQuestionsList)
const chosenParties = ref([])
const partiesNoAnswer = computed(() => {
  const p = {}
  const partiesAnswered = [...results.value].map((el) => el.party_id)
  for (const [key, value] of Object.entries(parties.value)) {
    if (!partiesAnswered.includes(key)) {
      p[key] = value
    }
  }
  return p
})

const winners = computed(() => {
  const winners = [...results.value]
  winners.splice(3)
  return winners
})

const winnerIDs = computed(() => {
  if (results.value?.[0]) {
    const winnerPercentage = results.value[0].percentage
    const winners = results.value.filter((res) => toRaw(res).percentage == winnerPercentage)
    const winnerIDs = winners.map((res) => parties.value[res.party_id].votematch_id)
    return [winnerIDs.toString(), winnerPercentage]
  } else {
    return ['', '']
  }
})

const isMobile = computed(() => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
})

const compareWithWinningParties = () => {
  const parties = [...results.value.map((res) => res.party_id)]
  parties.splice(3)
  store.commit('setPartiesToCompare', { parties: parties })
  router.push({ name: 'resultsByParty', params: { id: 1 } })
}

const compareWithChosenParties = () => {
  store.commit('setPartiesToCompare', { parties: chosenParties.value })
  router.push({ name: 'resultsByParty', params: { id: 1 } })
}

const compareWithAllParties = () => {
  chosenParties.value = [...results.value.map((res) => res.party_id)]
}

const unselectAllParties = () => {
  chosenParties.value = []
}

onMounted(() => {
  // initialize store
  if (!storeInitialized.value) {
    store.dispatch('initializeStore').then((quiz_finished) => {
      if (!quiz_finished) {
        router.push('/')
      }
    })
  }
  // redirect if quiz is not yet finished
  if (!quizFinished.value) {
    router.push('/')
  }
  // EU comparison
  if (!window.VotematchEU) {
    let votematchScript = document.createElement('script')
    votematchScript.setAttribute('src', 'https://assets.votematch.eu/embed.js')
    document.head.appendChild(votematchScript)
  }
})

onBeforeUnmount(() => {
  if (window.VotematchEU) {
    let votematchScript = document.querySelector('head script[src*="votematch"]')
    document.head.removeChild(votematchScript)
    window.VotematchEU = null
  }
})

function partyImageUrl(url) {
  if (!url) return ''
  const newUrl = new URL(url, store.getters.getApiUrl)
  return newUrl.toString()
}

function answerToValue(answer) {
  if (answer == 'YES') return '1'
  if (answer == 'NEUTRAL') return '0'
  if (answer == 'NO') return '-1'
}

const urlCopied = ref(false)

function copyToClipboard() {
  navigator.clipboard.writeText("https://izvoli.eu/").then(function () {
    urlCopied.value = true
    alert('Povezava je skopirana v odložišče!')
  }, function () {
    // ni se skopiralo ...
  });
}

function shareOnMobile() {
  if (navigator.share) {
    urlCopied.value = true
    navigator.share({
      title: 'Izvoli.eu',
      text: 'Odgovori na 30 trditev in preveri, s katerimi strankami se tvoja stališča najbolj ujemajo!',
      url: 'https://izvoli.eu/'
    })
  } else {
    console.log("Can't share on this device.")
  }
}
</script>

<template>
  <main class="container">
    <div class="body" v-if="results.length > 0">
      <div class="content">
        <h1>Najbolj se ujemaš s strankami:</h1>
        <div class="winners">
          <PartyDonutChart v-for="result in winners" :key="result.party_id" :result="result" :parties="parties" />
        </div>
        <div class="button-wrapper">
          <button class="button-go" @click="compareWithWinningParties">
            Primerjaj svoje odgovore s temi strankami
            <img src="../assets/img/puscica.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="more-info">
        <p>
          <span>Izberi stranke za primerjavo svojih odgovorov</span>
          <button @click="compareWithAllParties" v-if="chosenParties.length == 0">
            Izberi vse stranke
          </button>
          <button @click="unselectAllParties" v-if="chosenParties.length > 0">
            Odstrani vse stranke
          </button>
        </p>
        <div class="parties">
          <div v-for="party in results" :key="party.party_id" class="party">
            <label :for="`chosen-party-${party.party_id}`" :class="{ 'no-answers': !party.finished_quiz }">
              <input type="checkbox" :id="`chosen-party-${party.party_id}`" :value="party.party_id"
                v-model="chosenParties" v-if="party.finished_quiz" />
              <img :src="partyImageUrl(parties[party.party_id].image)" class="party-image" />
              {{ parties[party.party_id].name }}
            </label>

            <div v-if="party.finished_quiz" class="progress">
              <div class="progress-bar" role="progressbar" :aria-valuenow="party.percentage" aria-valuemin="0"
                :aria-valuemax="100" :style="{ width: `${party.percentage}%` }"
                :class="{ 'border-end': party.percentage > 0 && party.percentage < 100 }"></div>
            </div>
            <span v-if="party.finished_quiz" class="party-percentage">{{ party.percentage }} %</span>
            <p v-if="!party.finished_quiz">Niso odgovorili na vprašanja</p>
            <span v-if="!party.finished_quiz" class="party-percentage">0 %</span>
          </div>
          <div v-for="party in partiesNoAnswer" :key="party.id" class="party">
            <label :for="`chosen-party-${party.id}`">
              <input type="checkbox" :id="`chosen-party-${party.id}`" :value="party.id" v-model="chosenParties" />
              <img :src="partyImageUrl(party.image)" class="party-image" />
              {{ party.name }}
            </label>
          </div>
        </div>
        <div class="button-wrapper">
          <button class="button-go" @click="compareWithChosenParties">
            Primerjaj svoje odgovore s temi strankami
            <img src="../assets/img/puscica.svg" alt="" />
          </button>
        </div>
      </div>
    </div>

    <button v-if="!isMobile" class="share-button-desktop" :class="{ 'copied': urlCopied }"
      @click="copyToClipboard"></button>
    <div class="share-button-mobile-wrapper">
      <button v-if="isMobile" class="share-button-mobile" :class="{ 'copied': urlCopied }"
        @click="shareOnMobile"></button>
    </div>


    <div class="body" v-if="results.length > 0">
      <div class="content two-columns">
        <img src="../assets/img/eu.jpg" alt="Zemljevid Evropske Unije" />
        <div>
          <h2>Te zanima, s katerimi strankami iz drugih držav EU se ujemaš?</h2>
          <p>
            Primerjaj svoja stališča z odgovori političnih strank, ki kandidirajo v drugih državah
            članicah Evropske unije, in ugotovi, kdo so tvoji zavezniki!
          </p>
          <button class="VotematchEU-button">Pokaži mi evropske rezultate!</button>
        </div>
        <form id="VotematchEU-settings">
          <input type="hidden" name="lang" value="SL" />
        </form>
        <form id="VotematchEU-results">
          <input type="hidden" name="country" value="SI" />
          <input type="hidden" name="bestmatch" :value="winnerIDs[0]" />
          <input type="hidden" name="bestscore" :value="winnerIDs[1]" />
          <template v-for="qNo in questionsList">
            <input v-if="qNo in answers && questions[qNo].votematch_id" :key="qNo" type="hidden"
              :name="questions[qNo].votematch_id" :value="answerToValue(answers[qNo])" />
          </template>
        </form>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.body {
  &:not(:last-child) {
    margin-bottom: 70px;

    @media (max-width: 575.98px) {
      margin-bottom: 40px;
    }
  }

  .button-wrapper {
    margin-top: 42px;
    text-align: center;

    @media (max-width: 575.98px) {
      margin-top: 32px;
    }

    .button-go {
      font-size: 18px;
      line-height: 20px;
      padding-inline: 17px 17px;

      @media (max-width: 575.98px) {
        font-size: 15px;
        line-height: 16px;
      }
    }
  }

  .content {
    padding-inline: 100px;
    padding-top: 60px;
    padding-bottom: 56px;

    @media (max-width: 575.98px) {
      padding-inline: 21px;
      padding-top: 21px;
      padding-bottom: 32px;
    }

    h1 {
      margin-bottom: 20px;
      font-size: 32px;
      line-height: 40px;
      font-weight: 700;
      text-align: center;

      @media (max-width: 575.98px) {
        margin-bottom: 24px;
        font-size: 24px;
        line-height: 30px;
      }
    }

    .winners {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;

      @media (max-width: 575.98px) {
        gap: 8px;
      }
    }

    &.two-columns {
      display: flex;
      align-items: center;

      & > img {
        width: 230px;
        flex-shrink: 0;

        @media (max-width: 575.98px) {
          display: none;
        }
      }

      & > div {
        margin-left: 30px;

        @media (max-width: 575.98px) {
          margin-left: 0;
        }

        h2 {
          font-size: 24px;
          line-height: 30px;
          margin-bottom: 20px;

          @media (max-width: 575.98px) {
            font-size: 18px;
            line-height: 21px;
            margin-bottom: 10px;
          }
        }

        p {
          font-size: 15px;
          line-height: 22px;
          margin-bottom: 20px;

          @media (max-width: 575.98px) {
            font-size: 12px;
            line-height: 16px;
          }
        }

        .VotematchEU-button {
          visibility: visible !important;
          border: 2px solid black;
          border-radius: 10px;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          padding: 6px 11px 6px 14px;
          font-size: 15px;
          font-weight: 800;
          line-height: 20px;
          cursor: pointer;

          &::after {
            content: '';
            display: inline-block;
            width: 21px;
            height: 21px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            margin-left: 4px;
            background-image: url('../assets/img/eyes-right.svg');

            @media (max-width: 575.98px) {
              width: 16px;
              height: 16px;
            }
          }

          &:hover::after {
            background-image: url('../assets/img/eyes-down.svg');
          }
        }
      }
    }
  }

  .more-info {
    border-top: 2px solid black;
    background-color: #f2f7ff;
    padding-inline: 100px;
    padding-top: 60px;
    padding-bottom: 56px;

    @media (max-width: 575.98px) {
      padding-inline: 21px;
      padding-top: 32px;
      padding-bottom: 32px;
    }

    & > p {
      @media (max-width: 575.98px) {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      span {
        font-size: 18px;
        line-height: 20px;
        font-weight: 800;

        @media (max-width: 575.98px) {
          font-size: 15px;
          line-height: 16px;
        }
      }

      button {
        flex-shrink: 0;
        display: inline-flex;
        gap: 1px;
        align-items: flex-end;
        margin-left: 7px;
        padding: 0;
        background: transparent;
        border: none;
        border-bottom: 1px solid #0e3d97;
        color: #0e3d97;
        font-size: 15px;
        line-height: 1;
        cursor: pointer;

        @media (max-width: 575.98px) {
          font-size: 12px;
        }
      }
    }

    .parties {
      margin-top: 28px;

      .party {
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        @media (max-width: 575.98px) {
          display: grid;
          grid-template-columns: 4fr 1fr;
          margin-bottom: 18px;
        }

        .no-answers {
          color: #525252;
        }

        label {
          flex: 1.25;
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 15px;
          line-height: 18px;
          font-weight: 800;
          margin-right: 20px;

          &.no-answers {
            color: #525252;
            margin-left: 16px;
            cursor: default;
          }

          @media (max-width: 575.98px) {
            grid-row: 1;
            grid-column: 1;
          }

          input[type='checkbox'] {
            flex-shrink: 0;
            appearance: none;
            background-color: transparent;
            margin: 2px 0 0 0;
            width: 16px;
            height: 16px;
            border: 1px solid black;
            border-radius: 4px;
            transform: translateY(-0.075em);
            cursor: pointer;
            position: relative;

            &:checked {
              background-color: #ffd100;

              &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 9px;
                height: 5px;
                border: solid black;
                border-width: 0 0 2px 2px;
                transform: scale(1) rotate(-45deg) translateX(-12%) translateY(90%);
              }
            }
          }

          .party-image {
            flex-shrink: 0;
            margin-left: 16px;
            margin-right: 9px;
            width: 36px;
            height: 36px;
            background-color: #ffffff;
            border: 1px solid black;
            border-radius: 9999px;
            object-fit: contain;
          }
        }

        .progress {
          flex: 2;
          height: 20px;
          background-color: #ffffff;
          border: 1px solid black;
          border-radius: 10px;
          overflow: hidden;

          @media (max-width: 575.98px) {
            grid-row: 2;
            grid-column: 1 / -1;
            margin-left: 32px;
            margin-top: 8px;
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

        .party-percentage {
          flex: 0.25;
          text-align: right;
          font-size: 15px;
          line-height: 18px;
          font-weight: 500;

          @media (max-width: 575.98px) {
            grid-row: 1;
            grid-column: 2;
          }
        }

        p {
          flex: 2;
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          color: #525252;

          @media (max-width: 575.98px) {
            grid-row: 2;
            grid-column: 1 / -1;
            margin-left: 32px;
            margin-top: 8px;
          }

          & + span {
            flex: 0.25;
            color: #525252;
          }
        }
      }
    }
  }
}

.share-button-desktop {
  width: 200px;
  height: 200px;
  background-color: transparent;
  border: none;
  background-image: url("../assets/img/deli.png");
  background-size: contain;
  z-index: 1;
  position: fixed;
  right: 30px;
  top: 50%;
  animation-name: spin;
  animation-duration: 4000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  cursor: pointer;

  &.copied {
    background-image: url("../assets/img/skopirana.png");
    animation-play-state: paused;
  }
  
  &:hover {
    // animation-play-state: paused;
  }
}

@keyframes spin {
  from {
    transform: translateY(-50%) rotate(0deg);
  }

  to {
    transform: translateY(-50%) rotate(360deg);
  }
}

.share-button-mobile-wrapper {
  text-align: center;
  margin-bottom: 40px;
}

.share-button-mobile {
  width: 200px;
  height: 200px;
  background-color: transparent;
  border: none;
  background-image: url("../assets/img/deli.png");
  background-size: contain;
  animation-name: spin-mobile;
  animation-duration: 4000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  &.copied {
    background-image: url("../assets/img/skopirana.png");
    // animation-play-state: paused;
  }

  &:hover {
    // animation-play-state: paused;
  }
}

@keyframes spin-mobile {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
