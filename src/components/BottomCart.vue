<template>
    <transition name="bottom-card">
        <div v-if="isShow" :class="type" class="bottom-card row align-items-center">
            <div class="col-7">
                <div v-for="(product, index) in allMyCard" class = "image-main-wraper" :key="product.id">
                    <div v-if="index<5" class = "image-wraper">
                        <img :src="loadImage(product.image)" class = "image-wraper__img"/>
                        <span class="badge badge-pill badge-danger image-wraper__snippet">{{product.count}}</span>
                    </div>
                </div>
                
            </div>
            <div class="col-5" >
                <button type="button" @click="goTo('cart')" class="btn btn-info">
                    {{isMoreThanFive}}
                </button>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" >
    import consts from '../consts/consts'
    import { defineComponent } from 'vue';
    import { mapGetters, mapMutations } from 'vuex'
    export default defineComponent({
        name: 'BottomCard',
        computed: {
        ...mapGetters(['allMyCard']),
        isShow(){
            if(this.$store.getters.allMyCard.length!==0 ){
                console.log(window.location.pathname)
                return true
            }
            return false
        },
        isMoreThanFive(index: number){
            return this.$store.getters.allMyCard.length < 6 ? 'В корзину' : `Еще ${this.$store.getters.allMyCard.length-5} ...`
        }
        },
        methods: {
        loadImage(name: string){
            return `${consts.loadImage}/${name}`
        },
            goTo(path: string){
                this.$router.push({path})
            }
        },
    });
</script>

<style lang="scss">
    .bottom-card{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background-color: #4b9e48d9;
    }

    .image-main-wraper{
        display: inline-block;
    }
    .image-wraper{
        
        margin-right: -10px;
        height: 40px;
        width: 40px;
        position: relative;
        &__img{
            width: 100%;
            height: 100%;
            border-radius: 20px;
        }
        &__snippet{
            position: absolute;
            top: 0;
            left: 0;
        }
    }
    .image-more{
        display: inline-block;
        margin-right: -10px;
        height: 40px;
        width: 40px;
        background-color: blanchedalmond;
    }
        
</style>