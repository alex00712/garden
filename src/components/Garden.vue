<template>
    <div class = "row" >
        <div class = "col " >
            <h3 class = "head-line">Садовые растения, семена, цветы <br/> и многое другое, что делает этот <br/> мир лучше!</h3>
        </div>
    </div>

    <div class = "row justify-content-center">
        <div class = "col-8" >
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Поиск" aria-label="Поиск" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-info" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </div>
        </div>
    <div class="row">
        <div class="col-3">
            <ul class="nav flex-column align-items-start ">
                <li class="nav-item">
                    <a class="nav-link text-dark" href="#">Все</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="#">Семена овощей</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="#">Семена ягод</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="#">Семена цветов</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="#">Комнатные цветы</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="#">Саженцы</a>
                </li>
            </ul>
        </div>
        <div class="col-9">

            <div class = "row justify-content-around" >
                    <div v-for="product in allProducts" class="card" style="width: 18rem;" :key = "product.id">
                        <img :src="product.image" class="card-img-top img" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{product.name}}</h5>
                            <p class="card-text">{{product.description}}</p>
                            <p class="card-text">Цена {{product.price}} р</p>
                            <a href="#" class="btn btn-primary">В корзину</a>
                        </div>
                    </div>
                
            </div>
            
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Garden',
    computed: mapGetters(['allProducts']),
    async mounted() {
        this.$store.dispatch('fetchPosts')
    },  
});
</script>


<style>
    .head-line{
        margin-top: 6em;
        margin-bottom: 6em;
        font-size: xx-large;
    }
    .img{
        height: 285px;
        object-fit: cover;
    }

</style>
