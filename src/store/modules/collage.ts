export interface Collage {
    id: number;
    mainImage: string;
    topLeftImage: string;
    bottomLeftImage: string;
}

export default {
    state: {
        id: null,
        mainImage: "",
        topLeftImage: "",
        bottomLeftImage: "",
    },

    mutations: {
        updateCollage(state: Collage, images: Collage){
            state.id = images.id;
            state.mainImage = images.mainImage;
            state.topLeftImage = images.topLeftImage;
            state.bottomLeftImage = images.bottomLeftImage;
        }
    },

    actions: {
        async fetchCollage(context: any){
            const response = await fetch("https://greenisland.herokuapp.com/collage")
            const data = await response.json()
            console.log(data)
            context.commit('updateCollage', data[0])
        }
    },

    getters: {
      allCollage(state: Collage){
          console.log(state)
          return state;
      }
    },
}