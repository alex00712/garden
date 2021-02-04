<template>
    <div v-if="alert.isAlert" :class="type" role="alert">
        {{alert.value}}
        <button type="button" @click = "hideAlert" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
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
        z-index: 999;
    }
</style>