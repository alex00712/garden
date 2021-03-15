<template>
    <div class = "row" id = "contacts">
        <div class = "col-12 main">
            <h1 class = "main__header">Наши контакты</h1>
            <div class = "main__content" >
                Вы можете связаться с нами по любому интересующему Вас вопросу касательно нашей работы
            </div>
        </div>

        <div class = "col-12 col-md-5 offset-md-1 text-left contacts">
            <div class = "contacts__cont">
                <p>+7 925 751 66 42</p>
                <p>info@green-land-store.ru</p>
            </div>
            <div class = "contacts__adr" >
                <p>Москва, Тверская 1</p>
            </div>
            <ContactsIcons/>
        </div>

        <div class = "col-12 col-md-6 text-left feedback">
            <form class = "feedback__form">
                <div class="form-group feedback__form-mail">
                    <input v-model="email" @input="inputChangeHandler" name="email" :class="{'is-invalid': isEmailError}" type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш E-mail">
                    <div v-if="isEmailError" class="invalid-feedback">неверный e-mail</div> 
                </div>
                <div class="form-group feedback__form-name">
                    <input v-model="name" @input="inputChangeHandler" name="name" :class="{'is-invalid': isNameError}" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Ваше имя">
                    <div v-if="isNameError" class="invalid-feedback">неверный e-mail</div> 
                </div>
                <div class="form-group feedback__form-text">
                    <textarea v-model="text" @input="inputChangeHandler" name="text" :class="{'is-invalid': isTextError}" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Текст сообщения"></textarea>
                    <div v-if="isTextError" class="invalid-feedback">неверный e-mail</div>
                </div>
                <button @click="sendMessage" class="btn btn-success" type="button">Связаться</button>
            </form>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import ContactsIcons from '@/components/ContactsIcons.vue'
    import Consts from '../consts/consts'

    const emailReg  = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    export default defineComponent({
        data(){
            return {
                email: "",
                name: "",
                text: "",
                isNameError: false,
                isEmailError: false,
                isTextError: false
            }
        },
        name: 'Contacts',
        components: {
            ContactsIcons
        },
        methods: {
            inputChangeHandler(e){
                const {name, value} = e.target
                if(this.validateInput(name, value)){
                    this.$data[name] = value
                }
            },
            validateInput(name, value){
                switch(name){
                    case 'name':
                        if(value.length === 0){
                            this.isNameError = true
                            return false
                        }
                        this.isNameError = false
                        return true
                
                    case 'email':
                        console.log(emailReg.test(value))
                        if(!emailReg.test(value.toLowerCase())){
                            this.isEmailError = true
                            return false
                        }
                        this.isEmailError = false
                        return true

                    case 'text': 
                        if(value.length === 0){
                            this.isTextError = true
                            return false
                        }
                        this.isTextError = false
                        return true
                        
                    default: return true
                }
            },
            async sendMessage(e){
                e.preventDefault();
                const {email, name, text} = this.$data
                if(email || name || text){
                    try {
                        const response = await fetch(Consts.connectWithAdmin, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({mail: email, clientName: name, messageText: text})
                        })      
                        if(response.ok){
                            this.$store.commit("setAlert", {value: `Отправлено`, type: "success"});
                            this.$data.name = ""
                            this.$data.email = ""
                            this.$data.text = ""
                        }else{
                            throw response
                        }            
                    } catch (error) {
                        this.$store.commit("setAlert", {value: `Сервер временно недоступен`, type: "danger"});
                        console.log(error)
                    }

                }
            }
        }
    });
</script>

<style lang="scss">
    .main{
        padding-bottom: 180px;

        &__hreader{
            font-size: 38px;
            margin-bottom: 20px;
        }

        &__content{
            max-width: 560px;
            margin: 0 auto;
            font-size: 22px;
            font-weight: 300;
        }
    }
    .contacts{
        margin-bottom: 20px;
        &__cont{
            margin-bottom: 40px;
            font-size: 30px;
        }
        &__adr{
            font-size: 18px;
        }
    }
    .feedback{
        margin-bottom: 20px;
        &__form{
            max-width: 460px;
            &-mail{
                margin-bottom: 25px;
                & input{
                    height: 60px;
                    font-size: 16px;
                }
            }
            &-name{
                margin-bottom: 25px;
                & input{
                    height: 60px;
                    font-size: 16px;
                }
            }
            &-text{
                margin-bottom: 25px;
                & textarea{
                    font-size: 16px;
                }
            }
            & button{
                height: 60px;
                padding-left: 60px;
                padding-right: 60px;
            }
        }
    }
    #contacts{
        padding-top: 180px;
        padding-bottom: 180px;
    }

