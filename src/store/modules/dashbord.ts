import consts from '../../consts/consts'
import statuses from '../../consts/orderStatuses'

export interface DashBord {
    newClientOrders: Array<any>;
    processingClientOrders: Array<any>;
    executedClientOrders: Array<any>;
}

export interface IsFetching {
    processingClientOrders: boolean;
    newClientOrders: boolean;
    executedClientOrders: boolean;
}

export interface LoadPieceOfDashbord {
    name: keyof DashBord;
    data: Array<any>;
}

export interface State {
    data: DashBord;
    isFetching: IsFetching;
}

type counter = 0 | 1 | 2 | number;

export default {
    state: {
        data: {
            processingClientOrders: [],
            newClientOrders: [],
            executedClientOrders: [],
        } as DashBord,
        isFetching: {
            processingClientOrders: true,
            newClientOrders: true,
            executedClientOrders: true
        } as IsFetching
    } as State,

    mutations: {
        setDashBord(state: State, payload: LoadPieceOfDashbord){
            const {name, data} = payload
            state.data[name] = data
            state.isFetching[name] = false
        },
        shangeStatus(state: State, payload: {nowN: keyof DashBord; nextN: keyof DashBord; id: string; newStatus: string}){
            const {nowN, nextN, id, newStatus} = payload
            const element = state.data[nowN].find((el: any)=>el.id===id)
            element.status = newStatus
            state.data[nowN] = state.data[nowN].filter((el: any)=>el.id!==id)
            state.data[nextN].push(element)
        }
    },

    actions: {
        async changeStatus(context: any, payload: {id: string; direction: string}){
            const {id, direction} = payload
            console.log(id)
            const what: Array<any> = []

            what.push(context.state.data.newClientOrders.find((el: any)=>el.id===id))
            what.push(context.state.data.processingClientOrders.find((el: any)=>el.id===id))
            what.push(context.state.data.executedClientOrders.find((el: any)=>el.id===id))

            // const Exist = what.find((el: any)=>el!==undefined)

            let Exist: any = {}
            // let _nowN: keyof typeof dictionary = 0
            // let _nextN: keyof typeof dictionary = 0
            let _nowN = "newClientOrders"
            let _nextN = "newClientOrders"

            

            for(let i = 0; i < what.length; i++){
                if(what[i]!==undefined){
                    console.log(what[i])
                    switch (i) {
                        case 0:
                            _nowN = "newClientOrders"
                            break;
                        case 1:
                            _nowN = "processingClientOrders"
                            break;
                        case 2:
                            _nowN = "executedClientOrders"
                            break;
                        default:
                            break;
                    }

                    Exist = what[i]
                }
            }

            let newStatus = ''

            if(Exist && direction==="forward"){
                switch (Exist.status) {
                    case statuses.new:
                        _nextN = "processingClientOrders"
                        newStatus = statuses.processing
                        break;
                    case statuses.processing:
                        _nextN = "executedClientOrders"
                        newStatus = statuses.executed
                        break;
                    case statuses.executed:
                        _nextN = "executedClientOrders" // TODO
                        newStatus = statuses.executed // TODO
                        break; 
                    default:
                        break;
                }
            }
            else if(Exist && direction==="back"){
                switch (Exist.status) {
                    case statuses.new:
                        _nextN = "newClientOrders" // TODO
                        newStatus = statuses.new // TODO
                        break;
                    case statuses.processing:
                        _nextN = "newClientOrders"
                        newStatus = statuses.new
                        break;
                    case statuses.executed:
                        _nextN = "processingClientOrders"
                        newStatus = statuses.processing // TODO
                        break; 
                    default:
                        break;
                }
            }else{
                console.log("...")
                return;
            }

            console.log('newStatus', newStatus)

            try {
                const response = await fetch(consts.changeStatus, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: id, status: newStatus})
                })
                if(response.ok){
                    // when response will be good
                    const data = await response.text();
                    console.log('changed successfully', data)
                    // // context.dispatch('loadDashBord')
                    context.commit('shangeStatus', {
                        nowN: _nowN, 
                        nextN: _nextN, 
                        id,
                        newStatus
                    })
                  }else{
                    throw response
                  } 
                } catch (error) {
                    console.log(error)
                    context.commit("setAlert", {value: `Не могу обновить`, type: "danger"});
                }
            
        },
        async loadDashBord(context: any){
            try {
                const response = await fetch(consts.newClientOrders)
                if(response.ok){
                    const data = await response.json();
                    context.commit('setDashBord', {name: 'newClientOrders', data})
                  }else{
                    throw response
                  } 
                } catch (error) {
                    console.log(error)
                    context.commit("setAlert", {value: `Не могу загрузить`, type: "danger"});
                }

            try {
                const response = await fetch(consts.processingClientOrders)
                if(response.ok){
                    const data = await response.json();
                    context.commit('setDashBord', {name: 'processingClientOrders', data})
                    }else{
                        throw response
                    } 
                } catch (error) {
                    console.log(error)
                    context.commit("setAlert", {value: `Не могу загрузить`, type: "danger"});
                }   

            try {
                const response = await fetch(consts.executedClientOrders)
                if(response.ok){
                    const data = await response.json();
                    context.commit('setDashBord', {name: 'executedClientOrders', data})
                  }else{
                    throw response
                  } 
                } catch (error) {
                    console.log(error)
                    context.commit("setAlert", {value: `Не могу загрузить`, type: "danger"});
                }
        }
    },

    getters: {
        getDashBord(state: DashBord){
          return state;
        }
    },
}