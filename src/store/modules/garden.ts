export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    family: string;
}

interface Products {
    products: Array<Product>;
}


export default {
    state: {
        products: [],
    },
    mutations: {
        updateProducts(state: Products, products: Array<Product>){
            state.products = products
        }
    },
    actions: {
        async fetchPosts(context: any){
            const response = await fetch("./products.json")
            // const response = await fetch("https://greenisland.herokuapp.com/products")
            const data = await response.json()
            console.log(data)
            context.commit('updateProducts', data.products)
        }
    },
    getters: {
      allProducts(state: Products){
          return state.products;
      }
    },
}