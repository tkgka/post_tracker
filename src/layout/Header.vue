<template>
  <header>
    <h1 class="brand">post_tracker</h1>
    <div class="links">
      <span
        @click="openURL('https://github.com/tkgka')"
      >
        <LogoGithubIcon :w="links.size" :h="links.size" />
      </span>
    </div>
  </header>
</template>


<script lang="ts">
import icons from "../components/icons";

export default {
  data() {
    return {
      links: {
        size: "32",
      },
    };
  },
  components: {
    ...icons,
  },
  name: "Header",
  methods: {
    openURL(url: string) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
</style>