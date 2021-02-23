import {Product} from './garden'


export interface ModalWindow {
    isOpen: boolean;
    element: number;
    product: Product;
}

export interface PayoadForCount {
    N: number;
}


export default {
    state: {
        isOpen: false,
        element: 1,
        product: {}
    } as ModalWindow,

    mutations: {
        showWindow(state: ModalWindow){
            state.isOpen = !state.isOpen
        },
        setProduct(state: ModalWindow, product: Product){
            state.product = product
            console.log(state)
        }
    },

    actions: {
        showWindow(context: any, id: string){
            context.commit('showWindow')
            const pr = context.getters.getProductById(id)
            context.commit('setProduct', pr)
            const element = context.getters.allProducts.find((el: Product) => el.id === id)


        },
        changeCard(context: any, n: number){ 
            const mas = context.getters.allProducts

                context.state.element +=n

                console.log(context.state.element)

                if(mas[context.state.element] !== undefined){
                    context.state.product = mas[context.state.element]
                }
                else if(mas[context.state.element] === undefined && n>0){
                    context.state.element = 0
                    context.state.product = mas[0]
                }
                else if(mas[context.state.element] === undefined && n<0){
                    context.state.element = 15
                    context.state.product = mas[mas.length-1]
                }

        }

    },

    getters: {
      isModalOpen(state: ModalWindow){
          return state;
      }
    },
}