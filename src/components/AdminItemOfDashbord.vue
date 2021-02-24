<template>
    <div class="d-flex w-100 justify-content-between">
        <small @click="this.$emit('change-status', {id: item.id, direction: 'back'})" :class="{'hidden': first}" class="arrow-back" ><i class="fas fa-arrow-left"></i></small>
        <p style="word-break: break-word" class="mb-1" ><strong>{{item.clientMail}}</strong></p>
        <small @click="this.$emit('change-status', {id: item.id, direction: 'forward'})" class="arrow" >
            <i v-if="last" class="fas fa-times"></i>
            <i v-else class="fas fa-arrow-right"></i>
            </small>
    </div>
    <p class="mb-1">Телефон {{item.clientPhoneNumber}}</p>
    <small>Общая стоимость {{item.price}}</small><br/>
    <small>Товары: </small>
    <i v-if="isShowProduct" @click="changeVisible" class="far fa-eye-slash"></i>
    <i v-else @click="changeVisible" class="far fa-eye"></i>
    <transition name="fade">
        <ul v-if="isShowProduct" class="list-group">
            <li v-for="(itemO, i) in item.productList" class="list-group-item" :key="i">
                <p>{{itemO.product.name}}</p>
                <p>{{itemO.product.price}} Р - {{itemO.count}} ед</p>
            </li>
        </ul>
    </transition>
</template>

<script>
//  @click="changeStatus(item.id, 'forward')"
    import { defineComponent } from 'vue';
    export default defineComponent({
        // props: ['item', 'first', 'last'],
        data(){
            return {
                isShowProduct: false
            }
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            first: {
                type: String,
                required: false
            },
            last: {
                type: String,
                required: false
            }
        },
        name: 'AdminItemOfDashbord',
        computed: {
        
        },
        methods: {
            changeVisible(){
                this.$data.isShowProduct = !this.$data.isShowProduct
            }
        },
        creacted(){
            console.log('mounted')
            console.log(this.$props)
        }
    });
</script>

<style lang="scss" scope>

    .hidden{
        visibility: hidden
    }

    p{
        margin-bottom: 0
    }

    .parent{
        position: relative
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        transform: translateY(-50%);
        opacity: 0;
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
    

</style>