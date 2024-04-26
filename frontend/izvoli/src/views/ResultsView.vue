<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const storeInitialized = computed(() => store.getters.getStoreInitialized);
const quizFinished = computed(() => store.getters.getQuizFinished);
const parties = computed(() => store.getters.getParties);
const results = computed(() => store.getters.getResults);
const chosenParties = ref([])

const restartQuiz = () => {
    store.dispatch("clearStore");
    router.push("/");
}

const share = () => {
    navigator.clipboard.writeText("https://volitvomat.lb.djnd.si/").then(function () {
        alert('Povezava je skopirana v odložišče!')
    }, function () {
        // ni se skopiralo ...
    });
};

const compareWithWinningParties = () => {
    const parties = [...results.value.map(res => res.party_id)]
    parties.splice(3)
    store.commit('setPartiesToCompare', { "parties": parties })
    router.push("/rezultati/0")
}

const compareWithChosenParties = () => {
    store.commit('setPartiesToCompare', { "parties": chosenParties.value })
    router.push("/rezultati/0")
}

const compareWithAllParties = () => {
    chosenParties.value = [...results.value.map(res => res.party_id)]
}

onMounted(() => {
    if (!storeInitialized.value) {
        store.dispatch("initializeStore").then((quiz_finished) => {
            if (!quiz_finished) {
                router.push("/");
            }
        })
    }
    if (!quizFinished.value) {
        router.push("/");
    }
})

</script>

<template>
    <main class="container">
        <div class="body" v-if="results.length > 0">
            <div class="content">
                <h1>Najbolj se ujemaš s:</h1>
                <div class="winners">
                    <div v-for="result in results" :key="result.party_id" class="">
                        <div class="party">
                            <img :src="parties[result.party_id].image" alt="" class="party-image" />
                            <p class="party-name">{{ parties[result.party_id].name }}</p>
                            <p>{{ result.percentage }} %</p>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="yellow-button" @click="compareWithWinningParties">
                        Primerjaj svoje odgovore s temi strankami
                        <img src="../assets/img/puscica.svg" />
                    </button>
                </div>
            </div>
            <div class="more-info">
                <p><span>Izberi stranke za primerjavo</span><button @click="compareWithAllParties">Izberi vse
                        stranke</button></p>

                <div v-for="party in results" :key="party.party_id" class="party">
                    <label :for="`chosen-party-${party.party_id}`">
                        <input type="checkbox" :id="`chosen-party-${party.party_id}`" :value="party.party_id"
                            v-model="chosenParties">
                        <img :src="parties[party.party_id].image" class="party-image" />
                        {{ parties[party.party_id].name }}
                    </label>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :aria-valuenow="party.percentage" aria-valuemin="0"
                            :aria-valuemax="100" :style="{ width: `${party.percentage}%` }"
                            :class="{'border-end': party.percentage < 100}">
                        </div>
                    </div>
                    <span>{{ party.percentage }} %</span>
                </div>

                <div class="big-button-wrapper">
                    <button class="yellow-button" @click="compareWithChosenParties">
                        Primerjaj svoje odgovore s temi strankami
                        <img src="../assets/img/puscica.svg" />
                    </button>
                </div>
            </div>
        </div>

        <div class="body">
            <div class="content">
                <h2>Primerjaj svoja stališča z drugimi evropskimi strankami</h2>
                <p>Neki kratek tagline, kaj se tu zgodi. Kao evropski spirit pa to bla bla bla. </p>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>

.body {
    margin-bottom: 50px;
}

.content {
    padding: 50px;
    text-align: center;
}

h1 {
    margin-bottom: 20px;
}

.winners {
    display: flex;
    justify-content: center;

    .party {
        color: black;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 10px;

        .party-image {
            width: 80px;
            height: 80px;
            border: 1px solid black;
            border-radius: 40px;
            margin-bottom: 10px;
        }

        p {
            font-size: 15px;
            font-weight: 500;
        }

        .party-name {
            font-size: 20px;
            font-weight: 800;
        }
    }
}

.yellow-button {
    background-color: #FFE368;
    border: 2px solid black;
    border-radius: 20px;
    margin-top: 30px;
    display: inline-flex;
    align-items: center;
    padding: 16px;
    font-size: 18px;
    font-weight: 800;
    line-height: 20px;
    cursor: pointer;

    img {
        width: 28px;
        margin-left: 10px;
    }

    // &:hover {
    //     background-color: #FFE368;
    // }
}

.more-info {
    border-top: 2px solid black;
    background-color: #F2F7FF;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 50px 100px;

    &>p {
        font-size: 18px;
        font-weight: 800;
        margin-bottom: 20px;
        
        button {
            background-color: inherit;
            border: none;
            padding: 0;
            border-bottom: 1px solid #0E3D97;
            color: #0E3D97;
            font-size: 15px;
            line-height: 16px;
            cursor: pointer;
            margin-left: 20px;
        }
    }

    .party {
        display: flex;
        align-items: center;
        margin: 15px 0;

        label {
            display: flex;
            align-items: center;
            cursor: pointer;
            width: 25%;

            .party-image {
                width: 34px;
                height: 34px;
                border: 1px solid black;
                border-radius: 18px;
                margin: 0 10px;
            }
        }

        .progress {
            margin: 0;
            width: 300px;
            height: 20px;
            background-color: #ffffff;
            border: 1px solid black;
            border-radius: 10px;
            overflow: visible;

            .progress-bar {
                background-color: #65A3FF;
                border-radius: 10px;
                height: 100%;
                position: relative;
                overflow: visible;
                transition: width 0.5s;
        
                &.border-end {
                    border-right: 1px solid black;
                }
            }
        }

        span {
            margin-left: 10px;
            font-size: 15px;
            font-weight: 500;
        }
    }

    .big-button-wrapper {
        text-align: center;
    }
}

// @media (min-width: 1200px) {
//     .container {
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//     }
// }

</style>