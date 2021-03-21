<template>
    <div class="row">
        <div class="col">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">

                <a class="navbar-brand logo text-left" href="/">
                    <img src="img/logo.png"/>
                    <div>
                        <div class="navbar-brand__main-title">Зеленый остров</div>
                        <div class="navbar-brand__sub-title">Садовый центр</div>
                    </div>
                </a>

                <button v-on:click="isShowHandlew" class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div v-bind:class="{'show': isMenuOpen}" class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <a v-if="catalog" class="nav-link" @click="goTo(catalog)">Каталог<span class="sr-only">(current)</span></a>
                            <a v-else class="nav-link" href="/#about">Каталог</a>
                        </li>
                        <li class="nav-item">
                            <a v-if="about" class="nav-link" @click="goTo(about)">О нас</a>
                            <a v-else class="nav-link" href="#about">О нас</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a v-if="delivery" class="nav-link" @click="goTo(delivery)">Доставка</a>
                            <a v-else class="nav-link" href="delivery">Доставка</a>
                            <!-- <router-link class="nav-link" href="#contacts">Доставка</router-link> -->
                        </li>
                        <li class="nav-item">
                            <a v-if="contacts" class="nav-link" @click="goTo(contacts)">Контакты</a>
                            <a v-else class="nav-link" href="#contacts">Контакты</a>
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
    import {defineComponent} from 'vue';

    export default defineComponent({
        props: ['contacts', 'about', 'catalog', 'delivery'],
        name: 'Header',
        data() {
            return {
                isMenuOpen: false
            }
        },
        methods: {
            isShowHandlew() {
                console.log("click")
                this.isMenuOpen = this.isMenuOpen === false ? true : false
            },
            goTo(path: string) {
                console.log(path)
                this.$router.push({path})
            },
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .navbar-brand.logo {
        display: flex;
        align-items: center;
    }

    .navbar-brand.logo img {
        margin-right: 10px;
    }

    .navbar-brand__main-title {
        font-size: larger;
        font-weight: bold;
    }

    .navbar-brand__sub-title {
        font-size: smaller;
    }
</style>
