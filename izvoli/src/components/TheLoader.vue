<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
.loader {
  width: 3rem;
  height: 3rem;
  display: inline-block;
  position: relative;
  background: #000;
  animation: flipX 1s linear infinite;
}

@keyframes flipX {
  0% {
    transform: perspective(200px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(200px) rotateX(-180deg) rotateY(0deg);
  }
  100% {
    transform: perspective(200px) rotateX(-180deg) rotateY(-180deg);
  }
}
</style>
