<template>
  <div id="app">
    <Header />
    <Main />
  </div>
</template>

<script lang="ts">
import Header from "./layout/Header.vue"
import Main from "./layout/main.vue";

export default {
  name: "App",
  components: {
    Header,
    Main,
  },
};
</script>

<style lang="scss">
@import "~vue-ionicons/ionicons.scss";
@import "scss/main";
</style>
