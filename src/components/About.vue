<template>
    <div class = "row custom-padding" id = "about" >
        <div class = "col-12 col-md-6">
            <img src = "" alt = "..." />
        </div>
        <div class = "col-12 col-md-6 about">
            <h1 class = "about__paragraph-header">О нашем садовом центре</h1>
            <div class = "about__paragraph-first">
                Выращивание растений происходит в естественных
                климатических условиях, что позволяет им быстро
                осваиваться к природной среде, с легкостью
                переносить пересадку и быстро укореняться.
            </div>
            <div class = "about__paragraph-line" ></div>
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
    .custom-padding{
        padding-top: 180px;
        padding-bottom: 180px;
    }
    .about{
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
            &-line{
                max-width: 50px;
                width: 100%;
                height: 3px;
                background-color: #666;
                display: block;
                margin: 0 auto;
            }
            &-second{
                font-size: 20px;
                margin-top: 28px;
                color: #000;
            }
        }
        
    }
</style>