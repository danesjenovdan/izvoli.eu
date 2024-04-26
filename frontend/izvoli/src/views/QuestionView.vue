<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import PartyElement from "@/components/PartyElement.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();

const idParam = ref(parseInt(route.params.id));
const moreInfo = ref(false);

const screenWidth = ref(window.innerWidth);
const desktop = computed(() => screenWidth.value > 992);

const storeInitialized = computed(() => store.getters.getStoreInitialized);
const questionsList = computed(() => store.getters.getQuestionsList);
const questionsNo = computed(() => questionsList.value.length);
const questionId = computed(() => questionsList.value[idParam.value]);
// const progress = computed(() => Math.round(idParam.value / questionsNo.value * 100));
const question = computed(() => store.state.questions[questionId.value]);
const answers = computed(() => store.getters.getAnswers);
const parties = computed(() => store.getters.getParties);


const skipQuestion = (id, answer) => {
    // remove saved answer
    store.commit('removeAnswer', { id, answer });
    if (idParam.value < questionsNo.value - 1) {
        router.push(`/vprasanje/${parseInt(idParam.value) + 1}`);
    } else {
        store.commit('calculateResults');
        router.push('/rezultati');
    }
};

const saveAnswer = (id, answer) => {
    // save answer
    store.commit('addAnswer', { id, answer });
    // navigate to next question
    if (idParam.value < questionsNo.value - 1) {
        router.push(`/vprasanje/${parseInt(idParam.value) + 1}`);
    } else {
        // last question -> calculate results and navigate to results
        store.commit('calculateResults');
        router.push('/rezultati');
    }
};

watch(
    () => route.params.id,
    async (id) => {
        idParam.value = id;
        // console.log(idParam.value, questionsNo.value, progress.value)
    }
);

onMounted(() => {
    if (!storeInitialized.value) {
        store.dispatch("initializeStore").then((quiz_finished) => {
            if (quiz_finished) {
                router.push("/rezultati");
            }
        })
    }
});

// router.beforeEach((to, from) => {
//     if (moreInfo.value) {
//         moreInfo.value = false;
//         return false;
//     }
// });

</script>

<template>
    <main class="container">
        <div class="body">
            <div class="progress-bar">
                <div class="progress-number">{{ idParam }} / {{ questionsNo }}</div>
                <div v-for="qNo in  questionsNo " class="progress-circle"></div>
            </div>
            <div class="content">
                <span>Kategorija vprašanja</span>
                <h1>{{ question.title }}</h1>
                <p>{{ question.description }}</p>
                <div class="buttons">
                    <RouterLink :to="`/vprasanje/${parseInt(idParam) - 1}`" class="back"
                        :class="{'hidden': idParam == 0}">
                        <img src="../assets/img/puscica-trikotnik.svg" />
                        <img src="../assets/img/puscica-trikotnik.svg" />
                        Nazaj
                    </RouterLink>
                    <button @click="saveAnswer(questionId, 'NO')" class="disagree">
                        <img src="../assets/img/ne-strinjam.svg" />
                        Se ne strinjam
                    </button>
                    <button @click="saveAnswer(questionId, 'YES')" class="agree">
                        <img src="../assets/img/strinjam.svg" />
                        Se strinjam
                    </button>
                    <button @click="skipQuestion(questionId, true)" class="skip">
                        Preskoči
                        <img src="../assets/img/puscica-trikotnik.svg" />
                        <img src="../assets/img/puscica-trikotnik.svg" />
                    </button>
                </div>
            </div>

            <div class="more-info">
                <div class="show-hide">
                    <img src="../assets/img/eyes-right.svg" v-if="!moreInfo" />
                    <img src="../assets/img/eyes-down.svg" v-if="moreInfo" />
                    <span>Kaj mislijo stranke?</span>
                    <button @click="moreInfo = true" v-if="!moreInfo">
                        Prikaži
                        <img src="../assets/img/puscica-trikotnik-modra.svg" />
                    </button>
                    <button @click="moreInfo = false" v-if="moreInfo">
                        Skrij
                        <img src="../assets/img/puscica-trikotnik-modra.svg" />
                    </button>
                </div>
                <div class="parties" v-if="moreInfo">
                    <div>
                        <div class="head">Se strinja</div>
                        <PartyElement v-for="(answer, party_id) in question.parties" :key="party_id"
                            :party="parties[party_id]" :answer="answer">
                        </PartyElement>
                    </div>
                    <div>
                        <div class="head">Se ne strinja</div>
                        <PartyElement v-for="(answer, party_id) in question.parties" :key="party_id"
                            :party="parties[party_id]" :answer="answer">
                        </PartyElement>
                    </div>
                    <div>
                        <div class="head">Neopredeljena / ni odgovora</div>
                        <PartyElement v-for="(answer, party_id) in question.parties" :key="party_id"
                            :party="parties[party_id]" :answer="answer">
                        </PartyElement>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">

