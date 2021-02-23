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