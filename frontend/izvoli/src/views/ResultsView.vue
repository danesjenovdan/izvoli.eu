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
// const firstPlace = computed(() => {
//     let winnersNo = 1;
//     const winnerPercentage = results.value[0].percentage;
//     // let secondPercentage = results.value[1].percentage;
//     // while (secondPercentage === winnerPercentage) {
//     //     winnersNo++;
//     //     // covered all results
//     //     if (winnersNo === results.value.length) {
//     //         break;
//     //     } else {
//     //         secondPercentage = results.value[winnersNo].percentage;
//     //     }
//     // }
//     return winnersNo;
// });

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
                        <RouterLink :to="`/rezultati/0`" class="party">
                            <div class="party-image"></div>
                            <p class="party-name">{{ parties[result.party_id].name }}</p>
                            <p>{{ result.percentage }} %</p>
                            <!-- <div class="party-img">
                        <img :src="`${parties[results[index - 1].party_id].image_url}`" />
                    </div> -->
                        </RouterLink>
                    </div>
                </div>
                <div>
                    <button class="yellow-button">
                        Primerjaj svoje odgovore s temi strankami
                        <img src="../assets/img/puscica.svg" />
                    </button>
                </div>
            </div>
            <div class="more-info">
                <p><span>Izberi stranke za primerjavo</span><button>Izberi vse stranke</button></p>
                <div>
                    <button class="yellow-button">
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

    <!-- <div class="single-winner" v-if="firstPlace === 1">

            <p>Najbolj se ujemaš s</p>

            <div class="match">
                <img src="../assets/img/oseba.svg" class="person" />
                <img src="../assets/img/zvezda.svg" class="star" />
                <RouterLink :to="`/rezultati/${results[0].party_id}`">
                    <img :src="`${parties[results[0].party_id].image_url}`" class="person" />
                </RouterLink>
            </div>

            <div style="text-align: center;">
                <RouterLink :to="`/rezultati/${results[0].party_id}`" class="white-button-border">
                    <div>
                        <span class="party-name">{{ parties[results[0].party_id].name }}:</span>
                        <span>{{ results[0].percentage }} %</span>
                    </div>
                </RouterLink>
            </div>

            <div class="divider"></div>

            <div class="match-button-group">
                <RouterLink :to="`/rezultati/${results[1].party_id}`" class="button">
                    <span class="party-name">{{ parties[results[1].party_id].name }}:</span>
                    <span>{{ results[1].percentage }} %</span>
                    <div class="party-img">
                        <img :src="`${parties[results[1].party_id].image_url}`" />
                    </div>
                </RouterLink>
            </div>

            <div class="match-button-group">
                <RouterLink :to="`/rezultati/${results[2].party_id}`" class="button">
                    <span class="party-name">{{ parties[results[2].party_id].name }}:</span>
                    <span>{{ results[2].percentage }} %</span>
                    <div class="party-img">
                        <img :src="`${parties[results[2].party_id].image_url}`" />
                    </div>
                </RouterLink>
            </div>

        </div>

        <p v-if="results[0].percentage === results[1].percentage">Najbolj se ujemaš s strankami</p>

        <div class="two-winners" v-if="firstPlace === 2">
            <div class="flex">
                <div class="match">
                    <img src="../assets/img/oseba.svg" class="person" />
                    <img src="../assets/img/zvezda.svg" class="star" />
                </div>
                <div>
                    <div class="match-button-group">
                        <RouterLink :to="`/rezultati/${results[0].party_id}`" class="button">
                            <span class="party-name">{{ parties[results[0].party_id].name }}:</span>
                            <span>{{ results[0].percentage }} %</span>
                            <div class="party-img">
                                <img :src="`${parties[results[0].party_id].image_url}`" />
                            </div>
                        </RouterLink>
                    </div>
                    <div class="match-button-group">
                        <RouterLink :to="`/rezultati/${results[1].party_id}`" class="button">
                            <span class="party-name">{{ parties[results[1].party_id].name }}:</span>
                            <span>{{ results[1].percentage }} %</span>
                            <div class="party-img">
                                <img :src="`${parties[results[1].party_id].image_url}`" />
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="match-button-group">
                <RouterLink :to="`/rezultati/${results[2].party_id}`" class="button">
                    <span class="party-name">{{ parties[results[2].party_id].name }}:</span>
                    <span>{{ results[2].percentage }} %</span>
                    <div class="party-img">
                        <img :src="`${parties[results[2].party_id].image_url}`" />
                    </div>
                </RouterLink>
            </div>
        </div>

        <div class="more-winners" v-if="firstPlace > 2">
            <div class="match">
                <img src="../assets/img/oseba.svg" class="person" />
                <img src="../assets/img/zvezda.svg" class="star" />
            </div>
            <div>
                <div v-for="index in firstPlace" :key="index" class="match-button-group">
                    <RouterLink :to="`/rezultati/${results[index - 1].party_id}`" class="button">
                        <span class="party-name">{{ parties[results[index - 1].party_id].name }}:</span>
                        <span>{{ results[index - 1].percentage }} %</span>
                        <div class="party-img">
                            <img :src="`${parties[results[index - 1].party_id].image_url}`" />
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div> -->

    <!-- <div class="button-group">
                <RouterLink to="/statistika" class="yellow-button">
                    poglej podrobne rezultate <span class="search-icon"></span>
                </RouterLink>
                <div class="yellow-button hover-pointer" @click="share">
                    deli volitvomat <span class="share-icon"></span>
                </div>
                <p class="fine-print">Želiš deliti svoj rezultat? Deli posnetek zaslona.</p>
                <div class="yellow-button hover-pointer" @click="restartQuiz">
                    reši ponovno
                </div>
                <h5>Vse odgovore strank najdeš na <a href="https://glas-ljudstva.si/"
                        target="_blank">glas-ljudstva.si/</a>.
                </h5>
            </div> -->
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

        .party-image {
            width: 80px;
            height: 80px;
            border: 2px solid black;
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
    background-color: #FFFFFF;
    border: 2px solid black;
    border-radius: 20px;
    margin-top: 30px;
    display: inline-flex;
    align-items: center;
    padding: 16px;
    font-size: 18px;
    font-weight: 800;
    line-height: 20px;

    img {
        width: 28px;
        margin-left: 10px;
    }

    &:hover {
        background-color: #FFE368;
    }
}

