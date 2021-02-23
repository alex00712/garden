<template>
    <div class = "row mt-2 mb-4 justify-content-between">
        <div class = "col-12 " >
            <h3 v-if="id">Редактирование товара</h3>
            <h3 v-else>Добавление нового товара</h3>
        </div>
        <div class = "col-auto ">
            <button class="btn btn-success mb-2" @click="goTo('/admin')">Каталог <i class="fas fa-air-freshener"></i></button>
        </div>
        <!-- <div class = "col-auto ">
            <button class="btn btn-info mb-2" @click="goTo('payment')"><i class="fas fa-money-bill-wave"></i> Оформить</button>
        </div> -->
    </div>

 <div class = "row" >
       <div class = "col-12">
            <form>
                <div class="form-group text-left">
                    <label for="name">Название</label>
                    <input name="name" type="text" class="form-control" :class="{'is-invalid': errors.isNameError}" id="email" @input="inputChangeHandler" v-model="newProd.name" placeholder="Введите название товара">
                    <div v-if="errors.isNameError" class="invalid-feedback">
                        Товар не может быть без названия
                    </div>
                </div>

                <div class="form-group text-left">
                    <label for="price">Цена</label>
                    <input name="price" type="number" class="form-control" :class="{'is-invalid': errors.isPriceError}" id="pass" @input="inputChangeHandler" v-model="newProd.price" placeholder="Установите цену">
                    <div v-if="errors.isPriceError" class="invalid-feedback">
                        Задайте коректную цену для данного товара
                    </div>
                </div>
                <div class="row align-items-center">
                  <div class = "col-12 text-left"><label for="image">Изображение</label></div>
                  <input style="display: none" type="file" @change="selectFile" ref="fileInput" />
                  <div class="col-12 d-flex justify-content-center">
                    <div class = "preImage" @click="fileHandler">
                      <img v-if="newProd.image" :src="image" alt="img" />
                      <i v-else class="fas fa-image"></i>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="form-group">
                      <!-- <input name="image" type="text" class="form-control"  id="pass" @input="inputChangeHandler" v-model="newProd.image" placeholder="Ссылка на изображение"> -->
                      <!-- <div v-if="errors.isImageError" class="invalid-feedback">
                          Неверная ссылка
                          :class="{'is-invalid': errors.isImageError}"
                      </div> -->
                    </div>
                  </div>
                  
                </div>
                
                <div class="form-group text-left">
                    <label for="description">Описание</label>
                    <input name="description" type="text" class="form-control" :class="{'is-invalid': errors.isDescriptionError}" id="pass" @input="inputChangeHandler" v-model="newProd.description" placeholder="Опишите товар">
                    <div v-if="errors.isDescriptionError" class="invalid-feedback">
                        Описание должно содержать хотя бы 5 символов
                    </div> 
                </div>

                <div class="form-group text-left">
                    <label for="category">Категория</label>
                    <v-select v-model="newProd.category" @option:selected="setSelected" label="name" id="category" :options="categories"/>
                </div>

                
                <div class="form-group text-left">
                    <label for="category">Семейство</label>
                    <v-select v-model="newProd.family" @option:selected="setSelectedFamily" label="name" id="category" :options="families"/>
                </div>
                
                <button v-if="id" :disabled="isButtonDisable" @click="upDateProduct" class="btn btn-warning">Обновить <i class="fas fa-pencil-alt"></i></button>
                
                <button v-else :disabled="isButtonDisable" @click="addProduct" class="btn btn-success">Добавить <i class="fas fa-cloud-upload-alt"></i></button>  
           
            </form>
        </div>
    </div>
</template>

<script>
import consts from '@/consts/consts'
import { defineComponent } from 'vue';
import vSelect from '../../node_modules/vue-select/src/index.js';
import isAmptyObj from '../utils/isAmptyObj'
const urlExp = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/)

