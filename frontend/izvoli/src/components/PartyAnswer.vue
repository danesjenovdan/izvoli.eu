<script setup>
import { ref } from 'vue'

defineProps({
  party: {
    type: Object,
    required: true
  }
})

const show = ref(false)
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
      <button @click="show = true" v-if="!show && party?.comment">
        Obrazložitev
        <img src="../assets/img/puscica-trikotnik-modra.svg" />
      </button>
      <button @click="show = false" v-if="show && party?.comment">
        Skrij
        <img src="../assets/img/krizec-moder.svg" class="hide" />
      </button>
    </div>
    <p v-if="show" class="comment">{{ party?.comment }}</p>
  </div>
  <p v-if="show" class="comment on-mobile">{{ party?.comment }}</p>
</template>

<style scoped lang="scss">
.answer-wrapper {
  width: 100%;

  @media (max-width: 575.98px) {
    width: fit-content;
    margin-top: 4px;
  }

  .answer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 575.98px) {
      flex-direction: column;
      align-items: flex-end;
    }

    & > div {
      display: flex;
      align-items: center;

      img {
        width: 28px;
        margin-right: 10px;
        margin-bottom: 5px;

        @media (max-width: 575.98px) {
          width: 24px;
        }
      }
    }

    & > button {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 0;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #0e3d97;
      color: #0e3d97;
      font-size: 12px;
      line-height: 14px;
      font-weight: 400;
      cursor: pointer;

      @media (max-width: 575.98px) {
        margin-top: 8px;
      }

      img {
        width: 10px;

        &.hide {
          width: 8px;
        }
      }
    }
  }

}

.comment {
  padding-top: 18px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  display: block;

  @media (max-width: 575.98px) {
    display: none;
    font-size: 12px;
    line-height: 16px;
  }

  &.on-mobile {
    display: none;

    @media (max-width: 575.98px) {
      display: block;
      width: 100%;
    }
  }
}
</style>
