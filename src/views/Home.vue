<template>
    <div>
      <Header  />
      <PrevueImages/>
      <Products number="8" />
      <About/>
      <Reviews/>
      <Contacts/>
      <Footer/>
      <BottomCart/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


import Header from '@/components/Header.vue'; // @ is an alias to /src
import PrevueImages from '@/components/PrevueImages.vue'
import Products from '@/components/Products.vue'
import About from '@/components/About.vue'
import Reviews from '@/components/Reviews.vue'
import Contacts from '@/components/Contacts.vue'
import Footer from '@/components/Footer.vue'
import BottomCart from '@/components/BottomCart.vue'

export default defineComponent({

  name: 'Home',
  components: {
    Header,
    PrevueImages,
    Products,
    About,
    Reviews,
    Contacts,
    Footer,
    BottomCart
  },
});
</script>

<style lang="css">
</style>

