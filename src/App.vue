<template>
  <div id="app">
    <!-- <router-link to="/main">主页</router-link> -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app",
};
</script>
<style lang='scss'>
#app {
  // color: $theme-color;
  height: 100vh;
}
</style>
