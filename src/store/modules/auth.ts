export interface Alert {
    isAuth: boolean;
    sessionId: string;
}

export interface ActionAuthPayload {
    sessionId: string;
}

export default {
    state: {
        isAuth: false,
        sessionId: "",
    } as Alert,

    mutations: {
        setAuth(state: Alert, payload: ActionAuthPayload){
            state.isAuth = true;
            state.sessionId = payload.sessionId
        },
        removeAuth(state: Alert){
            state.isAuth = false;
            state.sessionId = "";
            localStorage.removeItem('token')
        }
    },

    actions: {
        isTokenForAuth(context: any){
            const token = localStorage.getItem('token')
            if(token){
                context.commit('setAuth', {sessionId: token})
            }
        }
    },

    getters: {
      auth(state: Alert){
          return state;
      }
    },
}