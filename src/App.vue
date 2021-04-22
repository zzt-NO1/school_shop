<template>
  <div id="app">
    <div v-if="$route.meta.keepAlive">
      <Head></Head>
    </div>
    <!--<Login/>-->
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import router from "../src/router/router";
import Head from "@/components/Head";
export default {
  name: 'App',
  components: {Head},
  router,

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
html{
  width: 100%;
  height: 100%;
}
body{
  background-image: url("../src/assets/img/bg7.jpg");
}
</style>
