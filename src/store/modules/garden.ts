import Consts from '../../consts/consts'
import router from '../../router/index'
import axios from 'axios'
import consts from '../../consts/consts'
export interface Product {
    id: string;
    active: boolean;
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
    isNewFetching: boolean;
    isFetching: boolean;
    separatosCategory: any;
    products: Array<Product>;
    filters?: Filters;
}

export default {
    state: {
        isNewFetching: false,
        isFetching: true,
        separatosCategory: [],
        products: [],
        filters: {
            search: "",
            minPrice: "0",
            maxPrice: "5000",
            category: "all"
        } as Filters
    } as Products,
    mutations: {
        updateProducts(state: Products, products: Array<Product>){
            console.log("products", products)

            const PRODUCTS: Array<Product> = []

            for(let i = 0; i < products.length; i++){
                try {
                    products[i].description = JSON.parse(products[i].description)
                    PRODUCTS.push(products[i])
                } catch (error) {
                    console.warn("Неверный формат: ", products[i])
                }
            }
            
            state.products = PRODUCTS

            // state.products = products
        },
        setCategory(state: Products, payload: any){
            console.log('category', payload)
            state.separatosCategory = payload
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
        },
        changeNewFetchingStatus(state: Products, status: boolean){
            state.isNewFetching = status
        }
    },
    actions: {
        async fetchPosts(context: any){
            // const defaultAdminStorage = localStorage.getItem(consts.defaultAdminStorage)
            // const defaultUserStorage = localStorage.getItem(consts.defaultUserStorage)
            // context.commit('changeFetchingStatus', true)
            // context.commit('changeNewFetchingStatus', true) // TODO
            // console.log(context)
            let url = Consts.products
            if(/admin/.test(window.location.pathname)){
                // if(defaultAdminStorage){
                //     context.commit('updateProducts', JSON.stringify(defaultAdminStorage))
                // }else{
                //     const defData = await fetch("./products.json")
                //     const data = await defData.json()
                //     context.commit('updateProducts', data.products)
                // }
                // context.commit('changeFetchingStatus', false) 
                url = Consts.productsAll
            }
            // else{
            //     if(defaultUserStorage){
            //         context.commit('updateProducts', JSON.stringify(defaultUserStorage))
            //     }else{
            //         const defData = await fetch("./products.json")
            //         const data = await defData.json()
            //         context.commit('updateProducts', data.products)
            //     }
            //     context.commit('changeFetchingStatus', false) 
            // }
            const response = await fetch(url)
            const data = await response.json()
            console.log("products", data)
            context.commit('updateProducts', data)
            context.commit('changeFetchingStatus', false)   
            // context.commit('changeNewFetchingStatus', false)
            // if(url===Consts.productsAll){
            //     localStorage.setItem(Consts.defaultAdminStorage, data)
            // }else{
            //     localStorage.setItem(Consts.defaultUserStorage, data)
            // }
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
                    router.push({path: '/admin'})
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
            // const fd = new FormData()
            // console.log(product)
            // const date: Date = new Date()
            // const fileName = `${product.image.fileName}_${+date}`

            // fd.append("active", product.active.toString())
            // fd.append("name", product.name)
            // fd.append("image", product.image, fileName)
            // fd.append("price", product.price.toString())
            // fd.append("family", JSON.stringify(product.family))
            // fd.append("description", product.description)
            // fd.append("category", JSON.stringify(product.category))

            try {
                console.log(Consts.deleteProduct)
                const response = await fetch(Consts.deleteProduct, {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(product)
                })
                if(response.ok){
                    context.dispatch('fetchPosts')
                    context.commit("setAlert", {value: `Добавленно`, type: "success"});
                    router.push({path: '/admin'})
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
            // const fd = new FormData()
            console.log(product)
            const date: Date = new Date()
            const fileName = `${product.image.fileName}_${+date}`
            
            // if(typeof product.image === "string"){
            //     fd.append("id", product.id)
            //     fd.append("active", product.active.toString())
            //     fd.append("name", product.name)
            //     fd.append("price", product.price.toString())
            //     fd.append("family", JSON.stringify(product.family))
            //     fd.append("description", product.description)
            //     fd.append("category", JSON.stringify(product.category))
            // }else{
            //     fd.append("id", product.id)
            //     fd.append("active", product.active.toString())
            //     fd.append("name", product.name)
            //     fd.append("image", product.image, fileName)
            //     fd.append("price", product.price.toString())
            //     fd.append("family", JSON.stringify(product.family))
            //     fd.append("description", product.description)
            //     fd.append("category", JSON.stringify(product.category))
            // }



            try {
                console.log(Consts.deleteProduct)
                const response = await fetch(Consts.deleteProduct, {
                    method: "PUT",
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(product)
                })
                if(response.ok){
                    context.dispatch('fetchPosts')
                    context.commit("setAlert", {value: `Обновлено`, type: "success"});
                    router.push({path: '/admin'})
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
        },
        async getCategory(context: any){
            try {
                console.log(Consts.category)
                const response = await fetch(Consts.category)
                if(response.ok){
                    const data = await response.json()
                    // context.dispatch('fetchPosts')
                    context.commit("setCategory", data.body);
                    // router.push({path: '/admin'})
                    console.log("setCategory", data.body)
                    
                  }else{
                    throw response
                  } 
                } catch (error) {
                    console.log(error)
                    // context.commit("setAlert", {value: `Не обновлено`, type: "danger"});
                }         
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
        getSeparatosCategory(state: Products){
            return state.separatosCategory
        },
        getProductById: (state: Products) => (id: string) => state.products.find((el: Product)=>el.id === id),
        getNewLoader(state: Products){
            return state.isNewFetching
        }
    },
}