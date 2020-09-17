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
            console.info('getters errors', store.state.errors)
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
        addErrors (store, errors) {
            store.state.errors = errors
        },
        clearErrors (store) {
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
        addErrors (context, values) {
            if (values === null || values === '' || values === [] || values === {} ||
            (Array.isArray(values) && values.length === 0)) {
                // do nothing
                context.commit('addErrors', null)
            } else if (typeof values === 'string') {
                values = [{ field: 'unknown', message: values, key: 0 }]
                context.commit('addErrors', values)
            } else {
                values = [...values]

                const errors = []
                values.forEach((value, index) => {
                    errors.push(JSON.parse(JSON.stringify(value)))
                })

                const messages = []
                for (const [key, value] of Object.entries(errors)) {
                    for (const [field, message] of Object.entries(value)) {
                        messages.push({ field, message, key })
                    }
                }

                context.commit('addErrors', messages)
            }
        },
        clearErrors (context) {
            context.commit('clearErrors')
        }
    }
})
