<template>
    <transition name="payment">
        <div v-if="getPayment.isOpen" class="modal" style="display: block">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Оформление заказа</h5>
                    <button type="button" class="close" @click="setPayment" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class = "row">
                        <div class = "col-12 text-left feedback">
                            <form class = "feedback__form">
                                <div class="form-group">
                                    <input name ="userName" :class="{'is-invalid': isNameError}" @input="inputChangeHandler" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Ваше имя">
                                    <div v-if="isNameError" class="invalid-feedback">как Вас зовут?</div>
                                </div>
                                <div class="form-group">
                                    <input name ="tel" :class="{'is-invalid': isPhoneError}" @input="inputChangeHandler" type="tel" class="form-control" id="exampleFormControlInput1" placeholder="Ваш телефон">
                                    <div v-if="isPhoneError" class="invalid-feedback">неверный телефон</div>                                   
                                </div>
                                <div class="form-group">
                                    <input name ="e-mail" :class="{'is-invalid': isEmailError}" @input="inputChangeHandler" type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ваш E-mail">
                                    <div v-if="isEmailError" class="invalid-feedback">неверный e-mail</div> 
                                </div>
                                <div class="form-group">
                                    <input name ="address" :class="{'is-invalid': isAddressError}" @input="inputChangeHandler" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Адресс доставки">
                                    <div v-if="isAddressError" class="invalid-feedback">неверный адресс</div> 
                                </div>
                               
                                <div class="form-group feedback__form-text">
                                    <textarea name="feedback" class="form-control" @input="inputChangeHandler" id="exampleFormControlTextarea1" rows="3" placeholder="Коментарии"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button :disabled="isButtonDisable" @click="sendPaymentInformation" class="btn btn-success" type="button">Оформить</button>
                </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { defineComponent } from 'vue';
    import { mapGetters } from 'vuex'
    import TelephoneMask from '../utils/telephoneMask'

    // const telePhoneM = new TelephoneMask("+7-(___)-___-__-__")
    const emailReg  = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

   
   export default defineComponent({
        data(){
            return {
                telephone: "",
                isEmailError: false,
                isNameError: false,
                isPhoneError: false,
                isAddressError: false
            }
        },
        name: 'Contacts',
        computed: {
            ...mapGetters(['payment']),
            getPayment(){
                const payment = this.$store.getters.getPayment
                if(payment.isOpen){
                    this.$store.dispatch("countProducts");
                }
                return this.$store.getters.getPayment
            },
            isButtonDisable(){
                return (this.isEmailError || this.isNameError || this.isPhoneError) ? true : false
            }
        },
        methods: {
            inputChangeHandler(e){
                const {name, value} = e.target
                // console.log(name, value)
                if(this.validateInput(name, value)){
                    this.$store.dispatch("setPersonData", {name, value})
                }
            },
            validateInput(name, value){
                switch(name){
                    case 'userName':
                        if(value.length === 0){
                            this.isNameError = true
                            return false
                        }
                        this.isNameError = false
                        return true

                    case 'tel':
                        // this.telephone = telePhoneM.check(value)
                        if(value.length < 11){
                            this.isPhoneError = true
                            return false
                        }

                        this.isPhoneError = false
                        return true
                
                    case 'e-mail':
                        console.log(emailReg.test(value))
                        if(!emailReg.test(value.toLowerCase())){
                            this.isEmailError = true
                            return false
                        }
                        this.isEmailError = false
                        return true

                    case 'address': 
                        if(value.length === 0){
                            this.isAddressError = true
                            return false
                        }
                        this.isAddressError = false
                        return true
                        
                    default: return true
                }
            },
            setPayment(){
                this.$store.dispatch("setPaymentAction", false);
            },
            sendPaymentInformation(){
                // console.log(this.$store.getters.getPayment)
                const {paymentData} = this.$store.getters.getPayment
                const {address, client} = paymentData
                const {firstName, phoneNumber, email} = client
                if(firstName || phoneNumber || email || address){
                    return this.$store.dispatch('sendPaymentInformation')
                }
                return 0
            }
        },
    });
</script>

<style lang="css">
    .open{
        display: block !important;
    }
    .payment-leave-active,
    .payment-enter-active {
        transition: 1s;
    }
    .payment-enter-from, .payment-leave-to {
        transform: translate(0, -100%);
        opacity: 0;
    }
</style>