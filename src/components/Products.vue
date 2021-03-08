<template>
    <div v-if="isAdmin" class = "row">
        <div class = "col" >
            <h3  class = "head-line">Садовые растения, семена, цветы <br/> и многое другое, что делает этот <br/> мир лучше!</h3>
        </div>
    </div>

    <div v-if="!number && !isEdit" class = "row justify-content-between">
        <div class = "col-6 mb-4 mt-4">
            <button v-on:click = "goTo('/')" type="button" class="btn btn-success"><i class="fas fa-home"></i> Домой</button>
        </div>
        <div class = "col-6 mb-4 mt-4">
            <button v-on:click = "goTo('/cart')" type="button" class="btn btn-success"><i class="fas fa-shopping-cart"></i> Корзина</button>
        </div>
    </div>

    <div class = "row" id = "catalog">
        <div class = "col-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
            <div class="input-group mb-3">
                <input v-model="allFilters.search" type="text" class="form-control" name = "search" @input="setFilters" placeholder="Поиск" aria-label="Поиск" aria-describedby="basic-addon2">
                    <!-- <div class="input-group-append">
                        <button class="btn btn-outline-info" type="button"><i class="fas fa-search"></i></button>
                    </div> -->
                </div>
            </div>
        </div>

    <div class="row">
        <div class="col-12 col-md-3 col-xl-2">
            <div class="row">
                <div class="col-12">
                    <ul class="nav flex-row justify-content-center flex-md-column align-items-start">
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" name = "all" @click="handleChange">Все</a>
                            <span v-if="allFilters.category==='all'" class="badge badge-success">{{notFull.totalAmount.length}}</span>
                        </li>
                        <li 
                            v-for="item in getSeparatosCategory" 
                            class="nav-item d-flex justify-content-between align-items-center"
                            :key="item.id"
                        >
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" :name="JSON.stringify(item)" @click="handleChange">{{item.name}}</a>
                            <span v-if="allFilters.category===JSON.stringify(item)" class="badge badge-success">{{notFull.totalAmount.length}}</span>
                        </li>
                        
                        <!-- <li class="nav-item d-flex justify-content-between align-items-center">
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" name = "veg_seeds" @click="handleChange">Семена овощей</a>
                            <span v-if="allFilters.category==='veg_seeds'" class="badge badge-success">{{notFull.totalAmount.length}}</span>
                        </li>
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" name = "berry_seeds" @click="handleChange">Семена ягод</a>
                            <span v-if="allFilters.category==='berry_seeds'" class="badge badge-success">{{notFull.totalAmount.length}}</span>
                        </li>
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" name = "flower_seeds" @click="handleChange">Семена цветов</a>
                            <span v-if="allFilters.category==='flower_seeds'" class="badge badge-success">{{notFull.totalAmount.length}}</span>
                        </li>
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" name = "house_flower_seeds" @click="handleChange">Комнатные цветы</a>
                            <span v-if="allFilters.category==='house_flower_seeds'" class="badge badge-success">{{notFull.totalAmount.length}}</span>
                        </li>
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <a class="nav-link text-dark font-weight-bold cursor-pointer" name = "seedlings" @click="handleChange">Саженцы</a>
                            <span v-if="allFilters.category==='seedlings'" class="badge badge-success">{{notFull.totalAmount.length}}</span>
                        </li> -->
                    </ul>
                </div>

                <!-- <div class="col-12 mt-3" >
                    <a class="nav-link text-dark text-center text-md-left font-weight-bold cursor-none">Раздел</a>
                    <ul class="nav flex-column align-items-start ">
                        <li class="nav-item c-nav">
                            <a class="nav-link text-secondary cursor-pointer" name = "house_flower_seeds" @click="handleChange">Комнатные цветы</a>
                        </li>
                        <li class="nav-item c-nav">
                            <a class="nav-link text-secondary cursor-pointer" name = "seedlings" @click="handleChange">Саженцы</a>
                        </li>
                    </ul>
                </div> -->

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

        <div ref="focus_list" class="col-12 col-md-9 col-xl-10">
            <!-- <div  > -->
            <div v-if="isProductsAreFetching" style="margin-top: 100px" class="d-flex justify-content-center">
                <div style="width: 3rem; height: 3rem;" class="spinner-border text-success mt-8" role="status">
                    <span class="sr-only">Загрузка...</span>
                </div>
            </div>

            <div v-if="!isProductsAreFetching && notFull.forShowNow.length===0" style="margin-top: 100px" class="d-flex justify-content-center">
                <h3>Ничего не найдено...</h3>
            </div>

            <transition-group  v-else name="flip-list" class = "row no-gutters" tag="div">

                <div v-for="product in notFull.forShowNow" class="c-flip-list-item col-12 mb-1 col-sm-6 col-lg-4 col-xl-3" :key = "product.id">

                        <div class="card d-flex flex-column justify-content-between my-card m-1"  >
                                <img :src="loadImage(product.image)" class="card-img-top img " alt="..." @click="openCardInfo(product.id)">
                                <div class="card-body ">
                                    <p class = "font-weight-bold" >{{product.name}}</p>
                                    <div class = "description">
                                        <p><small>{{product.description.heigth}}</small></p>
                                        <p><small>{{product.description.coment}}</small></p>
                                        <p><small>{{product.description.light}}</small></p>
                                        <p><small>{{product.description.winter}}</small></p>
                                    </div>
                                    <p class="price" ><strong>Цена</strong> {{product.price}} р</p>
                                </div>
                                <div v-if="!getNewLoader">
                                    <transition v-if="!isEdit" name="buttons" mode="out-in" >
                                        <div v-if="countExistingInMyCard(product.id)" key="yet" class="d-flex flex-column m-1">
                                            <button class="btn btn-outline-danger mb-2" @click="deleteFromCard(product.id)">Удалить</button>

                                            <div>
                                                <button class="btn btn-outline-danger mb-2" @click="updateCardPosition(product, 'decrement')"><i class="fas fa-minus"></i></button>
                                                
                                                <span class = "capa">{{countExistingInMyCard(product.id)}}</span>

                                                <button class="btn btn-outline-success mb-2" @click="updateCardPosition(product, 'increment')"><i class="fas fa-plus"></i></button>
                                            </div>

                                        </div>  

                                        <div v-else key="notyet" class="d-flex flex-column m-1">
                                            <button style="visibility: hidden" class="btn btn-success mb-2" @click="buyNow(product)" >Купить <i class="fas fa-dollar-sign"></i></button>
                                            <button class="btn btn-primary mb-2" @click="addNewCardPosition(product)">Добавить <i class="fas fa-shopping-cart"></i></button>
                                        </div>
                                    </transition>  

                                    <div v-else class="d-flex flex-column m-1" >
                                        <button class="btn btn-outline-primary mb-2" @click="goTo(`/admin/editor/${product.id}`)" ><i class="fas fa-cog"></i> Редактировать</button>
                                        <button class="btn btn-outline-danger mb-2" @click="deleteProduct(product.id)"><i class="fas fa-edit"></i> Удалить</button>
                                    </div>
                                </div>
                        </div>

                </div>

                    <div v-if="notFull.amuuntOfCeilPagination && !isProductsAreFetching" class="col-12 mt-4">
                        <nav aria-label="Навигация по страницам">
                            <ul class="pagination justify-content-center">
                                <!-- <li class="page-item disabled">
                                <a class="page-link" tabindex="-1" aria-disabled="true">Предыдущая</a>
                                 </li> -->
                                    
                                <li v-for="i in notFull.amuuntOfCeilPagination" :class="{'active': i===paginationNamber}" class="page-item m-2" :key="i">
                                    <a @click="setPaginationNumber(i)" class="page-link" >{{i}}</a>
                                </li>

                                <!-- <li class="page-item">
                                 <a class="page-link" href="#">Следующая</a>
                                 </li> -->
                            </ul>
                        </nav>
                    </div>
            </transition-group>
            <!-- </div> -->
            
        </div>



    </div>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from 'vuex';
