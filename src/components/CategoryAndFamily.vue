<template>
    <div class = "row">
        <div class="col-12">
            <h4>Категории и семейства</h4>
        </div>
        
        <div class="col-12" >
            <div class="row">
                <div class = "col-auto ">
                    <button class="btn btn-success mb-2" @click="goTo('/admin')">Каталог <i class="fas fa-air-freshener"></i></button>
                </div>
            </div>
        </div>

        <div class = "col-12 col-md-6">
            <h5>Категории</h5>
            <transition-group name="flip-list" class = "list-group" tag="ul">
                <li v-for="item in categories" class="list-group-item d-flex justify-content-between" :key="item.id">
                    {{item.name}}
                    <div>
                        <i @click="editCategory(item.id)" class="changeIcon fas fa-cog"></i>
                        <i @click="deleteCategory(item.id)" class="deleteIcon far fa-trash-alt"></i>
                    </div>
                </li>
                <li @click="openAddingWindow('Категория')" class="add list-group-item">
                    <i class="fas fa-plus"></i>
                </li>
            </transition-group>
        </div>

        <div class = "col-12 col-md-6" >
            <h5>Семейства</h5>
            <transition-group name="flip-list" class = "list-group" tag="ul">
                <li v-for="item in families" class="list-group-item d-flex justify-content-between" :key="item.id">
                    {{item.name}}
                    <div>
                        <i @click="editFamily(item.id)" class="changeIcon fas fa-cog"></i>
                        <i @click="deleteFamily(item.id)" class="deleteIcon far fa-trash-alt"></i>
                    </div>
                </li>
                <li @click="openAddingWindow('Семейство')" class="add list-group-item">
                    <i class="fas fa-plus"></i>
                </li>
            </transition-group>
        </div>

        <div v-if="window.isOpen">
            <AddingCategoryAndFamily :edition="edition" @done="load($event)" @close="close" :title="window.title"/>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import AddingCategoryAndFamily from './AddingCategoryAndFamily'
    import consts from '../consts/consts'
    export default defineComponent({
        data(){
            return{
                edition: {},
                categories: [],
                families: [],
                window: {
                    isOpen: false,
                    title: ''
                }
            }
        },
        name: 'CategoryAndFamily',
        components: {
            AddingCategoryAndFamily
        },
        computed: {
            
        },
        methods: {
            editCategory(id){
                this.$data.edition = this.categories.find(el=>el.id===id)
                this.$data.window.title = "Категория"
                this.$data.window.isOpen = true
            },
            editFamily(id){
                this.$data.edition = this.families.find(el=>el.id===id)
                this.$data.window.title = "Семейство"
                this.$data.window.isOpen = true
            },
            goTo(path){
                this.$router.push({path})
            },
            close(){
                this.edition = {}
                this.$data.window.isOpen = false
            },
            openAddingWindow(title){
                console.log(title)
                this.$data.window.isOpen = true
                this.$data.window.title = title
            },
            
            async deleteCategory(id){
                try {
                    const response = await fetch(`${consts.deleteCategory}/${id}`, {
                        method: "DELETE"
                    })
                    if(response.ok){
                        const data = await response.text();
                        if(data!==""){
                            this.$store.commit("setAlert", {value: `Нельзя удалить категорию имеющихся товаров`, type: "danger"});
                        }
                        this.loadCategories()
                    }else{
                        throw response
                    } 
                    } catch (error) {
                    console.log(error)
                        this.$store.commit("setAlert", {value: `Не могу удалить категорию`, type: "danger"});
                    }
            },

            async deleteFamily(id){
                try {
                    const response = await fetch(`${consts.deleteFamily}/${id}`, {
                        method: "DELETE"
                    })
                    if(response.ok){
                        const data = await response.text();
                        if(data!==""){
                            this.$store.commit("setAlert", {value: `Нельзя удалить семейство имеющихся товаров`, type: "danger"});
                        }
                        this.loadFamilies()
                    }else{
                        throw response
                    } 
                    } catch (error) {
                    console.log(error)
                        this.$store.commit("setAlert", {value: `Не могу удалить семейство`, type: "danger"});
                    }
            },
            load(e){
                console.log('e', e)
                if(e.e==='Категория'){
                    this.$data.window.isOpen = false
                    this.loadCategories()
                }
                else if(e.e==='Семейство'){
                    this.$data.window.isOpen = false
                    this.loadFamilies()
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
        },
        created() {
            this.loadCategories()
            this.loadFamilies()
        },
    });
</script>

<style lang="scss" scope >
    .changeIcon{
        cursor: pointer;
        margin-right: 20px;
        &:hover{
            transform: scale(1.1);
        }
    }
    .deleteIcon{
        cursor: pointer;
        &:hover{
            transform: scale(1.1);
        }
    }
    .add:hover{
        cursor: pointer;
        background-color: #eee;
        i {
            transform: scale(1.1);
        }
    }
    .flip-list-enter-from,
    .flip-list-leave-to {
        opacity: 0;
        transform: scale(.4);
    }

    .flip-list-leave-active {
        /* position: absolute; */
    } 
</style>