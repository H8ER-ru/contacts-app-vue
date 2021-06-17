import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: JSON.parse(localStorage.getItem('contactList')) || []
  },
  mutations: {
    createContact(state, contact) {
      state.contacts.push(contact)
      //save local
      localStorage.setItem('contactList', JSON.stringify(state.contacts))
    },
    deleteContact(state, id) {
      state.contacts = state.contacts.filter(contact => contact.id !== id)
      localStorage.setItem('contactList', JSON.stringify(state.contacts))
    },
    changeContact(state, contact) {
      const indexContact = state.contacts.findIndex(item => item.id === contact.id)
      //replace data with changes
      state.contacts[indexContact] = contact
      localStorage.setItem('contactList', JSON.stringify(state.contacts))
    }
  },
  actions: {
    createContact ({commit}, contact) {
      commit('createContact', contact)
    },
    deleteContact ({commit}, id) {
      commit('deleteContact', id)
    },
    changeContact ({commit}, contact) {
      commit('changeContact', contact)
    }
  },
  getters: {
    getContactsList: state => {
      return state.contacts
    },
    getContactDetails: state => id => {
      return state.contacts.find(contact => contact.id === id)
    }
  }
})
