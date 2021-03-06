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
        isAlert: false,
        value: "",
        type: ""
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
            }, 2000)
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