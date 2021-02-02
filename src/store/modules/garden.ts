import Consts from '../../consts/consts'

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: "all" | "veg_seeds" | "berry_seeds" | "flower_seeds" | "house_flower_seeds" | "seedlings";
    family: string;
}

export interface Filters {
    minPrice?: string;
    maxPrice?: string;
    category?: string;
}

export interface UpdateFiltersPayload {
    name: string;
    value: string;
}

interface Products {
    products: Array<Product>;
    filters?: Filters;
}

export default {
    state: {
        products: [],
        filters: {
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
        }
    },
    actions: {
        async fetchPosts(context: any){
            console.log(context)
            const response = await fetch("./products.json")
            // const response = await fetch(Consts.products)
            const data = await response.json()
            console.log(data)
            context.commit('updateProducts', data.products)
        },
        setFilters(context: any){
            context.commit('updateFilters', )
        }
    },
    getters: {
      allProducts(state: Products){
          return state.products;
        },
      allFilters(state: Products){
        return state.filters;
        }
    },
}