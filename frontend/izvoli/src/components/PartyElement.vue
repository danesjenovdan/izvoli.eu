<script setup>
import { ref } from 'vue'

defineProps({
  party: {
    type: Object,
    required: true
  },
  answer: {
    type: Object,
    required: true
  }
})

const show = ref(false)
</script>

<template>
  <div class="party-element">
    <div class="head">
      <div class="name">
        <img :src="party.image" alt="" />
        <p>{{ party.name }}</p>
      </div>
      <button @click="show = true" v-if="!show && answer.comment">
        Obrazložitev
        <img src="../assets/img/puscica-trikotnik-modra.svg" />
      </button>
      <button @click="show = false" v-if="show && answer.comment">
        Skrij
        <img src="../assets/img/krizec-moder.svg" class="hide" />
      </button>
    </div>
    <p v-if="show" class="comment">{{ answer.comment }}</p>
  </div>
</template>

<style scoped lang="scss">
.party-element {
  padding: 14px 0;
  border-bottom: 1px solid black;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      display: flex;
      gap: 9px;
      align-items: center;
      font-size: 15px;
      line-height: 18px;
      font-weight: 800;

      img {
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        object-fit: contain;
        border-radius: 9999px;
        border: 1px solid black;
      }
    }

    button {
      flex-shrink: 0;
      padding: 0;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #0e3d97;
      color: #0e3d97;
      font-size: 12px;
      line-height: 14px;
      cursor: pointer;

      img {
        width: 10px;
        vertical-align: middle;

        &.hide {
          width: 8px;
        }
      }
    }
  }

  .comment {
    margin-top: 10px;
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
