<template>
  <div id="app">
    <Header />
    <Main />
  </div>
</template>

<script>
import Header from "./layout/Header.vue";
import Main from "./layout/main.vue";
// eslint-disable-next-line
import apollo_client from "./graphql/server_conn";
export default {
  name: "App",
  components: {
    Header,
    Main
  },
  created() {
    apollo_client(navigator.userAgentData.brands);
  }
};
</script>

<style lang="scss">
@import "~vue-ionicons/ionicons.scss";
@import "scss/main";
</style>