import { defineComponent } from 'vue';
import consts from '../consts/consts'
import {Product, Filters} from '../store/modules/garden';
import {AddToCardPayload, CardPosition, MyCard, Operation} from '../store/modules/cart'

import searchCompare from '../utils/searchCompare'

const url = /^https?/gi;

export default defineComponent({
    data(){
        return{
            amount: 8,
            paginationNamber: 1
        }
    },
    props: {
        number: {
            type: Number,
            default: 1
        },
        isEdit: {
            type: Boolean
        }
    },
    name: 'Garden',
    computed: {
        ...mapGetters(['allProducts', 'allFilters', 'allMyCard', 'isProductsAreFetching', 'getNewLoader', 'getSeparatosCategory']),
        isAdmin(){
            return !/admin/.test(window.location.pathname)
        },
        notFull(){

            const filters = this.$store.getters.allFilters

            const totalAmount: Array<Product> = this.$store.getters.allProducts

            let paginationNamber = this.paginationNamber

            const newTotal: Array<Product> = totalAmount.filter(el => searchCompare(el.name, filters.search) && el.price > filters.minPrice && el.price < filters.maxPrice && (filters.category!=="all" ? JSON.stringify(el.category) === filters.category : true))
            
            const amuuntOfCeilPagination: Array<number> = new Array(Math.ceil(newTotal.length/this.amount))
            for(let i = 0; i < amuuntOfCeilPagination.length; i++){
                amuuntOfCeilPagination[i] = (i+1)
            }


            if(this.number){
            //     const _total = [...totalAmount]

                if(!newTotal[this.amount]){
                    
                    paginationNamber = 1
                }

                const forShowNow = newTotal.slice(this.amount*(paginationNamber-1), this.amount*paginationNamber)
                console.log("newTotal", newTotal)
                console.log("forShowNow", forShowNow)
                return {
                    totalAmount: newTotal,
                    forShowNow,
                    amuuntOfCeilPagination
                }
            }else{
                console.log(totalAmount)
                return {
                    totalAmount: newTotal,
                    forShowNow: newTotal
                }
            }
            
        },

        isInMyCard(isId: string){
            const N1: Array<CardPosition> = this.$store.getters.allMyCard
            const N: CardPosition | undefined = N1.find(el => el.id === isId)
            if(N){
                return N.count
            }else{
                return 0
            } 

        },

    },
    methods: {
        loadImage(name: string){
            if(name.startsWith('http')){
                return name
            }
            return `${consts.loadImage}/${name}`
        },
        openCardInfo(id: string){
            this.$store.dispatch('showWindow', id)
        },
        setFocus(){
            const el: any = this.$refs.focus_list;
            el.focus();
        },
        setPaginationNumber(number: number){
            this.paginationNamber = number
        },
        updateCardPosition(card: CardPosition, operation: Operation){
            // console.log(card, operation)
            this.$store.commit("updateCardPosition", {card, operation});
        },

        countExistingInMyCard(id: any){
            const myCard: Array<CardPosition> = this.$store.getters.allMyCard;
            const isExist: CardPosition | undefined = myCard.find((el: CardPosition) => el.id === id)
            if(isExist){
                return isExist.count
            }else{
                return false 
            }        
        },

        goTo(path: string){
            this.$router.push({path})
        },
        deleteProduct(id: string){
            this.$store.dispatch('deletePost', id)
            // this.$store.commit("setAlert", {value: `${name} УДАЛЕН`, type: "info"});
            
        },
        setFilters(e: any){
            this.$store.commit("updateFilters", {name: e.target.name, value: e.target.value});
            
        },

        handleChange(e: any){
            this.$store.commit("updateFilters", {name: "category", value: e.target.name});
            console.log(this.$store)
        },

        setAlert(name: string){
           this.$store.commit("setAlert", {value: `${name} успешно добавлено в корзину`, type: "success"});
        },

        buyNow(payload: Product){
            this.addNewCardPosition(payload)
            this.$store.commit("setAlert", {value: `${payload.name} успешно добавлено в корзину`, type: "success"});
            this.$router.push({path: '/cart'})
        },

        addNewCardPosition(payload: Product){
            this.$store.commit('addNewCardPosition', payload)
            this.$store.commit("setAlert", {value: `${payload.name} успешно добавлено в корзину`, type: "success"});
        },

        deleteFromCard(id: string){
            this.$store.commit('deleteFromCard', id)
            this.$store.commit("setAlert", {value: `Удалено`, type: "info"});
        },
        countAnAmount(innerWidth: number){
                if(innerWidth>=1200){
                    return this.amount = 12
                }
                else if(innerWidth>=1024){
                    return this.amount = 9
                }
                else if(innerWidth<=1024 && innerWidth>=576){
                    return this.amount = 6
                }
                else{
                    return this.amount = 4
                }
        }
    },

    created() {
        if(this.number){
            this.countAnAmount(window.innerWidth)
            window.addEventListener('resize', e=>{
                this.countAnAmount(window.innerWidth)
            })
        }
    }

});
</script>


<style lang="css" scope > 
    .description{
        height: 150px;
        overflow-y: hidden;
    }
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
    .capa{
        font-size: 20px;
        font-weight: 900;
        margin: 0 20px;
    }
    .card-body p {
        margin-bottom: 0;
    }

    .my-card{
        /* max-width: 150px;  */
        height: 100%; 
        margin: 0 auto;
    }
    .price{
        font-size: large;
    }
    /* @media(min-width: 1440px){
        .my-card{
            max-width: 190px; 
            height: 100%; 
            margin: 0 auto;
        }
    }
    @media(min-width: 424px){
        .my-card{
            max-width: 170px; 
            height: 100%; 
            margin: 0 auto;
        }
    } */
    @media(max-width: 768px){
        .filters{
            display: none !important;
        }
        .nav{
            font-size: 12px;
        }
        .custom-card{


        }
    }
    .buttons-enter-active, .buttons-leave-active {
        transition: .5s;
    }
    .buttons-enter-from, .buttons-leave-to{
        transform: scale(.5);
        opacity: 0;
    }
    
    .c-flip-list-item {
        transition: all 0.8s ease;
    }

    .flip-list-enter-from,
    .flip-list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

    .flip-list-leave-active {
        /* position: absolute; */
    } 

</style>
