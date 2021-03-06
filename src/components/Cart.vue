<template>
    <div class = "row mt-2 justify-content-between">
        <div class = "col-12 " >
            <h3>Ваша корзина</h3>
        </div>
        <div class = "col-auto ">
            <button class="btn btn-success mb-2" @click="goTo('products')">Каталог <i class="fas fa-cart-plus"></i></button>
        </div>
        <div class = "col-auto ">
            <button :disabled="allMyCard.length===0" class="btn btn-info mb-2" @click="setPayment"><i class="fas fa-money-bill-wave"></i> Оформить</button>
        </div>
    </div>
    <transition-group name="flip-list" class = "row" tag="div" >
    <!-- <div class = "row" > -->
        <!-- <transition appear name="card">  -->
        <div v-if="allMyCard.length===0" style="margin-top: 100px" class="col flex-colomn justify-content-center">
            <h3>Ваша корзина пуста</h3>
            <button class="btn btn-success mb-2" @click="goTo('products')">Отправиться за покупками <i class="fas fa-cart-plus"></i></button>
        </div>

        <div v-for="position in allMyCard" class = "col-12 col-sm-6 col-lg-4 mb-4" :key = "position.id">
            <!-- TODO transition -->
            
                <div class="card mt-3" style="max-width: 320px; height: 100%; margin: 10px auto;">

                    <div class="row no-gutters" style="height: 100%;" >
                        <div class="col-6 align-self-center">
                            <img :src="loadImage(position.image)" class="ml-1 card-img" alt="...">
                        </div>
                        <div class="col-6 align-self-center">
                            <div class="card-body">
                                <h5 class="card-title">{{position.name}}</h5>
                                <p class="card-text">{{position.description}}</p>
                                <p class="card-text"><small class="text-muted">Цена {{position.price}} р</small></p>
                            </div>
                        </div>

                        <div class = "col-12 d-flex justify-content-center align-items-center" >

                            <button class="btn btn-danger mb-2" @click="updateCardPosition(position, 'decrement')"><i class="fas fa-minus"></i></button>
                            
                            <div style = "overflow-wrap: normal" class = "capa">{{position.count}}</div>

                            <button class="btn btn-success mb-2" @click="updateCardPosition(position, 'increment')"><i class="fas fa-plus"></i></button>

                        </div>
                    </div>
                </div>
            
        </div>
        <!-- </transition> -->
    <!-- </div> -->
    </transition-group>
</template>

<script lang="ts">
    import consts from '../consts/consts' 
    import { defineComponent } from 'vue';
    import { mapGetters, mapMutations } from 'vuex'
    import {Product} from '../store/modules/garden';
    import {AddToCardPayload, CardPosition, MyCard, Operation} from '../store/modules/cart'
    export default defineComponent({
        name: 'Cart',
        computed: {
        ...mapGetters(['allMyCard']),
        },
        methods: {
            loadImage(name: string){
                if(name.startsWith('http')){
                    return name
                }
                return `${consts.loadImage}/${name}`
            },
            goTo(path: string){
                if(path==='payment'){
                    return this.$store.commit("setAlert", {value: `В разработке`, type: "info"});
                }
                this.$router.push({path})
            },
            addNewCardPosition(payload: Product){
                this.$store.commit('addNewCardPosition', payload)
                this.$store.commit("setAlert", {value: `${payload.name} успешно добавлено в корзину`, type: "success"});
            },

            deleteFromCard(id: string){
                this.$store.commit('deleteFromCard', id)
                this.$store.commit("setAlert", {value: `Удалено`, type: "info"});
            },

            updateCardPosition(card: CardPosition, operation: Operation){
                console.log(card, operation)
                this.$store.commit("updateCardPosition", {card, operation});
            },
            setPayment(){
                this.$store.commit("setPayment", true);
            }
        },
    });
</script>

<style>
    .card-img{
        height: 135px;
        object-fit: cover;
    }

    .flip-list-item {
        transition: all 0.8s ease;
        display: inline-block;
        margin-right: 10px;
    }

    .flip-list-enter-from,
    .flip-list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

    .flip-list-leave-active {
        position: absolute;
    } 
</style>