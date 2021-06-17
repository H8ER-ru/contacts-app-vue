import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactsList from '../views/ContactsList'
import ContactDetails from '../views/ContactDetails'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ContactsList',
    component: ContactsList,
    meta: {title: 'Контакты'}
  },
  {
    path: '/contact/:id',
    name: 'ContactDetails',
    component: ContactDetails,
    meta: {title: 'Детальная страница контакта'}
  }
]

const router = new VueRouter({
  routes
})

//change title on change route
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
