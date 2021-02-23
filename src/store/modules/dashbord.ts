import consts from '../../consts/consts'

export interface DashBord {
    processingClientOrders: Array<any>;
    newClientOrders: Array<any>;
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
    },

    actions: {
        async changeStatus(context: any, payload: {id: string; direction: string}){
            const {id, direction} = payload
            console.log(id)
            const what: Array<any> = []
            what.push(context.state.data.executedClientOrders.find((el: any)=>el.id===id))
            what.push(context.state.data.newClientOrders.find((el: any)=>el.id===id))
            what.push(context.state.data.processingClientOrders.find((el: any)=>el.id===id))

            const Exist = what.find((el: any)=>el!==undefined)
            let newStatus = ''

            if(Exist && direction==="forward"){
                // if(Exist.status === "")
                switch (Exist.status) {
                    case "NEW":
                        newStatus = "PROCESSING"
                        break;
                    case "PROCESSING":
                        newStatus = "EXECUTED"
                        break;
                    case "EXECUTED":
                        newStatus = "EXECUTED" // TODO
                        break; 
                    default:
                        return;
                }
            }
            else if(Exist && direction==="back"){
                switch (Exist.status) {
                    case "NEW":
                        newStatus = "NEW"
                        break;
                    case "PROCESSING":
                        newStatus = "NEW"
                        break;
                    case "EXECUTED":
                        newStatus = "PROCESSING" // TODO
                        break; 
                    default:
                        return;
                }
            }else{
                return;
            }

            try {
                const response = await fetch(consts.changeStatus, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: id, status: newStatus})
                })
                if(response.ok){
                    const data = await response.json();
                    console.log('good', data)
                    context.dispatch('loadDashBord')
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