export default defineComponent({
    props: {
        id: {
            type: String,
            default: ""
        },
    },
    components: {
        'v-select': vSelect
    },
  name: 'AddingProduct',
  data(){
    return {
      categories: [],
      families: [],
      newProd: {
        category: {},
        description: "",
        family: {},
        image: "",
        name: "",
        price: 0,
      },
      errors: {
        isNameError: false,
        isDescriptionError: false,
        isPriceError: false,
        isImageError: false, 
      },
      isFormDisable: true
    }
  },
  computed: {
    isButtonDisable(){
      return (this.errors.isNameError || this.errors.isDescriptionError || this.errors.isPriceError || this.errors.isImageError || !!this.errors.category) ? true : false ;
    },
    image(){
      if(urlExp.test(this.newProd.image)){
        return this.newProd.image
      }
      return URL.createObjectURL(this.newProd.image)
    }
  },

  created() {
    this.loadCategories()
    this.loadFamilies()

    if(this.id){
      this.getProductsById(this.id)
    }
  },
  methods: {
    fileHandler(){
      this.$refs.fileInput.click()
    },
    selectFile(e){
      console.log('selectFile', e.target.files)
      this.newProd.image = e.target.files[0]
      console.log(this.newProd)
    },
    goTo(path){
      this.$router.push({path})
    },
    async getProductsById(id){
        try {
          const responce = await fetch(`${consts.poductById}/${id}`)
          if(responce.ok){
            const data = await responce.json();
            this.newProd = data
          }else{
            throw responce
          }
        } catch (error) {
          console.log(error)
          this.$store.commit("setAlert", {value: `Сервер временно не доступен`, type: "danger"});
        }
      },
    async loadCategories(){
      try {
            const response = await fetch(consts.category)
            if(response.ok){
                const data = await response.json();
                this.$data.categories = data.body
              }else{
                throw response
              } 
            } catch (error) {
                console.log(error)
                this.$store.commit("setAlert", {value: `Не могу загрузить категории`, type: "danger"});
            }
    },
    async loadFamilies(){
      try {
            const response = await fetch(consts.family)
            if(response.ok){
                const data = await response.json();
                this.$data.families = data.body
              }else{
                throw response
              } 
            } catch (error) {
                console.log(error)
                this.$store.commit("setAlert", {value: `Не могу загрузить фамилию`, type: "danger"});
            }
    },

    addProduct(e){
      e.preventDefault()
      const {category, description, family, image, name, price} = this.newProd
      if(!isAmptyObj(category) && description && !isAmptyObj(family) && image && name && price){
        this.$store.dispatch('addPost', this.newProd)
      }else{
        this.$store.commit("setAlert", {value: `Заполните все поля`, type: "warning"});
      }
    },

    upDateProduct(e){
      e.preventDefault()
      const {category, description, family, image, name, price} = this.newProd
      if(!isAmptyObj(category) && description && !isAmptyObj(family) && image && name && price){
        this.$store.dispatch('updatePost', this.newProd)
      }else{
        this.$store.commit("setAlert", {value: `Заполните все поля`, type: "warning"});
      }
    },

    setSelected(data){
        this.newProd.category = data
        console.log(this.newProd)
    },
    setSelectedFamily(data){
      console.log(data)
    },
    inputChangeHandler(e){
      const {name, value} = e.target
      this.newProd[name] = value
      this.validateInput(name, value)
      },
    validateInput(name, value){
      console.log(name, value)
      switch(name){
        case 'name':
          if(value.length === 0){
            return this.errors.isNameError = true
          }
          this.errors.isNameError = false
          break;

        case 'description':
          if(value.length < 5 ){
            return this.errors.isDescriptionError = true
          }
          this.errors.isDescriptionError = false
          break;

          case 'image':
            if(urlExp.test(value)){
              return this.errors.isImageError = false
          }
          this.newProd.image = ""
          this.errors.isImageError = true
          break;

          case 'price':
            if(value>0){
              return this.errors.isPriceError = false
          }
          this.errors.isPriceError = true
          break;

      }
    },
  },
});
</script>

<style lang="scss">
  .preImage{
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
    border: 1px dashed black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // background: no-repeat center url('../assets/error.png') ;
    // background-size: cover;
    z-index: 10;
    & img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
    & i{
      font-size: 3rem
    }
  }
  


  
</style>