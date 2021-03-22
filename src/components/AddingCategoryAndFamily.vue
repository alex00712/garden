<template>
    <div class="modal" style="display: block">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 v-if="Object.values(edition).length!==0" class="modal-title">Редактировать {{title}}</h5>
                    <h5 v-else class="modal-title">Добавить {{title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"  >
                        <span @click="close" aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                        <div class="form-group">
                            <label for="exampleInputEmail1">Название </label><br/>
                            <input name="name" class="form-control" type="text" :class="{'is-invalid': isNameError}" @input="changeHandler" v-model="name" />
                            <div v-if="isNameError" class="invalid-feedback">Это поле должно быть заполненым</div>
                        </div>

                        <div v-if="title!=='Семейство'" class="form-group">
                            <label for="exampleInputEmail1">Название подкатегории</label><br/>
                            <!-- <input name="precategory" class="form-control" type="text" @input="changeHandler" v-model="precategory" /> -->
                            <v-select v-model="precategory" @option:selected="setSelectedCategory" label="name" id="category" :options="categories"/>
                        </div>

                        <div v-if="title==='Семейство'" class="form-group">
                            <label for="exampleInputEmail1">Описание</label><br/>
                            <input :class="{'is-invalid': isDesError}" class="form-control" name="description" type="text" @input="changeHandler" v-model="description" />
                            <div  class="invalid-feedback">Это поле должно быть заполненым</div>
                        </div>

                </div>

                <div class="modal-footer">
                    <button v-if="Object.values(edition).length!==0" @click="update" type="button" class="btn btn-success">Сохранить</button>
                    <button v-else @click="add" type="button" class="btn btn-primary">Создать</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import vSelect from '../../node_modules/vue-select/src/index.js';
    import consts from '../consts/consts'
    export default defineComponent({
        data(){
            return {
                name: '',
                description: '',
                precategory: '',
                categories: [],
                isNameError: false,
                isDesError: false
            }
        },
        components: {
            'v-select': vSelect,
        },
        props: {
            title: {
                type: String,
            },
            edition: {
                type: Object
            }
        },
        mounted(){
            if(this.edition){
                console.log(this.edition)
                if(this.edition.childCategory){
                    this.$data.precategory = this.edition.childCategory
                }
                this.name = this.edition.name
                if(this.title==="Семейство"){
                    this.description = this.edition.description
                }
            }
            this.loadCategories()
        },
        methods: {
            close(){
                this.name = ""
                this.description = ""
                this.precategory = ""
                this.$emit('close')
            },
            setSelectedCategory(data){
                console.log(data)
                this.$data.precategory = data
            },
            async loadCategories(){
                try {
                    const response = await fetch(consts.category)
                    if(response.ok){
                        const data = await response.json();
                        this.$data.categories = data.body
                        console.log(data.body)
                    }else{
                        throw response
                    } 
                    } catch (error) {
                        console.log(error)
                        this.$store.commit("setAlert", {value: `Не могу загрузить категории`, type: "danger"});
                }
            },
            changeHandler(e){
                const {name, value} = e.target
                if(this.validateInput(name, value)){
                    this.$data[name] = value
                }
            },

            validateInput(name, value){
                switch(name){
                    case 'name':
                        if(value.length === 0){
                            return this.$data.isNameError = true;
                        }
                        this.$data.isNameError = false;
                        break;

                    case 'precategory':
                        return true;                     

                    case 'description':
                        if(value.length === 0){
                            return this.$data.isDesError = true;
                        }
                        this.$data.isDesError = false;
                        break;
                }
            },

            async update(){
                let url = consts.deleteCategory
                let body = {id: this.edition.id, name: this.$data.name}

                if(this.$data.precategory){
                    body.childCategory = this.$data.precategory
                }

                if(this.$props.title==='Семейство'){
                    url = consts.deleteFamily
                    body = {id: this.edition.id, name: this.$data.name, description: this.$data.description}
                }
                console.log(JSON.stringify(body))
                const V = Object.values(body).includes("")

                if(!V){
                    try {
                        const response = await fetch(url, {
                            method: "PUT",
                            headers: { 
                                'Content-Type': 'application/json' 
                            },
                            body: JSON.stringify(body)
                        })
                        if(response.ok){
                            this.$emit('done', {e: this.$props.title})
                        }else{
                            throw response
                        } 
                        } catch (error) {
                        console.log(error)
                            this.$store.commit("setAlert", {value: `Не могу редактировать`, type: "danger"});
                        }
                }

            },

            async add(){
                let url = consts.deleteCategory
                let body = {name: this.$data.name}

                if(this.$data.precategory){
                    console.log(this.$data.precategory)
                    body.childCategory = {id: this.$data.precategory.id}
                }

                if(this.$props.title==='Семейство'){
                    url = consts.deleteFamily
                    body = {name: this.$data.name, description: this.$data.description}
                }

                const V = Object.values(body).includes("")

                if(!V){
                    
                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: { 
                                'Content-Type': 'application/json' 
                            },
                            body: JSON.stringify(body)
                        })
                        if(response.ok){
                            this.$emit('done', {e: this.$props.title})
                        }else{
                            throw response
                        } 
                        } catch (error) {
                        console.log(error)
                            this.$store.commit("setAlert", {value: `Не могу добавить`, type: "danger"});
                        }

                }

            }

        }
    })
</script>

<style lang="scss">

</style>