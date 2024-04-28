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
const parties = computed(() => store.getters.getParties);
const partiesToCompare = computed(() => store.getters.getPartiesToCompare);

watch(
    () => route.params.id,
    async (id) => {
        idParam.value = id;
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
        <div class="body" v-if="question">
            <div class="progress-bar">
                <div class="progress-number">{{ parseInt(idParam) + 1 }} / {{ questionsNo }}</div>
                <div v-for="qNo in questionsNo " class="progress-circle" :class="{
                        'agree': answers[parseInt(qNo)] == 'YES',
                        'disagree': answers[parseInt(qNo)] == 'NO',
                        'neutral': !(`${parseInt(qNo)}` in answers) }">
                </div>
            </div>
            <div class="content">
                <span v-if="question.category">{{ question.category }}</span>
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
                    <div v-if="answers[parseInt(idParam)+1] == 'YES'">
                        <img src="../assets/img/strinjam.svg" />
                        Se strinjam
                    </div>
                    <div v-if="answers[parseInt(idParam)+1] == 'NO'">
                        <img src="../assets/img/ne-strinjam.svg" />
                        Se ne strinjam
                    </div>
                    <div v-if="!(`${parseInt(idParam) + 1}` in answers) ">
                        <img src="../assets/img/neopredeljen.svg" />
                        Neopredeljeno
                    </div>
                </div>
                <div class="parties">
                    <div v-for="party in partiesToCompare" :key="party" class="party">
                        <div class="head">
                            <img :src="parties[party].image" class="party-image" />
                            <span>{{ parties[party].name }}</span>
                        </div>
                        <PartyAnswer :party="question.parties[party]"></PartyAnswer>
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
    flex-shrink: 0;
}

.progress-circle {
    border: 1px solid black;
    border-radius: 9px;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    position: relative;

    &::before {
        content: "";
        width: 10px;
        height: 10px;
        display: block;
        margin-left: 3px;
        margin-top: 3px;
    }

    &:not(:last-child) {
        margin-right: 9px;

        &::after {
            content: "";
            height: 1px;
            width: 10px;
            background-color: black;
            position: absolute;
            right: -10px;
            top: 7px;
        }
    }

    &.agree {
        &::before {
            background-image: url("@/assets/img/strinjam.svg");
        }
    }

    &.disagree {
        &::before {
            background-image: url("@/assets/img/ne-strinjam.svg");
        }
    }

    &.neutral {
        &::before {
            background-image: url("@/assets/img/neopredeljen.svg");
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
        font-size: 15px;
        font-weight: 800;

        .party {
            display: flex;
            align-items: start;
            padding: 20px 0;
            width: 100%;
            border-bottom: 1px solid black;

            .party-image {
                width: 34px;
                height: 34px;
                border: 1px solid black;
                border-radius: 18px;
                margin: 0 10px;
            }
        }

        .head {
            min-width: 200px;
            display: flex;
            align-items: center;
            line-height: 34px;
        }

        
    }
}
</style>