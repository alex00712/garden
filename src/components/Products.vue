<template>
    <div v-if="number" class = "row">
        <div class = "col" >
            <h3  class = "head-line">Садовые растения, семена, цветы <br/> и многое другое, что делает этот <br/> мир лучше!</h3>
        </div>
    </div>

    <div v-if="!number" class = "row">
        <div class = "col mb-4 mt-4 ml-4 text-left">
            <button v-on:click = "goTo('/')" type="button" class="btn btn-success"><i class="fas fa-home"></i></button>
        </div>
    </div>

    <div class = "row justify-content-center">
        <div class = "col-8" >
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Поиск" aria-label="Поиск" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-info" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </div>
        </div>

    <div class="row">
        <div class="col-3">
            <div class="row">
                <div class="col-12">
                    <ul class="nav flex-column align-items-start ">
                        <li class="nav-item">
                            <a class="nav-link text-dark font-weight-bold" href="#">Все</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark font-weight-bold" href="#">Семена овощей</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark font-weight-bold" href="#">Семена ягод</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark font-weight-bold" href="#">Семена цветов</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark font-weight-bold" href="#">Комнатные цветы</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark font-weight-bold" href="#">Саженцы</a>
                        </li>
                    </ul>
                </div>
                <div class="col-12 mt-3" >
                    <ul class="nav flex-column align-items-start ">
                        <li class="nav-item">
                            <a class="nav-link text-dark font-weight-bold cursor-none" href="#">Раздел</a>
                        </li>
                        <li class="nav-item c-nav">
                            <a class="nav-link text-secondary " href="#">Комнатные цветы</a>
                        </li>
                        <li class="nav-item c-nav">
                            <a class="nav-link text-secondary " href="#">Саженцы</a>
                        </li>
                    </ul>
                </div>

                <div class="col-12 mt-5" >
                    <div class = "d-flex justify-content-start mb-2" >
                        Цена
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">От</span>
                        </div>
                        <input type="number" class="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <form>
                        <div class="form-group">
                            <input type="range" class="form-control-range">
                        </div>
                    </form>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">До</span>
                        </div>
                        <input type="number" class="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <form>
                        <div class="form-group">
                            <input type="range" class="form-control-range">
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-9">
            <div class = "row justify-content-around " >
                    <div v-for="product in notFull" class="card mb-3" style="width: 18rem;" :key = "product.id">
                        <img :src="product.image" class="card-img-top img" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{product.name}}</h5>
                            <p class="card-text">{{product.description}}</p>
                            <p class="card-text">Цена {{product.price}} р</p>
                            <a href="#" class="btn btn-primary">В корзину</a>
                        </div>
                    </div>
            </div>
            <div v-if="number" class="row" >
                <div class = "col" >
                    <button v-on:click = "goTo('products')" type="button" class="btn btn-success">Увидеть больше</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { defineComponent } from 'vue';
import {Product} from '../store/modules/garden'

export default defineComponent({
    data(){
        return{

        }
    },
    props: {
        number: {
            type: Number
        }
    },
    name: 'Garden',
    computed: {
        ...mapGetters(['allProducts']),
        notFull(){
            let totalAmount: Array<Product>
            if(this.number){
                totalAmount = this.$store.getters.allProducts.slice(0, this.number)
            }else{
                totalAmount = this.$store.getters.allProducts
            }
            console.log(totalAmount)
            return totalAmount
        }
    },
    methods: {
        goTo(path: string){
            this.$router.push({path})
        }
    },
    async mounted() {
        this.$store.dispatch('fetchPosts')
    },  
});
</script>


<style>
    .head-line{
        margin-top: 6em;
        margin-bottom: 6em;
        font-size: xx-large;
    }
    .img{
        height: 285px;
        object-fit: cover;
    }
    .section{
        text-align: left;
    }
    .c-nav:hover{
        background-color: #ccc;
        width: 100%;
        text-align: left;
    }
    .cursor-none{
        cursor: auto;
    }
</style>
