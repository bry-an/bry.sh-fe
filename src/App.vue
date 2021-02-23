<template>
  <div class="app-wrapper">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=PT+Mono&display=swap');
@import '@/assets/reset.scss';
@import '@/assets/bry.scss';

body {
  box-sizing: border-box;
  background-color: $dark-purple;
}
.app-wrapper {
  width: 80%;
  margin: auto;
}

</style>
