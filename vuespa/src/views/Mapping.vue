<template>
    <div class="mapping">
        <h1>Remapping</h1>

        <p><b>CSV File Details</b></p>
        <hr/>
        <p>Headers: {{csvHeaders.join(',')}}</p>

        <table class="table table-striped">
            <thead>
            <tr>
                <th>Column</th>
                <th>Remap from</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="(column, index) in dbNamedHeaders" v-bind:key="index">
                <td>{{column}}</td>
                <td>
                    <select :id="'select-' + index" v-bind:value="remappedColumnOrder[index]"
                            v-on:change="onMappingChange">
                        <option key=-1 value=""> (None)</option>
                        <option v-for="(csvHeader, index2) in csvHeaders"
                                :key="index + '.' + index2"
                                v-bind:value="index2">
                            {{csvHeader}} (Ex: {{csvData[0][index2]}})
                        </option>
                    </select>
                </td>
            </tr>

            </tbody>
        </table>

        <div>
            <button class="btn btn-secondary mr-2" v-on:click="goBack">Back
            </button>
            <button class="btn btn-primary ml-2" v-on:click="goNext">Next</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Mapping',
        components: {},
        computed: {
            csvHeaders () {
                return this.$store.getters.csvHeaders
            },
            csvData () {
                return this.$store.getters.csvData
            }
        },
        created () {
            this.dropdownOrder = [...(this.dbHeaders.keys())]
            this.remappedColumnOrder = this.defaultRemappedOrder(this.dbHeaders, this.csvHeaders)
        },
        data () {
            // Normally the default order is 0,1,2,3,4,5,6,7 and the like as far the the dropdown goes.
            const order = [0, 1, 2, 3, 4, 5, 6]
            return {
                API_URL: process.env.VUE_APP_API_URL,
                dbHeaders: this.$store.getters.dbHeaders,
                dbNamedHeaders: this.$store.getters.dbNamedHeaders,
                dropdownOrder: order,
                remappedColumnOrder: order
            }
        },
        methods: {
            goBack: async function (event) {
                this.$router.push('upload')
            },
            goNext: async function (event) {
                this.$store.dispatch('clearErrors')
                this.onMappingAccept()
                this.$router.push('preview')
            },
            onMappingChange: async function (event) {
                const id = (event.target.id.split('-'))[1] // event.target.selectedIndex;
                const value = event.target.value

                const remappedColumnOrder = this.remappedColumnOrder
                remappedColumnOrder[id] = value
                this.remappedColumnOrder = remappedColumnOrder
            },

            onMappingAccept: async function () {
                this.$store.dispatch('addRemappedColumnOrder', this.remappedColumnOrder)

                const [contacts, customAttributes] = this.remapCsvToContactsAndCustomAttributes()

                this.$store.dispatch('addContacts', contacts)
                this.$store.dispatch('addCustomAttributes', customAttributes)
            },

            /**
             * @returns {[[], []]}
             */
            remapCsvToContactsAndCustomAttributes: function () {
                const contacts = this.csvData
                const remappedColumnOrder = this.remappedColumnOrder
                const csvHeaders = this.csvHeaders
                const dbHeaders = this.dbHeaders
                const newContacts = []
                const newCustomAttributes = []

                contacts.forEach(function (contact, contactId) {
                    const newContact = new Array(dbHeaders.length).fill('')

                    remappedColumnOrder.forEach(function (order, index) {
                        if (remappedColumnOrder[index] >= 0) {
                            newContact[index] = contact[remappedColumnOrder[index]]
                        }
                    })

                    csvHeaders.forEach(function (value, index) {
                        if (!remappedColumnOrder.includes(index)) {
                            newCustomAttributes.push([contactId, csvHeaders[index], value])
                        }
                    })

                    newContacts.push(newContact)
                })
                return [newContacts, newCustomAttributes]
            },

            /**
             * This tried to guess the remap order by comparing the csv header columns against the db standard order.
             * i.e., if they are the same order then mapping stays: 0,1,2,3,4,5,6.
             * If the headers are reversed then this comes out: 6,5,4,3,2,1,0
             */
            defaultRemappedOrder: function (dbHeaders, csvHeaders) {
                const remappedColumnOrder = new Array(dbHeaders.length).fill(-1)

                dbHeaders.forEach((header, index) => {
                    const headerIndex = csvHeaders.indexOf(header)
                    if (headerIndex >= 0) {
                        remappedColumnOrder[index] = headerIndex
                    }
                })

                return remappedColumnOrder
            }

        }
    }
</script>
