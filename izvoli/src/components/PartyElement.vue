<script setup>
import { ref } from "vue";

defineProps({
  party: {
    type: Object,
    required: true,
  },
  answer: {
    type: Object,
    required: true,
  },
});

const show = ref(false);
</script>

<template>
  <div :class="['party-element', { 'our-answers': party.our_answers }]">
    <div v-if="party.our_answers" class="alert">
      <div>Niso odgovorili ampak smo mi pregledali njihovo stališče!</div>
    </div>
    <div class="head">
      <div class="name">
        <img :src="party.image" alt="" />
        <p>{{ party.name }}</p>
      </div>
      <div class="buttons">
        <button v-if="!show && answer.comment" @click="show = true">
          Razlaga
          <img src="../assets/img/puscica-trikotnik.svg" alt="" />
        </button>
        <button
          v-if="show && answer.comment"
          class="hide"
          @click="show = false"
        >
          Skrij
          <img src="../assets/img/puscica-trikotnik.svg" alt="" />
        </button>
      </div>
    </div>
    <p v-if="show" class="comment">{{ answer.comment }}</p>
  </div>
</template>

<style scoped lang="scss">
.party-element {
  padding: 1rem 0.75rem;
  background-color: #fff;
  border-bottom: 1px solid black;

  &.our-answers {
    background-color: #fee;
  }

  .alert {
    margin-top: -0.25rem;
    margin-bottom: 0.5rem;
    padding: 0.25rem 0.5rem;
    background-color: #fcc;
    border: 1px solid #d00;
    color: #d00;
    font-size: 0.75rem;
    font-weight: 400;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 575.98px) {
      gap: 0.5rem;
    }

    .name {
      flex: 1;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      font-size: 1rem;
      line-height: 1.2;
      font-weight: 700;

      @media (max-width: 575.98px) {
        font-size: 0.75rem;
      }

      img {
        flex-shrink: 0;
        width: 2.25rem;
        height: 2.25rem;
        border: 1px solid black;
        border-radius: 50%;
        margin-right: 0.5rem;
        object-fit: contain;

        @media (max-width: 575.98px) {
          width: 2rem;
          height: 2rem;
          margin-right: 0;
        }
      }
    }

    .buttons {
      flex-basis: 90px;
      flex-shrink: 0;
      text-align: right;

      button {
        display: inline-flex;
        gap: 0.25rem;
        align-items: center;
        justify-content: space-between;
        min-width: 100px;
        margin-left: 0.5rem;
        padding-inline: 0.75rem;
        padding-block: 0.3rem 0.2rem;
        background: transparent;
        border: 1px solid #000;
        color: #000;
        font-size: 0.875rem;
        font-weight: 400;
        cursor: pointer;

        @media (max-width: 575.98px) {
          min-width: 90px;
          margin-left: 0;
          font-size: 0.75rem;
        }

        img {
          width: 0.75rem;
        }

        &.hide {
          img {
            transform: rotate(180deg);
          }
        }

        &:hover {
          background-color: #fff;
          box-shadow: 0 0 0 1px #000 inset;
        }

        &:focus-visible {
          outline: 2px solid #006fc3;
          outline-offset: 2px;
        }
      }
    }
  }

  .comment {
    padding-top: 1rem;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 400;
    display: block;

    @media (max-width: 575.98px) {
      font-size: 0.75rem;
    }
  }
}
</style>
