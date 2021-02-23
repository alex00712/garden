import Consts from '../../consts/consts'
import {Product} from '../modules/garden'



export interface CardPosition extends Product {
    count: number;
}

export interface MyCard {
    myCard: Array<CardPosition>;
}

export type Operation = "increment" | "decrement"

export interface AddToCardPayload {
    card: CardPosition;
    operation: Operation;
}

export default {
    state: {
        myCard: []
    },

    mutations: {
        setMyCard(state: MyCard, payload: Array<CardPosition>){
            state.myCard = payload
            console.log(state.myCard)
        },

        addNewCardPosition(state: MyCard, payload: Product): void{
            
            console.log(payload) //---

            const newCardPosition: CardPosition = {...payload, count: 1}

            state.myCard.push(newCardPosition)

            localStorage.setItem(Consts.cardName, JSON.stringify(state.myCard))


        },

        updateCardPosition(state: MyCard, payload: AddToCardPayload){

            const {card, operation} = payload

            state.myCard.map(el => {
                if(el.id === card.id){
                    if(operation === "increment"){
                        return el.count+=1
                    }
                    else if(operation === "decrement"){
                        el.count-=1
                        if(operation === "decrement" && el.count === 0){
                            state.myCard = state.myCard.filter(el => el.id !== card.id)
                        }
                    }
                }
            
            })

            localStorage.setItem(Consts.cardName, JSON.stringify(state.myCard))
            
        },
        deleteFromCard(state: MyCard, payload: string){
            state.myCard = state.myCard.filter((el: CardPosition) => el.id !== payload)
            localStorage.setItem(Consts.cardName, JSON.stringify(state.myCard))
        },
        clearCard(state: MyCard){
            localStorage.removeItem(Consts.cardName)
            state.myCard = []
        }
    },
    actions: {
        setMyCardA(context: any){

            const existingCard: string | null = localStorage.getItem(Consts.cardName) // TODO

            if(existingCard){
                context.commit('setMyCard', JSON.parse(existingCard))
            }else{
                return 0;
            }
        }

    },
    getters: {
        allMyCard(state: MyCard){
          return state.myCard;
        },
    },
}