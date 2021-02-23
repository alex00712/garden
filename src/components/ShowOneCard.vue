<template>
    <transition name="payment">
        <div v-if="getPayment.isOpen" class="modal" style="display: block">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title"><strong>{{getPayment.product.name}}</strong></h5>
                    <button type="button" class="close" @click="closeCard" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div class = "row align-items-center">
                        <div class = "col-12">
                            <img class="image" :src="imageMaker(getPayment.product.image)" />
                        </div> 
                        <div class = "col-12 mt-4">
                            {{getPayment.product.description}}
                        </div>
                        <div class = "col-12 mt-4">
                            <strong>Цена: {{getPayment.product.price}} рублей</strong>
                        </div>
                    </div>

                    <div class= "row">
                        <div class="col-12">
                            <div class="row justify-content-between">
                                <div class="col-4">
                                    <button @click="changeCard(-1)" class="btn btn-outline-success" type="button"><i class="fas fa-arrow-left"></i></button>
                                </div>
                                <div class="col-4">
                                    <button @click="changeCard(1)" class="btn btn-outline-success" type="button"><i class="fas fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { mapGetters } from 'vuex'
    import {Product} from '../store/modules/garden'
    import {PayoadForCount} from '../store/modules/moduleWindow'
    const urlExp = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/)

    export default defineComponent({
        data(){
            return {

            }
        },
        name: 'ShowOneCard',
        computed: {
            ...mapGetters(['payment']),
            getPayment(){
                const payment = this.$store.getters.isModalOpen
                return payment
            },
            
        },
        methods: {
            imageMaker(image: any){
                console.log(image)
                if(urlExp.test(image)){
                    return image
                }
                return URL.createObjectURL(image)
            },
            closeCard(id?: string){
                this.$store.dispatch('showWindow', id)
            },
            changeCard(N: number){
                this.$store.dispatch('changeCard', N)
            }
        }

    });
</script>

<style lang="css" scope >
    .image{
        width: 100%;
    }

    .open{
        display: block !important;
    }

    .payment-leave-active,
    .payment-enter-active {
        transition: 1s;
    }

    .payment-enter-from, .payment-leave-to {
        transform: translate(0, -100%);
        opacity: 0;
    }

</style>