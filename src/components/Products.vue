<template>
    <div v-if="number" class = "row">
        <div class = "col" >
            <h3  class = "head-line">Садовые растения, семена, цветы <br/> и многое другое, что делает этот <br/> мир лучше!</h3>
        </div>
    </div>

    <div v-if="!number" class = "row justify-content-between">
        <div class = "col-2 mb-4 mt-4">
            <button v-on:click = "goTo('/')" type="button" class="btn btn-success"><i class="fas fa-home"></i>ICON</button>
        </div>
        <div class = "col-2 mb-4 mt-4">
            <button v-on:click = "goTo('/cart')" type="button" class="btn btn-success"><i class="fas fa-shopping-cart"></i>ICON</button>
        </div>
    </div>

    <div class = "row justify-content-center" id = "catalog">
        <div class = "col-10 col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" @change = "searchInput" placeholder="Поиск" aria-label="Поиск" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-info" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </div>
        </div>

    <div class="row">
        <div class="col-12 col-md-3">
            <div class="row">
                <div class="col-12">
                    <ul class="nav flex-row justify-content-center flex-md-column align-items-start">
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" name = "all" @click="handleChange">Все</a>
                            <span v-if="allFilters.category==='all'" class="badge badge-success">{{notFull.length}}</span>
                        </li>
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" name = "veg_seeds" @click="handleChange">Семена овощей</a>
                            <span v-if="allFilters.category==='veg_seeds'" class="badge badge-success">{{notFull.length}}</span>
                        </li>
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" name = "berry_seeds" @click="handleChange">Семена ягод</a>
                            <span v-if="allFilters.category==='berry_seeds'" class="badge badge-success">{{notFull.length}}</span>
                        </li>
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" name = "flower_seeds" @click="handleChange">Семена цветов</a>
                            <span v-if="allFilters.category==='flower_seeds'" class="badge badge-success">{{notFull.length}}</span>
                        </li>
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" name = "house_flower_seeds" @click="handleChange">Комнатные цветы</a>
                            <span v-if="allFilters.category==='house_flower_seeds'" class="badge badge-success">{{notFull.length}}</span>
                        </li>
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" name = "seedlings" @click="handleChange">Саженцы</a>
                            <span v-if="allFilters.category==='seedlings'" class="badge badge-success">{{notFull.length}}</span>
                        </li>
                    </ul>
                </div>
                <div class="col-12 mt-3" >
                    <a class="nav-link text-dark text-center text-md-left font-weight-bold cursor-none">Раздел</a>
                    <ul class="nav flex-column align-items-start ">
                        <li class="nav-item c-nav">
                            <a class="nav-link text-secondary cursor-pointer" name = "house_flower_seeds" @click="handleChange">Комнатные цветы</a>
                        </li>
                        <li class="nav-item c-nav">
                            <a class="nav-link text-secondary cursor-pointer" name = "seedlings" @click="handleChange">Саженцы</a>
                        </li>
                    </ul>
                </div>

                <div class="col-12 mt-2" >
                    <div class = "d-flex justify-content-start mb-2" >
                        Цена
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">От</span>
                        </div>
                        <input 
                            name = "minPrice" 
                            type="number" 
                            class="form-control" 
                            placeholder="0" 
                            @change="setFilters" 
                            :value="allFilters.minPrice"
                            aria-label="Username" 
                            aria-describedby="basic-addon1">
                        <input 
                            name = "minPrice"
                            type="range" 
                            step = "1" 
                            min = "0" 
                            max = "25000" 
                            class="form-control-range" 
                            @input="setFilters" 
                            :value="allFilters.minPrice">
                    </div>
                    
                    <div class="input-group mb-4">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">До</span>
                        </div>
                        <input 
                            name = "maxPrice"
                            type="number" 
                            class="form-control" 
                            placeholder="0" 
                            @change="setFilters" 
                            :value="allFilters.maxPrice"
                            aria-label="Username" 
                            aria-describedby="basic-addon1">
                        <input 
                            name = "maxPrice"
                            type="range" 
                            step = "1" 
                            min = "25000" 
                            max = "50000" 
                            class="form-control-range" 
                            @input="setFilters" 
                            :value="allFilters.maxPrice">
                    </div>
                </div>
            </div>
            <div v-if="number" class="row" >
                <div class = "col " >
                    <button v-on:click = "goTo('products')" type="button" class="btn btn-outline-success mb-4">
                        <i class="fas fa-eye"></i>
                        Посмотреть все
                    </button>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-9">
            <div class = "row no-gutters justify-content-around justify-md-content-around" >
                <div v-for="product in notFull" 
                class="card custom-card col-6 mb-4 col-md-4 col-lg-3 
                        flex-column justify-content-between" 
                                        :key = "product.id" 
                >
                        <img :src="product.image"  class="card-img-top img" alt="...">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <p class = "font-weight-bold" >{{product.name}}</p>
                            <p><small>{{product.description}}</small></p>
                            <p><strong>Цена</strong> {{product.price}} р</p>
                        </div>
                        <button class="btn btn-danger mb-2">Купить <i class="fas fa-dollar-sign"></i></button>
                        <button @click="setAlert(product.name)" class="btn btn-primary mb-2">В корзину <i class="fas fa-shopping-cart"></i></button>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from 'vuex'
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

        ...mapGetters(['allProducts', 'allFilters']),

        notFull(): Array<Product>{
            let totalAmount: Array<Product>
            if(this.number){
                totalAmount = this.$store.getters.allProducts.slice(0, this.number)
            }else{
                totalAmount = this.$store.getters.allProducts
            }
            const filters = this.$store.getters.allFilters
            return totalAmount.filter(el => el.price > filters.minPrice && el.price < filters.maxPrice && (filters.category!=="all" ? el.category === filters.category : true))
        }
    },
    methods: {

        goTo(path: string){
            this.$router.push({path})
        },

        setFilters(e: any){
            this.$store.commit("updateFilters", {name: e.target.name, value: e.target.value});
        },

        handleChange(e: any){
            this.$store.commit("updateFilters", {name: "category", value: e.target.name});
        },

        setAlert(name: string){
           this.$store.commit("setAlert", {value: `${name} успешно добавлено в корзину`, type: "success"});
        }
    },

    async mounted() {
        this.$store.dispatch('fetchPosts')
    },  
});
</script>


<style lang="css" > 

    .head-line{
        margin-top: 4em;
        margin-bottom: 4em;
        font-size: xx-large;
    }
    .img{
        max-width: 100%;
        height: 150px;
        object-fit: contain;
    }
    .section{
        text-align: left;
    }
    .c-nav:hover{
        background-color: #ccc;
        width: 100%;
        text-align: left;
    }
    .cursor-pointer{
        cursor: pointer
    }
    .cursor-none{
        cursor: auto;
    }
    .custom-card{
        max-width: 200px !important;
        margin: 10px;
    }

    @media(max-width: 768px){
        .filters{
            display: none !important;
        }
        .nav{
            font-size: 12px;
        }
        .custom-card{
            
            margin: 0px;
        }
    }

</style>
