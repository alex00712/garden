import { CardPosition } from './cart'
import Consts from '../../consts/consts'

export interface Payment {
    isOpen: boolean;
    paymentData: PaymentData;
}

export interface PaymentData {
    price: number;
    address: string;
    comment: string;
    client: ClientData;
    orders: Array<Order>;
}

export interface ClientData{
    email: string;
    firstName: string;
    lastName?: string;
    phoneNumber: string;
    active: boolean;
    password: number;
    username: string;
}
export interface Order{
    product: {id: string};
    count: number;
}

export default {
    state: {
        isOpen: true,
        paymentData: {
            price: 0,
            address: "",
            comment: "",
            client: {} as ClientData,
            orders: []
        }
    } as Payment,

    mutations: {
        setPayment(state: Payment, flag: boolean){
            state.isOpen = flag
        },
        setUpOrder(state: Payment, card: Array<CardPosition>){

            const _orders: Array<Order> = []
            let _prise = 0

            card.map((el: CardPosition)=>{

                _prise+=el.count*el.price
                
                const _order: Order = {
                    product: {id: el.id},
                    count: el.count,
                }
                _orders.push(_order)
                
            })

            state.paymentData.orders = _orders
            state.paymentData.price = _prise
        },
        setPersonDataAction(state: Payment, payload: {name: string; value: string}){
            const {name, value} = payload
            switch (name) {
                case "userName":
                    const nameAnfSirname: Array<string> = value.split(" ")
                    // console.log(nameAnfSirname)
                    if(nameAnfSirname.length === 2){
                        state.paymentData.client.firstName = nameAnfSirname[0]
                        state.paymentData.client.lastName = nameAnfSirname[1]
                    }else{
                        state.paymentData.client.firstName = nameAnfSirname[0]
                        state.paymentData.client.lastName = nameAnfSirname[0]
                    }
                    break;
            
                case "tel":
                    state.paymentData.client.phoneNumber = value
                    break;  

                case "e-mail":
                    state.paymentData.client.email = value
                    break; 
                
                case 'feedback':
                    state.paymentData.comment = value
                    break; 

                case 'address':
                    state.paymentData.address = value
                    break; 

                default:
                    break;
            }
            console.log(state.paymentData)
        }
    },

    actions: {
        setPaymentAction(context: any, payload: boolean){
            context.commit('setPayment', payload)
        },
       countProducts(context: any){
            const myCard: Array<CardPosition> = context.getters.allMyCard
            context.commit('setUpOrder', myCard)
       },
       setPersonData(context: any, payload: {name: string; value: string}){
            context.commit('setPersonDataAction', payload)
       },
       async sendPaymentInformation(context: any){
           console.log('send')
            const myPaymentInformation: PaymentData = context.getters.getPayment.paymentData;
            try {
                const response = await fetch(Consts.clientOrder, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(myPaymentInformation)
                }) 
                if(response.ok){
                    context.commit("setPayment", false)
                    context.commit('clearCard')
                    context.commit("setAlert", {value: `С Вами свяжутся`, type: "success"});
                }else{
                    throw response
                }             
            } catch (error) {
                context.commit("setAlert", {value: `Сервер временно не доступен`, type: "danger"});
                console.log(error)
            }

       }
    },

    getters: {
        getPayment(state: Payment){
            return state;
        }
    },
}