.hidden {
    visibility: hidden;
}

// .container {
//     padding: 0;

//     @media (min-width: 992px) {
//         max-width: 960px;
//     }

//     @media (min-width: 1200px) {
//         max-width: 1140px;
//     }
// }

main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}

.progress-bar {
    border-bottom: 2px solid black;
    background-color: #F2F7FF;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 10px 24px;
    display: flex;
    align-items: center;
}

.progress-number {
    font-size: 12px;
    line-height: 18px;
    font-weight: 600;
    padding-right: 20px;
}

.progress-circle {
    border: 2px solid black;
    border-radius: 8px;
    width: 14px;
    height: 14px;
    position: relative;
    
    &:not(:last-child) {
        margin-right: 10px;

        &::after {
            content: "";
            height: 2px;
            width: 10px;
            background-color: black;
            position: absolute;
            right: -12px;
            top: 4px;
        }
    }

    &.checked {
        background-color: #FFE468;
    }

    &.active {
        background-color: #7FB2FF;
        position: relative;

        &::before {
            content: "";
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background-color: black;
        }
    }

}

.content {
    padding: 50px 100px;

    &>span {
        background-color: #FFFFFF;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 400;
        padding: 2px 4px;
    }

    h1 {
        margin-bottom: 20px;
        font-size: 32px;
        line-height: 40px;
        font-weight: 700;
    }

    &>p {
        font-size: 20px;
        line-height: 32px;
        margin-bottom: 30px;
    }

    .buttons {
        display: flex;
        align-items: end;
    }

    .agree,
    .disagree,
    .back,
    .skip {
        border: 2px solid black;
        border-radius: 20px;
        margin: 0 10px;
        display: inline-flex;
        align-items: center;
        cursor: pointer;   
    }

    .agree, .disagree {
        background-color: #FFFFFF;
        padding: 16px;
        font-size: 18px;
        font-weight: 800;
        line-height: 20px;

        img {
            width: 28px;
            margin-right: 10px;
        }

        &:hover {
            background-color: #FFE368;
        }
    }

    .back,
    .skip {
        background-color: #FFFBE9;
        padding: 16px;
        font-size: 10px;
        font-weight: 500;
        line-height: 10px;

        img {
            width: 14px;
            transform: rotate(90deg);

            &:first-of-type {
                margin-left: 5px;
                margin-right: -5px;
            }
        }

        &:hover {
            background-color: #FFFFFF;
        }
    }

    .back {
        color: black;
        text-decoration: none;
    }

    .skip {
        img {
            transform: rotate(-90deg);
        }
    }
}

// @media (min-width: 768px) {
//   main {
//     width: 720px;
//   }
// }

.more-info {
    border-top: 2px solid black;
    background-color: #F2F7FF;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 50px 100px;

    .show-hide {
        span {
            font-size: 18px;
            line-height: 20px;
            font-weight: 800;
            margin: 0 5px;
        }

        &>img {
            width: 20px;
        }

        button {
            background-color: inherit;
            border: none;
            padding: 0;
            border-bottom: 1px solid #0E3D97;
            color: #0E3D97;
            font-size: 15px;
            line-height: 16px;
            cursor: pointer;

            img {
                width: 10px;
            }
        }
    }

    .parties {
        display: flex;
        margin-top: 20px;

        &>div {
            flex: 1;
            padding-left: 10px;
            padding-right: 10px;

            &:first-child {
                padding-left: 0;
            }

            &:last-child {
                padding-right: 0;
            }
        }

        .head {
            font-size: 13px;
            font-weight: 600;
            line-height: 18px;
            background-color: #E2EDFF;
            padding: 5px 8px;
        }
    }
}
</style>