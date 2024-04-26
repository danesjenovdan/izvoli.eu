<script>
import { ref, toRef, onMounted, onBeforeUnmount, computed } from 'vue';

export default {
    props: {
        party: Object,
        answer: Object
    },
    setup(props, ctx) {
        const party = toRef(props, 'party');
        const answer = toRef(props, 'answer');
        const show = ref(false);

        return {
            party,
            answer,
            show,
        }
    }
}
</script>

<template>
    <div class="party-element">
        <div class="head">
            <div class="name">
                <img :src="party.image" alt="" />
                <p>{{ party.name }}</p>
            </div>
            <button @click="show = true" v-if="!show">
                Prikaži
                <img src="../assets/img/puscica-trikotnik-modra.svg" />
            </button>
            <button @click="show = false" v-if="show">
                Skrij
                <img src="../assets/img/puscica-trikotnik-modra.svg" />
            </button>
        </div>
        <p v-if="show">{{ answer.comment }}</p>
    </div>
</template>

<style scoped lang="scss">

.party-element {
    padding: 10px 0;
    border-bottom: 1px solid black;

    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
            display: flex;
            align-items: center;
            font-weight: 800;

            img {
                width: 34px;
                height: 34px;
                object-fit: cover;
                border-radius: 16px;
                border: 1px solid black;
                margin-right: 4px;
                flex-shrink: 0;
            }
        }

        button {
            flex-shrink: 0;
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
            }
        }
    }

    &>p {
        font-size: 12px;
        line-height: 16px;
    }
}

</style>