</style>

<svg class="t-sociallinks__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" xml:space="preserve"><desc>Instagram</desc><path d="M15,11.014 C12.801,11.014 11.015,12.797 11.015,15 C11.015,17.202 12.802,18.987 15,18.987 C17.199,18.987 18.987,17.202 18.987,15 C18.987,12.797 17.199,11.014 15,11.014 L15,11.014 Z M15,17.606 C13.556,17.606 12.393,16.439 12.393,15 C12.393,13.561 13.556,12.394 15,12.394 C16.429,12.394 17.607,13.561 17.607,15 C17.607,16.439 16.444,17.606 15,17.606 L15,17.606 Z"></path><path d="M19.385,9.556 C18.872,9.556 18.465,9.964 18.465,10.477 C18.465,10.989 18.872,11.396 19.385,11.396 C19.898,11.396 20.306,10.989 20.306,10.477 C20.306,9.964 19.897,9.556 19.385,9.556 L19.385,9.556 Z"></path><path d="M15.002,0.15 C6.798,0.15 0.149,6.797 0.149,15 C0.149,23.201 6.798,29.85 15.002,29.85 C23.201,29.85 29.852,23.202 29.852,15 C29.852,6.797 23.201,0.15 15.002,0.15 L15.002,0.15 Z M22.666,18.265 C22.666,20.688 20.687,22.666 18.25,22.666 L11.75,22.666 C9.312,22.666 7.333,20.687 7.333,18.28 L7.333,11.734 C7.333,9.312 9.311,7.334 11.75,7.334 L18.25,7.334 C20.688,7.334 22.666,9.312 22.666,11.734 L22.666,18.265 L22.666,18.265 Z"></path></svg>

<svg class="t-sociallinks__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve"><desc>Twitter</desc><path d="M47.762,24c0,13.121-10.639,23.76-23.761,23.76S0.24,37.121,0.24,24c0-13.124,10.639-23.76,23.761-23.76 S47.762,10.876,47.762,24 M38.031,12.375c-1.177,0.7-2.481,1.208-3.87,1.481c-1.11-1.186-2.694-1.926-4.455-1.926 c-3.364,0-6.093,2.729-6.093,6.095c0,0.478,0.054,0.941,0.156,1.388c-5.063-0.255-9.554-2.68-12.559-6.367 c-0.524,0.898-0.825,1.947-0.825,3.064c0,2.113,1.076,3.978,2.711,5.07c-0.998-0.031-1.939-0.306-2.761-0.762v0.077 c0,2.951,2.1,5.414,4.889,5.975c-0.512,0.14-1.05,0.215-1.606,0.215c-0.393,0-0.775-0.039-1.146-0.109 c0.777,2.42,3.026,4.182,5.692,4.232c-2.086,1.634-4.712,2.607-7.567,2.607c-0.492,0-0.977-0.027-1.453-0.084 c2.696,1.729,5.899,2.736,9.34,2.736c11.209,0,17.337-9.283,17.337-17.337c0-0.263-0.004-0.527-0.017-0.789 c1.19-0.858,2.224-1.932,3.039-3.152c-1.091,0.485-2.266,0.811-3.498,0.958C36.609,14.994,37.576,13.8,38.031,12.375"></path></svg>

<svg class="t-sociallinks__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve"><desc>Facebook</desc><path d="M47.761,24c0,13.121-10.638,23.76-23.758,23.76C10.877,47.76,0.239,37.121,0.239,24c0-13.124,10.638-23.76,23.764-23.76C37.123,0.24,47.761,10.876,47.761,24 M20.033,38.85H26.2V24.01h4.163l0.539-5.242H26.2v-3.083c0-1.156,0.769-1.427,1.308-1.427h3.318V9.168L26.258,9.15c-5.072,0-6.225,3.796-6.225,6.224v3.394H17.1v5.242h2.933V38.85z"></path></svg>
