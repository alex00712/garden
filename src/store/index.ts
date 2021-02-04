import { createStore } from 'vuex'
import garden from './modules/garden'
import collage from './modules/collage'
import alert from './modules/alert'

export default createStore({
  modules: {
    garden,
    collage,
    alert
  }
})
