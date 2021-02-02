<template>
    <div class = "row no-gutters">
        <div class = "col-12 col-md-4 pad" >
            <div class = "row no-gutters">
                <div class = "col-6 col-md-12 pad" >
                    <img class="img-custom" v-if="allCollage.topLeftImage" :src="allCollage.topLeftImage" alt="..."/>
                    <img class="img-fluid" v-else src="https://thumb.tildacdn.com/tild3064-6266-4237-a265-303164373230/-/resize/500x400/-/format/webp/k175eye000257.jpg" alt="..."/>
                </div>

                <div class = "col-6 col-md-12 pad" >
                    <img class="img-custom" v-if="allCollage.bottomLeftImage" :src="allCollage.bottomLeftImage" alt="..."/>
                    <img class="img-fluid" v-else src="https://thumb.tildacdn.com/tild3139-3031-4163-a566-656331336366/-/resize/500x400/-/format/webp/sarahsosiak298060.jpg" alt="..."/>
                </div>
            </div>
        </div>

        <div class = "col-12 col-md-8 pad" >
            <img class="img-custom" v-if="allCollage.mainImage" :src="allCollage.mainImage" alt="..."/>
            <img class="img-fluid" v-else src="https://thumb.tildacdn.com/tild3963-3861-4364-b661-303262343363/-/resize/900x700/-/format/webp/scottwebb320624.jpg" alt="..."/>
        </div>

    </div>

</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PrevueImages',
  computed: {
      ...mapGetters(['allCollage'])
  },
  methods: {
      ...mapActions(['fetchCollage'])
  },
  async mounted() {
      this.fetchCollage()
  },
});
</script>

<style>
    .img-custom{
        height: 100%;
        width: 100%;
        object-fit: none;
    }
</style>