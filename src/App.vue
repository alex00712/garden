<template>
  <div class = "container-fluid">
    <Alert/>
    <ShowOneCard/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import Alert from "@/components/Alert.vue"
    import ShowOneCard from '@/components/ShowOneCard'
    // import vSelect from 'vue-select'
    export default defineComponent({
        name: 'App',
        components: {
          Alert,
          ShowOneCard
          // 'v-select': vSelect
        },
        async mounted() {
          this.$store.dispatch('setMyCardA')
          this.$store.dispatch('isTokenForAuth')
          this.$store.dispatch('fetchPosts')
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
// body{
//   padding-bottom: 50px;

// }

html, body{
          ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
            background-color: #969696;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #ffffff;
            border-radius: 9em;
        }

        ::-webkit-scrollbar-thumb:hover {
            background-color: #253861;
        }
}
  .fade-enter-active, .fade-leave-active {
    transition: all .6s ease;
  }
  .fade-enter-from, .fade-leave-to{
    // transform: translateX(2em);
    transform: scale(.5);
    opacity: 0;
  }
</style>
