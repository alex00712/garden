import { createStore } from 'vuex'
import garden from './modules/garden'
import collage from './modules/collage'
import alert from './modules/alert'
import card from './modules/cart'
import auth from './modules/auth'
import payment from './modules/payment'
import modalWindow from './modules/moduleWindow'

export default createStore({
  modules: {
    garden,
    collage,
    alert,
    card,
    auth,
    payment,
    modalWindow
  }
})
