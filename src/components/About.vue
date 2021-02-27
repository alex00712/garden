<template>
    <div class = "row custom-padding" id = "about" >
        <div class = "col-12 col-lg-6  ">
            <img class = "custom-image" src = "https://thumb.tildacdn.com/tild3134-3061-4532-b535-626238306466/-/cover/600x646/center/center/-/format/webp/articles-40-1.jpg" alt = "..." />
        </div>
        <div class = "col-12 col-lg-6  about text-center align-self-center">
            <h1 class = "about__paragraph-header">О нашем садовом центре</h1>
            <div class = "about__paragraph-first">
                Выращивание растений происходит в естественных
                климатических условиях, что позволяет им быстро
                осваиваться к природной среде, с легкостью
                переносить пересадку и быстро укореняться.
            </div>
            <div class = "about__line" ></div>
            <div class = "about__paragraph-second">
            Питомник декоративных растений в Москве и Московской
            области уже более 20 лет занимается выращиванием и
            реализацией многолетних плодовых растений.
            <br/>
            <br/>
            За это время мы реализовали более миллиона саженцев,
            которые украсили приусадебные участки и сады наших 
            покупателей, поучаствовали в озеленении города и 
            поспособствовали улучшению состояния экологии.
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style lang="scss">
    .custom-image{
        width: 100%;
    }
    .custom-padding{
        padding-top: 30px;      
        padding-bottom: 180px;  
        margin-top: 30px;
        // background-color: #efefef;
    }
    .custom-color {
        background-color: #efefef;
    }
    .about{
        &__line{
            max-width: 50px;
            width: 100%;
            height: 3px;
            background-color: #666;
            display: block;
            margin: 0 auto;
        }
        &__paragraph{
            &-header{
                color: #000;
                margin-bottom: 16px;
            }
            &-first{
                font-size: 16px;
                color: #666;
                margin-bottom: 28px;
            }
            
            &-second{
                font-size: 20px;
                font-weight: 600;
                margin-top: 28px;
                color: #000;
            }
        }
        
    }
</style>