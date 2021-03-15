<template>
    <div class="row mt-2 justify-content-between">
        <div class="col-12 ">
            <h3>Ваша корзина</h3>
        </div>
        <div class="col-auto ">
            <button class="btn btn-success mb-2" @click="goTo('products')">Каталог <i class="fas fa-cart-plus"></i>
            </button>
        </div>
        <div class="col-auto ">
            <button :disabled="allMyCard.length===0" class="btn btn-info mb-2" @click="setPayment"><i
                    class="fas fa-money-bill-wave"></i> Оформить
            </button>
        </div>
    </div>
    <div v-if="allMyCard.length===0" style="margin-top: 100px" class="col flex-colomn justify-content-center">
        <h3>Ваша корзина пуста</h3>
        <button class="btn btn-success mb-2" @click="goTo('products')">Отправиться за покупками <i
                class="fas fa-cart-plus"></i></button>
    </div>

    <table class="table" v-if="allMyCard.length!==0" >
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Товар</th>
            <th scope="col">Цена</th>
            <th scope="col">Количество</th>
            <th scope="col">Итог</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(position, index) in allMyCard" :key="position.id">
            <th scope="row"  class="align-middle">{{index+1}}</th>
            <td>
                <div class="d-flex justify-content-start align-items-center prod-name">
                    <img :src="loadImage(position.image)" class="ml-1 card-img" alt="{{position.name}}">
                    {{position.name}}
                </div>
            </td>
            <td class="align-middle">{{position.price}} ₽</td>
            <td  class="align-middle">
                <div class="d-flex justify-content-center align-items-center">
                    <button class="btn btn-danger mb-2" @click="updateCardPosition(position, 'decrement')"><i
                            class="fas fa-minus"></i></button>

                    <div style="overflow-wrap: normal" class="capa">{{position.count}}</div>

                    <button class="btn btn-success mb-2" @click="updateCardPosition(position, 'increment')"><i
                            class="fas fa-plus"></i></button>
                </div>
            </td>
            <td class="font-weight-bold align-middle">{{position.price * position.count}} ₽</td>
        </tr>
        </tbody>
        <tfoot class="badge-success">
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td class="font-weight-bold text-right">Итоговая стоимость:</td>
            <td  class="font-weight-bold">{{totalItem}}  ₽</td>
        </tr>

        </tfoot>
    </table>
</template>

<script lang="ts">
    import consts from '../consts/consts'
    import {defineComponent} from 'vue';
    import {mapGetters, mapMutations} from 'vuex'
    import {Product} from '../store/modules/garden';
    import {AddToCardPayload, CardPosition, MyCard, Operation} from '../store/modules/cart'

    export default defineComponent({
        name: 'Cart',
        computed: {
            ...mapGetters(['allMyCard']),
            totalItem: function(){
                let sum = 0;
                for(let i = 0; i < this.allMyCard.length; i++){
                    sum += (parseFloat(this.allMyCard[i].price) * parseFloat(this.allMyCard[i].count));
                }

                return sum;
            }
        },
        methods: {
            loadImage(name: string) {
                if (name.startsWith('http')) {
                    return name
                }
                return `${consts.loadImage}/${name}`
            },
            goTo(path: string) {
                if (path === 'payment') {
                    return this.$store.commit("setAlert", {value: `В разработке`, type: "info"});
                }
                this.$router.push({path})
            },
            addNewCardPosition(payload: Product) {
                this.$store.commit('addNewCardPosition', payload)
                this.$store.commit("setAlert", {value: `${payload.name} успешно добавлено в корзину`, type: "success"});
            },

            deleteFromCard(id: string) {
                this.$store.commit('deleteFromCard', id)
                this.$store.commit("setAlert", {value: `Удалено`, type: "info"});
            },

            updateCardPosition(card: CardPosition, operation: Operation) {
                console.log(card, operation)
                this.$store.commit("updateCardPosition", {card, operation});
            },
            setPayment() {
                this.$store.commit("setPayment", true);
            }
        },
    });
</script>

<style>
    .card-img {
        height: 135px;
        width: 100px !important;
        object-fit: cover;
        margin-right: 20px;
    }

    .prod-name {
        font-weight: bold;
    }
</style>