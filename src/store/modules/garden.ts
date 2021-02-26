import Consts from '../../consts/consts'
import axios from 'axios'
export interface Product {
    id: string;
    name: string;
    price: number;
    image: any;
    description: any;
    category: "all" | "veg_seeds" | "berry_seeds" | "flower_seeds" | "house_flower_seeds" | "seedlings";
    family: any;
}

export interface Filters {
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
}

export interface UpdateFiltersPayload {
    name: string;
    value: string;
}

interface Products {
    isFetching: boolean;
    products: Array<Product>;
    filters?: Filters;
}

export default {
    state: {
        isFetching: true,
        products: [],
        filters: {
            search: "",
            minPrice: "0",
            maxPrice: "50000",
            category: "all"
        } as Filters
    },
    mutations: {
        updateProducts(state: Products, products: Array<Product>){
            state.products = products
        },
        updateFilters(state: Products, payload: UpdateFiltersPayload){
            state.filters = {
                ...state.filters,
                [payload.name]: payload.value
            }
        },
        deleteOne(state: Products, id: string){
            state.products = state.products.filter(el => el.id !== id)
        },
        changeFetchingStatus(state: Products, status: boolean){
            state.isFetching = status
        }
    },
    actions: {
        async fetchPosts(context: any){
            context.commit('changeFetchingStatus', true)  
            console.log(context)
            // const response = await fetch("./products.json")
            let url = Consts.products
            if(/admin/.test(window.location.pathname)){
                url = Consts.productsAll
            }
            const response = await fetch(url)
            const data = await response.json()
            console.log("products", data)
            context.commit('updateProducts', data)
            context.commit('changeFetchingStatus', false)   
        },

        async deletePost(context: any, id: string){
            console.log(id)
            try {
                console.log(Consts.deleteProduct)
                const response = await fetch(`${Consts.deleteProduct}/${id}`, {
                    method: "DELETE",
                    headers: { 
                        'Content-Type': 'application/json' 
                    }
                })
                if(response.ok){
                    context.commit('deleteOne', id)
                    context.commit("setAlert", {value: `УДАЛЕНО`, type: "success"});
                  }else{
                    throw response
                  } 
                } catch (error) {
                    console.log(error)
                    context.commit("setAlert", {value: `Не могу удалить категории`, type: "danger"});
                } 
        },

        async addPost(context: any, product: Product){
            console.log(product)
            const fd = new FormData()
            console.log(product)

            const fileName = `${product.image.fileName}_${new Date()}`

            fd.append("name", product.name)
            fd.append("image", product.image, fileName)
            fd.append("price", product.price.toString())
            fd.append("family", JSON.stringify(product.family))
            fd.append("description", product.description)
            fd.append("category", JSON.stringify(product.category))

            try {
                console.log(Consts.deleteProduct)
                const response = await fetch(Consts.deleteProduct, {
                    method: "POST",
                    // headers: { 
                    //     'Content-Type': 'application/json' 
                    // },
                    body: fd
                })
                if(response.ok){
                    context.dispatch('fetchPosts')
                    context.commit("setAlert", {value: `Добавленно`, type: "success"});
                    context.$router.push({path: '/admin'})
                  }else{
                    throw response
                  } 
                } catch (error) {
                    console.log(error)
                    context.commit("setAlert", {value: `Не добавленно`, type: "danger"});
                } 
        },

        async updatePost(context: any, product: Product){
            console.log(product)
            const fd = new FormData()
            console.log(product)

            const fileName = `${product.image.fileName}_${new Date()}`

            fd.append("name", product.name)
            fd.append("image", product.image, fileName)
            fd.append("price", product.price.toString())
            fd.append("family", JSON.stringify(product.family))
            fd.append("description", product.description)
            fd.append("category", JSON.stringify(product.category))

            try {
                console.log(Consts.deleteProduct)
                const response = await fetch(Consts.deleteProduct, {
                    method: "PUT",
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    body: fd
                })
                if(response.ok){
                    context.dispatch('fetchPosts')
                    context.commit("setAlert", {value: `Обновлено`, type: "success"});
                    context.$router.push({path: '/admin'})
                  }else{
                    throw response
                  } 
                } catch (error) {
                    console.log(error)
                    context.commit("setAlert", {value: `Не обновлено`, type: "danger"});
                }
        },

        setFilters(context: any){
            context.commit('updateFilters')
        }
    },

    getters: {
        isProductsAreFetching(state: Products){
            return state.isFetching
        },
        allProducts(state: Products){
            return state.products;
        },
        allFilters(state: Products){
            return state.filters;
        },
        getProductById: (state: Products) => (id: string) => state.products.find((el: Product)=>el.id === id)
    },
}