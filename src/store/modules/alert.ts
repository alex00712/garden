export interface Alert {
    isAlert: boolean;
    value: string;
    type: string;
}

export interface ActionPayload {
    value: string;
    type: string;
}

export default {
    state: {
        isAlert: true,
        value: "11111111",
        type: "success"
    } as Alert,

    mutations: {
        setAlert(state: Alert, payload: ActionPayload){
            state.isAlert = true;
            state.value = payload.value
            state.type = payload.type;
            setTimeout(()=>{
                state.isAlert = false;
                state.value = "";
                state.type = "";
            }, 1000)
        },
        removeAlert(state: Alert){
            state.isAlert = false;
            state.value = "";
            state.type = "";
        }
    },

    actions: {
        
    },

    getters: {
      alert(state: Alert){
          return state;
      }
    },
}