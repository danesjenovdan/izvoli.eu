<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from "@/components/Footer.vue";

</script>

<template>
  <header class="header-wrapper">
    <img src="./assets/img/header-logo.svg" class="header-logo" />
  </header>
  <RouterView />
  <Footer></Footer>
</template>

<style lang="scss">
@import "@/assets/base.css";

.header-wrapper {
  text-align: center;
  padding: 20px 0;
}
</style>
