<template>
    <div class = "row align-items-center back-image">
        <div class = "col-10 offset-1 align-self-center" >
            <h1>Отзывы наших любимых клиентов</h1>
            <div class = "row" >
                <div v-for="review in reviews" class = "col-12 col-md-4 " :key="review.id" >
                    <div class="card mt-3 " >
                        <div class="row mt-3 no-gutters">
                            <div class="col-3 col-md-4">
                                <img src="" class="card-img" alt="...">
                            </div>
                            <div class="col-9 col-md-8">
                                <h5 class="card-title">{{review.name}}</h5>
                                <p class="card-text"><small class="text-muted">{{review.job}}</small></p>
                            </div>
                            <div class="col-12">
                            <div class="card-body">
                                <p class="card-text">{{review.text}}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data(){
        return{
            reviews: [
                {id: 1, image: "", name: "Sarah Lewin", job: "Projects manager in Pixels", text: "I think if you do something and it turns out pretty good, then you should go do something else wonderful, not dwell on it for too long."},
                {id: 2, image: "", name: "Gregory Tabot", job: "Photographer", text: "The principal element of Suprematism in painting, as in architecture, is its liberation from all social or materialist tendencies. Through Suprematism, art comes into its pure and unpolluted form."},
                {id: 3, image: "", name: "Jess Simpson", job: "Team lead in TBB", text: "I think if you do something and it turns out pretty good, then you should go do something else wonderful, not dwell on it for too long."}
            ] 
        }
    },
    name: 'Reviews',
});
</script>

<style lang="css" >
    .back-image{
        background-color: #ccc;
        min-height: 709px
    }
</style>