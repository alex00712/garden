<template>
    <div class = "row mt-2 mb-4 justify-content-between">
        <div class = "col-12 " >
            <h3>Заказы</h3>
        </div>
        <div class = "col-auto ">
            <button class="btn btn-success mb-2" @click="goTo('/admin')">Назад <i class="fas fa-air-freshener"></i></button>
        </div>
    </div>
    <!-- <pre>
        {{dashbord.data.executedClientOrders}} 
    </pre> -->
    <div class="row">
        <div class="col-12 col-xl-4" >
            <h3>Новые</h3>
            <div class="list-group">
                <a v-for="(item, i) in dashbord.data.newClientOrders" class="list-group-item list-group-item-action" :key="i" >
                    <div class="d-flex w-100 justify-content-between">
                    <p style="word-break: break-word" class="mb-1" ><strong>{{item.clientMail}}</strong></p>
                    <small><i class="fas fa-arrow-right"></i></small>
                    </div>
                    <p class="mb-1">Телефон {{item.clientPhoneNumber}}</p>
                    <small>Общая стоимость {{item.price}}</small><br/>
                    <small>Товары: </small>
                    <ul class="list-group">
                        <li v-for="(itemO, i) in item.productList" class="list-group-item" :key="i">
                            <p>{{itemO.product.name}}</p>
                            <p>{{itemO.product.price}} Р - {{itemO.count}} ед</p>
                        </li>
                    </ul>
                </a>
            </div>
        </div>
        <div class="col-12 col-xl-4" >
            <h3>В обработке</h3>
            <div class="list-group">
                <a v-for="(item, i) in dashbord.data.processingClientOrders" class="list-group-item list-group-item-action" :key="i" >
                    <div class="d-flex w-100 justify-content-between">
                    <p style="word-break: break-word" class="mb-1" ><strong>{{item.clientMail}}</strong></p>
                    <small><i class="fas fa-arrow-right"></i></small>
                    </div>
                    <p class="mb-1">Телефон {{item.clientPhoneNumber}}</p>
                    <small>Общая стоимость {{item.price}}</small><br/>
                    <small>Товары: </small>
                    <ul class="list-group list-group-flush">
                        <li v-for="(itemO, i) in item.productList" class="list-group-item" :key="i">
                            <p>{{itemO.product.name}}</p>
                            <p>{{itemO.product.price}} Р - {{itemO.count}} ед</p>
                        </li>
                    </ul>
                </a>
            </div>
        </div>
        <div class="col-12 col-xl-4" >
            <h3>Завершенные</h3>
            <div class="list-group">
                <a v-for="(item, i) in dashbord.data.executedClientOrders" class="list-group-item list-group-item-action" :key="i" >
                    <div class="d-flex w-100 justify-content-between">
                    <p style="word-break: break-word" class="mb-1" ><strong>{{item.clientMail}}</strong></p>
                    <small><i class="fas fa-arrow-right"></i></small>
                    </div>
                    <p class="mb-1">Телефон {{item.clientPhoneNumber}}</p>
                    <small>Общая стоимость {{item.price}}</small><br/>
                    <small>Товары: </small>
                    <ul class="list-group list-group-flush">
                        <li v-for="(itemO, i) in item.productList" class="list-group-item" :key="i">
                            <p>{{itemO.product.name}}</p>
                            <p>{{itemO.product.price}} Р - {{itemO.count}} ед</p>
                        </li>
                    </ul>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import consts from '@/consts/consts'
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
            
    },

    components: {
            
    },

    name: 'AdminDashbord',

    data(){
        return {
        
        }
    },

    computed: {
        ...mapGetters['getDashBord'],
        dashbord(){
            console.log(this.$store.getters.getDashBord)
            return this.$store.getters.getDashBord
        }
    },

    mounted() {
        this.$store.dispatch('loadDashBord')
    },
    
    methods: {
        goTo(path){
            this.$router.push({path})
        }
    }

    });
</script>

<style lang="scss">


  
</style>