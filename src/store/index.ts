import { createStore } from 'vuex'
import garden from './modules/garden'
import collage from './modules/collage'

export default createStore({
  modules: {
    garden,
    collage
  }
})
