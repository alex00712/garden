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

    <div v-if="isFetching" style="margin-top: 100px" class="d-flex justify-content-center">
        <div style="width: 3rem; height: 3rem;" class="spinner-border text-success mt-8" role="status">
            <span class="sr-only">Загрузка...</span>
        </div>
    </div>

    <div v-else class="row" style="height: 100vh">
        <div class="col-12 col-md-6 col-xl-4 new" >
            <h3>Новые</h3>
            <transition-group name="flip-list" class="list-group" tag="div">
            <!-- <div > -->
                <a v-for="item in dashbord.data.newClientOrders" @dragstart="drag" class="parent mb-2 list-group-item list-group-item-action" :key="item.id" >
                    <AdminItemOfDashbord :item="item" :first="1" @change-status="changeStatus($event)"/>
                </a>
            <!-- </div> -->
            </transition-group>
        </div>
        <div class="col-12 col-md-6 col-xl-4 now" >
            <h3>В обработке</h3>
            <transition-group name="flip-list" class="list-group" tag="div">
            <!-- <div class="list-group"> -->
                <a v-for="item in dashbord.data.processingClientOrders" class="mb-2 list-group-item list-group-item-action" :key="item.id" >
                    <AdminItemOfDashbord :item="item" @change-status="changeStatus($event)"/>
                </a>
            <!-- </div> -->
            </transition-group>
        </div>
        <div class="col-12 col-md-6 col-xl-4 done" >
            <h3>Завершенные</h3>
            <transition-group name="flip-list" class="list-group" tag="div">
            <!-- <div class="list-group"> -->
                <a v-for="item in dashbord.data.executedClientOrders" class="mb-2 list-group-item list-group-item-action" :key="item.id" >
                    <AdminItemOfDashbord :item="item" :last="1" @change-status="changeStatus($event)"/>
                </a>
            <!-- </div> -->
            </transition-group>
        </div>
    </div>
</template>

<script>
import consts from '@/consts/consts'
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import AdminItemOfDashbord from '@/components/AdminItemOfDashbord.vue'

export default defineComponent({
    props: {
            
    },

    components: {
        AdminItemOfDashbord
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
        },
        isFetching(){
            const isFetching = this.$store.getters.getDashBord
            return isFetching.executedClientOrders || isFetching.newClientOrders || isFetching.processingClientOrders
            
        }
    },

    mounted() {
        this.$store.dispatch('loadDashBord')
    },
    
    methods: {
        goTo(path){
            this.$router.push({path})
        },
        changeStatus(e){
            const payload = {id: e.id, direction: e.direction}
            this.$store.dispatch('changeStatus', payload)
        }
    }

    });
</script>

<style lang="scss" scoped>

    p{
        margin-bottom: 0
    }
    .parent{
        position: relative
    }
    .arrow:hover{
        background: linear-gradient(0.25turn, #bdbdbd0a, #d4d4d4d4, #00000059);;
        position: absolute;
        top: 0;
        right: 0;
        width: 160px;
        height: 100%;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        & i{
            font-size: 3rem;
            transition: all .5s;
        }
        transition: all .5s;
    }
    .arrow-back:hover{
        background: linear-gradient(0.25turn, #00000059, #d4d4d4d4, #bdbdbd0a);;
        position: absolute;
        top: 0;
        left: 0;
        width: 160px;
        height: 100%;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        & i{
            font-size: 3rem;
            transition: all .5s;
        }
        transition: all .5s;
    }
    .new{
        background-color: #99b1e2;
    }

    .now{
        background-color: #ff00408c;
    }

    .done{
        background-color: #0d9a0099;
    }

    .flip-list {
        transition: all 0.8s ease;
        display: inline-block;
        margin-right: 10px;
    }

    .flip-list-enter-from,
    .flip-list-leave-to {
        opacity: 0;
        transform: translateX(30px);
        // transform: scale(.4);
    }

    .flip-list-leave-active {
        position: absolute;
    } 
</style>