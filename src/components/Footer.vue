<template>
    <div class = "row footer " >

        <div class = "col-12 col-md-6 col-lg-4 text-left about" >
            <a class="about__icon" href="#">
                Садовый центр<br>
                Зеленый остров
            </a>
            <div class = "about__icons">
                <a href="https://www.facebook.com" class="about__icons-link">
                    <i class="fab fa-facebook"></i>
                </a>

                <a href="https://www.instagram.com" class="about__icons-link">
                    <i class="fab fa-instagram"></i>
                </a>

                <a href="https://twitter.com" class="about__icons-link">
                    <i class="fab fa-twitter"></i>
                </a>
            </div>    
            <div class = "about__provs" >© 2021 Зеленый остров</div>
        </div>

        <div class = "col-12 col-md-6 col-lg-4 text-left info" >
            <p class = "info__header">КАТАЛОГ</p>
            <p class = "info__content">Растения</p>
            <p class = "info__content">Сопутствующие товары</p>
            <p class = "info__content">Услуги</p>
            <p class = "info__content">Оптовикам</p>    
        </div>

        <div class = "col-12 col-md-6 col-lg-4 text-left info" >
            <p class = "info__header">ПОЛЕЗНАЯ ИНФОРМАЦИЯ</p>
            <p class = "info__content">Частным клиентам</p>
            <p class = "info__content">Оптовикам</p>
            <p class = "info__content">Вопрос-ответ</p>
            <p class = "info__content">Посадка и уход</p>    
        </div>
    </div>
</template>

<style lang="scss">
    .footer{
        background-color: #111111;
        padding-top: 20px;
    }

    .about{
        margin-bottom: 40px;
        &__icon{
            color: #ffffff;
            font-size: 18px;
            text-decoration: none;
            font-weight: 600;
            &:hover{
                color: #ffffff;
                text-decoration: none;
            }
        }
        &__icons{
            margin-top: 30px;
            &-link{
                margin-right: 20px;
                & i{
                    color: white
                }
            }
        }
        &__provs{
            color: #525252;
            margin-top: 21px;
            font-size: 14px; 
            font-weight: 300;
        }
    }

    .info{
        margin-bottom: 40px;
        &__header{
            color: #525252;
            margin-bottom: 14px;
            font-size: 18px;
            font-weight: 600;
        }
        &__content{
            margin-bottom: 10px;
            color: #ffffff;
            font-size: 14px;
        }
    }
</style>