.more-info {
    border-top: 2px solid black;
    background-color: #F2F7FF;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 50px 100px;
}

// @media (min-width: 1200px) {
//     .container {
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//     }
// }

.match {
    display: flex;
    justify-content: center;
    position: relative;
    margin: 30px 0;
}

.person {
    width: 140px;
    margin: 10px;
    border-radius: 50%;
}

.star {
    width: 60px;
    position: absolute;
}

.divider {
    margin: 20px 0;
}

.white-button-border {
    &>div {
        display: flex;
        align-items: center;
    }

    .party-name {
        font-family: 'Manrope', sans-serif;
        font-size: 20px;
        font-weight: 400;
    }

    span:last-of-type {
        // letter-spacing: 1.5px;
        padding-left: 10px;
        flex-shrink: 0;
    }
}

.match-button-group {
    text-align: center;

    .button {
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-align: left;
        width: 220px;
        // background-color: #fffaf7;
        padding: 10px 0 10px 30px;
        margin: 10px 0;
        border-radius: 30px;
        font-size: 16px;
        font-weight: 600;
        color: #161615;
        text-decoration: none;
        background-image: url("@/assets/img/bel-gumb.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .party-name {
        max-width: 40%;
    }

    span:last-of-type {
        font-family: 'Grandstander', cursive;
        font-size: 24px;
        font-weight: 700;
        // letter-spacing: 1.5px;
        padding-left: 10px;
        flex-shrink: 0;
    }

    .party-img {
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);

        img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
        }
    }
}

.yellow-button span {
    margin-left: 10px;
}

.yellow-button .search-icon {
    width: 30px;
    height: 30px;
}

p.fine-print {
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    margin-top: 5px;
}

.white-button-border {
    font-family: 'Manrope', sans-serif;
    font-size: 16px;
    padding: 0;

    &>div {
        padding: 40px;
    }

    span {
        font-family: 'Grandstander', cursive;
        font-size: 30px;
        font-weight: 700;
    }
}

.two-winners {
    margin-top: 30px;
    margin-bottom: 60px;

    .flex {
        display: flex;
        align-items: center;
    }

    .match {
        margin: 0;
    }
}

.more-winners {
    margin-top: 30px;
    margin-bottom: 60px;
    display: flex;
}

.two-winners,
.more-winners {
    .match {
        justify-content: start;
        align-items: start;
    }

    .match-button-group {
        .button {
            width: 180px;
        }

        .party-img {
            left: -30px;
        }
    }
}
</style>