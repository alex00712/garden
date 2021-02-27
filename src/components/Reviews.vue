<template>
    <div class = "back-image">
        <h1>Отзывы наших любимых клиентов</h1>
        <div class = "row align-items-center">
            <div class = "col-10 offset-1 align-self-center" >
                <div class = "row" >
                    <div v-for="review in reviews" class = "col-12 col-md-4 " :key="review.id" >
                        <div class="card mt-3 " >
                            <div class="row mt-3 no-gutters">
                                <div class="col-3 col-md-4">
                                    <img :src="review.image" class=" custom-img" alt="...">
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data(){
        return{
            reviews: [
                {id: 1, 
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRAXJl2iloMVy5bMnEkygh_XbcbXtkCHfdJw&usqp=CAU", 
                name: "Петр Водовозов", 
                job: "Ферма \"Плоды Народа\"", 
                text: "Отличные ребята. Заказал яблони. Привезли в срок. Сажали всем семейством. Урожай был отменный."},
                {id: 2,
                 image: "https://thumb.tildacdn.com/tild3066-3438-4335-a261-353337333639/-/cover/50x50/left/top/-/format/webp/2.png", 
                 name: "Иван Симонов", 
                 job: "Skillbox", 
                 text: "Так как я дачник с большим стажем, имею опыт приобретения саженцев в разных садовых центрах и магазинах. На магазин \"Зелёный остров\" \"наткнулся\" случайно в интернете, разыскивая нужные мне саженцы. Все быстро, четко, вежливо. Летом все мои саженцы цвели, мы наслаждались красивыми цветами."},
                {id: 3, 
                image: "https://thumb.tildacdn.com/tild3361-3630-4733-a163-643735633139/-/cover/50x50/left/top/-/format/webp/3.png", 
                name: "Jess Simpson", 
                job: "Team lead in TBB",
                text: "I think if you do something and it turns out pretty good, then you should go do something else wonderful, not dwell on it for too long."}
            ] 
        }
    },
    name: 'Reviews',
});
</script>

<style lang="scss" >
    .back-image{
        background: url(https://thumb.tildacdn.com/tild3761-6331-4030-b964-333964653033/-/format/webp/IS_39540944_Kritchan.jpg) no-repeat;
        background-size: 100% 100%;
        background-size: cover;
        padding: 20px;
        position: relative;
        & h1{
            padding-top: 30px;
        }
    }

    .review{
        position: absolute;
        top: 10px;
    }
    .custom-img{
        width: 50px;
        height: 50px;
        border-radius: 25px;
    }
</style>