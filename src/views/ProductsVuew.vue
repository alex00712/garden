<template>
  
    <div>
      <Header about = "../#about" contacts = "../#contacts"/>
      <Products/>
      <BottomCart/>
    </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';


import Header from '@/components/Header.vue'; // @ is an alias to /src
import Products from '@/components/Products.vue'
import BottomCart from '@/components/BottomCart.vue'

export default defineComponent({
  name: 'ProductsComponent',
  components: {
    Header,
    Products,
    BottomCart
  },
});
</script>

<style lang="css">

</style>
