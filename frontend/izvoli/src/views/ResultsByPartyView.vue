<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import PartyAnswer from "@/components/PartyAnswer.vue";


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
const question = computed(() => store.state.questions[questionId.value]);
const answers = computed(() => store.getters.getAnswers);

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
                    <RouterLink :to="`/rezultati/${parseInt(idParam) - 1}`" class="back"
                        :class="{ 'hidden': idParam == 0 }">
                        Nazaj
                    </RouterLink>
                    <RouterLink :to="`/rezultati/${parseInt(idParam) + 1}`" class="skip"
                        :class="{ 'hidden': idParam >= questionsNo - 1 }">
                        Naprej
                    </RouterLink>
                </div>
            </div>

            <div class="more-info">
                <div class="my-answer">
                    <span>Tvoj odgovor</span>
                    <div v-if="answers[idParam+1] == 'YES'">
                        <img src="../assets/img/strinjam.svg" />
                        Se strinjam
                    </div>
                    <div v-if="answers[idParam+1] == 'NO'">
                        <img src="../assets/img/ne-strinjam.svg" />
                        Se ne strinjam
                    </div>
                    <div v-if="answers[idParam+1] == 'NEUTRAL'">
                        <img src="../assets/img/strinjam.svg" />
                        Neopredeljeno
                    </div>
                </div>
                <div class="parties">
                    <div v-for="(party, party_id) in question.parties" :key="party_id" class="party">
                        <div class="head">
                            slika
                            <span>{{ party.name }}</span>
                        </div>
                        <PartyAnswer :party="party"></PartyAnswer>
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

    .my-answer {
        background-color: #FFFFFF;
        border-bottom: 1px solid black;
        padding: 20px;
        font-size: 18px;
        font-weight: 800;
        display: flex;
        align-items: center;

        &>span {
            min-width: 180px;
        }

        &>div {
            display: flex;
            align-items: center;
        }

        img {
            width: 28px;
            margin-right: 10px;
            margin-bottom: 5px;
        }
    }

    .parties {
        display: flex;

        font-size: 15px;
        font-weight: 800;

        .party {
            display: flex;
            padding: 20px 0;
            width: 100%;
            border-bottom: 1px solid black;
        }

        .head {
            // font-size: 15px;
            // font-weight: 800;
            min-width: 200px;
        }

        
    }
}
</style>