<template>
    <div class="process">
        <h1>Process</h1>

        <p v-if="!isSaved">
            Processing....
        </p>

        <div v-if="isSaved">
            <p>CSV records have been added to database.</p>

            <hr/>

            <p>Contact inserts: {{contactInserts}}</p>
            <p>Contacts rows: {{contacts.length}}</p>

            <br/>

            <p>Custom Attribute inserts: {{customAttributeInserts}}</p>
            <p>Custom Attributes data rows: {{customAttributes.length}}</p>

            <div class="row">
                <button class="btn btn-secondary mr-2" v-on:click="goBack">
                    Back
                </button>
                <button class="btn btn-primary ml-2" v-on:click="goNext">
                    Next
                </button>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: 'Process',
        components: {},
        created () {
            this.saveCsv()
        },
        data () {
            return {
                API_URL: process.env.VUE_APP_API_URL,
                dbHeaders: this.$store.getters.dbHeaders,
                dbNamedHeaders: this.$store.getters.dbNamedHeaders,
                contactInserts: 0,
                customAttributeInserts: 0,
                contacts: [],
                customAttributes: [],
                isSaved: false
            }
        },
        computed: {
            csvHeaders () {
                return this.$store.getters.csvHeaders
            },
            csvData () {
                return this.$store.getters.csvData
            }
        },
        methods: {
            goBack: async function (event) {
                this.$router.push('preview')
            },
            goNext: async function (event) {
                this.$store.dispatch('clearErrors')
                this.$router.push('contacts')
            },
            async saveCsv () {
                const contacts = this.$store.getters.contacts
                const customAttributes = this.$store.getters.customAttributes

                const headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
                await fetch(this.API_URL + '/csv/save', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ contacts, customAttributes })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw Error(response.statusText)
                        }
                        console.info('*** response', response)

                        return response.json()
                    })
                    .then((data) => {
                        console.info('*** data', data)
                        this.contacts = JSON.parse(JSON.stringify(data.contacts))
                        this.customAttributes = JSON.parse(JSON.stringify(data.custom_attributes))
                        this.contactInserts = JSON.parse(JSON.stringify(data.contact_inserts))
                        this.customAttributeInserts = JSON.parse(JSON.stringify(data.custom_attribute_inserts))
                        console.info('*** this contacts', this.contacts)
                        console.info('*** this customAttributes', this.customAttributes)
                        console.info('*** this contactInserts', this.contactInserts)
                        console.info('*** this customAttributeInserts', this.customAttributeInserts)

                        console.log('data errors', data.errors)
                        // get the formrequest validation errors from the api
                        // if (Object.prototype.hasOwnProperty.call(data, 'errors') && data.errors.length > 0) {
                        this.$store.dispatch('addErrors', data.errors)
                        this.isSaved = true
                    })
                    .catch((error) => {
                        this.$store.dispatch('addErrors', error)
                        this.contactInserts = 0
                        this.customAttributeInserts = 0
                        this.contacts = []
                        this.customAttributes = []
                    })
            }
        }
    }
</script>
