<template>
  <div>
    <Header/>
    <PrevueImages/>
    <Garden/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Header from '@/components/Header.vue'; // @ is an alias to /src
import PrevueImages from '@/components/PrevueImages.vue'
import Garden from '@/components/Garden.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    PrevueImages,
    Garden
  },
});
</script>

