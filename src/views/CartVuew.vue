<template>
  <div>
    <Payment/>
    <Header catalog="../#catalog" about = "../#about" contacts = "../#contacts"/>
    <Cart/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


import Header from '@/components/Header.vue'; // @ is an alias to /src
import Cart from '@/components/Cart.vue'
import Payment from '@/components/Payment.vue';

export default defineComponent({

  name: 'CartVuew',
  components: {
    Header,
    Cart,
    Payment
  },
});
</script>

