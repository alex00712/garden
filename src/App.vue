<template>
  <div class = "container-fluid">
    <Alert/>
    <router-view/>
  </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import Alert from "@/components/Alert.vue"
    export default defineComponent({
        name: 'App',
        components: {
          Alert,
        },
    });
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Roboto',Arial,sans-serif;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
