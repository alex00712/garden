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
        <div class="col-12 col-md-6 col-xl-4 " >
            <h3>Новые</h3>
            <hr class="line line_new"/>
            <transition-group name="flip-list" class="list-group" tag="div">
            <!-- <div > -->
                <a v-for="item in dashbord.data.newClientOrders" @dragstart="drag" class="back_list_new mb-2 list-group-item list-group-item-action" :key="item.id" >
                    <AdminItemOfDashbord :item="item" :first="1" @change-status="changeStatus($event)"/>
                </a>
            <!-- </div> -->
            </transition-group>
        </div>
        <div class="col-12 col-md-6 col-xl-4 " >
            <h3>В обработке</h3>
            <hr class="line line_now"/>
            <transition-group name="flip-list" class="list-group" tag="div">
            <!-- <div class="list-group"> -->
                <a v-for="item in dashbord.data.processingClientOrders" class=" back_list_now mb-2 list-group-item list-group-item-action" :key="item.id" >
                    <AdminItemOfDashbord :item="item" @change-status="changeStatus($event)"/>
                </a>
            <!-- </div> -->
            </transition-group>
        </div>
        <div class="col-12 col-md-6 col-xl-4 " >
            <h3>Завершенные</h3>
            <hr class="line line_passsed"/>
            <transition-group name="flip-list" class="list-group" tag="div">
            <!-- <div class="list-group"> -->
                <a v-for="item in dashbord.data.executedClientOrders" class="back_list_passsed mb-2 list-group-item list-group-item-action" :key="item.id" >
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
        background: linear-gradient(0.25turn, #00000059, #d4d4d4d4, #bdbdbd0a);
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

    .back_list{
        // background-color: #f1f1f1;
        &_new{
            background-color: #6cccfe2e;
        }
        &_now{
            background-color: #85dcde2e;
        }
        &_passsed{
            background-color: #a7d0702e;
        }
    }

    .line{
        height: 4px;
        &_new{
            background-color: #6cccfe;
        }
        &_now{
            background-color: #85dcde;
        }
        &_passsed{
            background-color: #a7d070;
        }
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