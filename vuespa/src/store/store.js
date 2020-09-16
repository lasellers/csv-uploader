import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    debug: true,
    state: {
      errors: null,
      csvHeaders: [],
      csvData: [],
      customAttributes: [],
      contacts: [],
      remappedColumnOrder: [0, 1, 2, 3, 4, 5, 6],
      // read only SSOA
      dbHeaders: ['team_id', 'name', 'phone', 'email', 'sticky_phone_number_id', 'created_at', 'updated_at'],
      dbNamedHeaders: ['Team Id', 'Name', 'Phone', 'Email', 'Sticky Phone Number Id', 'Created', 'Updated']
    }
  },

  getters: {
    dbHeaders: store => {
      return store.state.dbHeaders
    },
    dbNamedHeaders: store => {
      return store.state.dbNamedHeaders
    },
    csvHeaders: store => {
      return store.state.csvHeaders
    },
    csvData: store => {
      return store.state.csvData
    },
    customAttributes: store => {
      return store.state.customAttributes
    },
    contacts: store => {
      return store.state.contacts
    },
    remappedColumnOrder: store => {
      return store.state.remappedColumnOrder
    },
    errors: store => {
      console.info('errors', store.state.errors)
      return store.state.errors
    }
  },

  mutations: {
    addCsvHeaders (store, value) {
      store.state.csvHeaders = value
    },
    addCsvData (store, value) {
      store.state.csvData = value
    },
    addCustomAttributes (store, value) {
      store.state.customAttributes = value
    },
    addContacts (store, value) {
      store.state.contacts = value
    },
    addRemappedColumnOrder (store, value) {
      store.state.remappedColumnOrder = value
    },
    addError (store, errors) {
      console.error('mutations addError', store.state.error, errors)
      store.state.errors = errors
    },
    clearError (store) {
      store.state.errors = null
    }
  },

  actions: {
    addCsvHeaders (context, value) {
      context.commit('addCsvHeaders', value)
    },
    addCsvData (context, value) {
      context.commit('addCsvData', value)
    },
    addCustomAttributes (context, value) {
      context.commit('addCustomAttributes', value)
    },
    addContacts (context, value) {
      context.commit('addContacts', value)
    },
    addRemappedColumnOrder (context, value) {
      context.commit('addRemappedColumnOrder', value)
    },
    addError (context, value) {
      console.error('action addError', value)
      context.commit('addError', value)
    },
    clearError (context) {
      context.commit('clearError')
    }
  }
})
