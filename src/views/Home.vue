<template>
  <div>
    <Header/>
    <PrevueImages/>
    <Products number="8" />
    <About/>
    <Reviews/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Header from '@/components/Header.vue'; // @ is an alias to /src
import PrevueImages from '@/components/PrevueImages.vue'
import Products from '@/components/Products.vue'
import About from '@/components/About.vue'
import Reviews from '@/components/Reviews.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    PrevueImages,
    Products,
    About,
    Reviews
  },
});
</script>

