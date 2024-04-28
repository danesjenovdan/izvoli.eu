<script>
import { ref, toRef, onMounted, onBeforeUnmount, computed } from 'vue';

export default {
    props: {
        party: Object,
    },
    setup(props, ctx) {
        const party = toRef(props, 'party');
        const show = ref(false);

        return {
            party,
            show,
        }
    }
}
</script>

<template>
    <div class="answer-wrapper">
        <div class="answer">
            <div v-if="party?.answer == 'YES'">
                <img src="../assets/img/strinjam.svg" />
                Se strinjam
            </div>
            <div v-if="party?.answer == 'NO'">
                <img src="../assets/img/ne-strinjam.svg" />
                Se ne strinjam
            </div>
            <div v-if="party?.answer == 'NEUTRAL'">
                <img src="../assets/img/neopredeljen.svg" />
                Neopredeljeno
            </div>
            <div v-if="!party">
                <img src="../assets/img/neopredeljen.svg" />
                Ni odgovora
            </div>
            <button @click="show = true" v-if="!show && party.comment">
                Obrazložitev
                <img src="../assets/img/puscica-trikotnik-modra.svg" />
            </button>
            <button @click="show = false" v-if="show && party.comment">
                Skrij
                <img src="../assets/img/puscica-trikotnik-modra.svg" />
            </button>
        </div>
        <p v-if="show">{{ party.comment }}</p>
    </div>
</template>

<style scoped lang="scss">
.answer-wrapper {
    width: 100%;
    line-height: 34px;

    .answer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &>div {
            display: flex;
            align-items: center;
        }

        &>button {
            background-color: inherit;
            border: none;
            padding: 0;
            border-bottom: 1px solid #0E3D97;
            color: #0E3D97;
            font-size: 12px;
            line-height: 14px;
            cursor: pointer;

            img {
                width: 10px;
                margin: 0;
            }
        }

        img {
            width: 28px;
            margin-right: 10px;
            margin-bottom: 5px;
        }

    }

    p {
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
    }
}

</style>