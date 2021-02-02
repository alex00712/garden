<template>
    <div class="row">
      <div class = "col" >
      <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <a class="navbar-brand text-left" href="#">
        <div class = "navbar-brand__main-title" >Садовый центр</div>
        <div class = "navbar-brand__sub-title">Зеленый остров</div>
      </a>

        <button v-on:click = "isShowHandlew" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div v-bind:class = "{'show': isMenuOpen}" class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#catalog">Каталог<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#about">О нас</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link" href="#">Доставка</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Контакты</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="tel:+79257516642">+7 925 751 6642</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.facebook.com"><i class="fab fa-facebook"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.instagram.com"><i class="fab fa-instagram"></i></a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  data(){
    return {
      isMenuOpen: false
    }
  },
  methods: {
    isShowHandlew(){
      console.log("click")
      this.isMenuOpen = this.isMenuOpen === false ? true : false
    }
  },

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .navbar-brand__main-title{
    font-size: larger;
  }
  .navbar-brand__sub-title{
    font-size: smaller;
    font-weight: bold;
  }
</style>
