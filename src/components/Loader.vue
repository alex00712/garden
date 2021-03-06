<template>
    <transition name="slide">
        <div v-if="getNewLoader" class="alert alert-dismissible alert-info cu-alert" role="alert" key="alert">

            <!-- <div class="d-flex justify-content-center"> -->
                <!-- <div class="spinner-border" role="status">
                    <span class="sr-only">Загрузка...</span>
                </div> -->
            <div>Загрузка обновлений</div>
            <button type="button" @click = "hideAlert" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <!-- </div> -->
        </div>
    </transition>
</template>

<script>
    import { defineComponent } from 'vue';
    import { mapGetters, mapMutations } from 'vuex'
    export default defineComponent({
        name: 'Contacts',
        computed: {
        ...mapGetters(['getNewLoader']),
        },
        methods: {
            hideAlert(){
                this.$store.commit('changeNewFetchingStatus', false)
            }
        }
    });
</script>

<style lang="css" scope>
    .cu-alert{
        position: fixed !important;
        top: 100px;
        right: 15px;
        z-index: 999;
        width: max-content;
    }
    
    .slide-leave-active,
    .slide-enter-active {
        transition: 1s;
    }
    .slide-enter-from, .slide-leave-to {
        transform: translate(100%, 0);
        opacity: 0;
    }

    

</style>