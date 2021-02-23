<template>
    <transition name="slide">
        <div v-if="alert.isAlert" :class="type" role="alert" key="alert">
            {{alert.value}}
            <button type="button" @click = "hideAlert" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </transition>
</template>

<script>
    import { defineComponent } from 'vue';
    import { mapGetters, mapMutations } from 'vuex'
    export default defineComponent({
        name: 'Contacts',
        computed: {
        ...mapGetters(['alert']),
        type(){
            const alert = this.$store.getters.alert
            return `alert alert-dismissible alert-${alert.type} c-alert`
        }
        },
        methods: {
            hideAlert(){
                this.$store.commit("removeAlert");
            }
        },
    });
</script>

<style lang="css">
    .c-alert{
        position: fixed !important;
        top: 125px;
        left: 10px;
        z-index: 999;
    }
    
    .slide-leave-active,
    .slide-enter-active {
        transition: 1s;
    }
    .slide-enter-from, .slide-leave-to {
        transform: translate(-100%, 0);
        opacity: 0;
    }

    

</style>