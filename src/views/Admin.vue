<template> 
    <div v-if="!auth.isAuth" class = "row justify-content-center">
        <div class = "col-12 col-md-6 col-lg-4">
            <form>
                <div class="form-group text-left">
                    <label for="email">Логин </label>
                    <input name="login" type="email" class="form-control" :class="{'is-invalid': destractData.isLoginError}" id="email" @input="inputChangeHandler" placeholder="Enter email">
                    <div v-if="destractData.isLoginError" class="invalid-feedback">
                        {{destractData.isLoginErrorMessage}}
                    </div>
                    <!-- <md-button>qwe</md-button> -->
                </div>
                <div class="form-group text-left">
                    <label for="pass">Password</label>
                    <input name="pass" type="password" class="form-control" :class="{'is-invalid': destractData.isPassError}" id="pass" @input="inputChangeHandler" placeholder="Password">
                    <div v-if="destractData.isPassError" class="invalid-feedback">
                        {{destractData.isPassPassMessage}}
                    </div>
                </div>
                <div class="form-group form-check">
                    <input name="isRemember" type="checkbox" class="form-check-input" id="check" @input="inputChangeHandler">
                    <label class="form-check-label" for="check">Запомнить меня</label>
                </div>
                <button :disabled="isButtonDisable" @click="login" class="btn btn-primary">Войти</button>
            </form>
        </div>
    </div>
    <div v-else >
        <div class = "row ">
            <div class = "col-12 d-flex justify-content-between" >
                <h2>Это страница для редактирования контента</h2>
                <button @click="logout" type="button" class="btn btn-outline-danger">Выйти</button>
            </div>
            <div class = "col" style="margin-top: 50px; margin-bottom: 50px;">
                <button @click="this.$router.push({path: '/admin/adding_new'})" type="button" class="btn btn-success">Добавить новый товар</button>
            </div>
        </div>
        <Products isEdit="true"  />
    </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
// import {MdField, mdInput} from 'vue-material/dist/components'
import Products from '@/components/Products' 
import consts from '@/consts/consts'
import axios from 'axios'


export default defineComponent({

  name: 'Auth',
  components: {
    Products
  },
  data(){
      return {
          loginData: {
            login: "",
            pass: "",
            isRemember: true,
            errors: {
              isLoginError: false,
              isLoginErrorMessage: "",
              isPassError: false,
              isPassErrorMessage: "",
            }
          }
          
      }
  },
  computed: {
      ...mapGetters(['auth']),
      destractData(){
          return {
            login: this.loginData.login,
            pass: this.loginData.pass,
            isRemember: this.loginData.isRemember,
            isLoginError: this.loginData.errors.isLoginError,
            isLoginErrorMessage: this.loginData.errors.isLoginErrorMessage,
            isPassError: this.loginData.errors.isPassError,
            isPassErrorMessage: this.loginData.errors.isPassErrorMessage,
        }
    },
    isButtonDisable(){
        return (this.destractData.isLoginError || this.destractData.isPassError) ? true : false
    }
  },
  created(){
    this.$store.dispatch('isTokenForAuth')
  },
  methods: {
        inputChangeHandler(e){
            const {name, value} = e.target
            this.loginData[name] = value
            this.validateInput(name, value)
        },
        validateInput(name, value){
            switch(name){
                case 'login':
                    if(value.length === 0){
                        return this.loginData.errors.isLoginError = true
                    }
                    this.loginData.errors.isLoginError = false
                    this.loginData.errors.isLoginErrorMessage = "Это поле не должно быть пустым"
                    break;

                case 'pass':
                    if(value.length === 0){
                        return this.loginData.errors.isPassError = true
                    }
                    this.loginData.errors.isPassError = false
                    this.loginData.errors.isLoginErrorMessage = "Это поле не должно быть пустым"
                    break;
            }
        },
        async login(e){
            e.preventDefault()
            const {login, pass, isLoginError, isPassError} = this.destractData
            if(!login || !pass || isLoginError || isPassError){
                return this.$store.commit("setAlert", {value: `Данные не выедены`, type: "warning"});
            }
            const data = {
                username: login,
                password: pass
            }
            try {
                const response = await fetch(consts.login, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data) 
                })
                if(response.ok){
                    const data = await response.text();
                    this.$store.commit("setAuth", {sessionId: data});
                    localStorage.setItem('token', data)
                }else{
                    throw response
                } 
            } catch (error) {
                console.log(error)
                this.$store.commit("setAlert", {value: `Что-то пошло не так`, type: "danger"});
            }
        },
        logout(){
            this.$store.commit("removeAuth");
        }
  },
});
</script>