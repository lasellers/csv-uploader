<template>
    <div class="process">
        <h1>Process</h1>

        <p v-if="!isSaved">
            Processing....
        </p>

        <div v-if="isSaved">
            <p>CSV records have been added to database.</p>

            <hr/>

            <p>Contact inserts: {{data.contactInserts}}</p>
            <p>Contacts rows: {{data.contacts.length}}</p>

            <br/>

            <p>Custom Attribute inserts: {{data.customAttributeInserts}}</p>
            <p>Custom Attributes data rows: {{data.customAttributes.length}}</p>

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
                data: {
                    contactInserts: 0,
                    customAttributeInserts: 0,
                    contacts: [],
                    customAttributes: []
                },
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
                this.$store.dispatch('clearError')
                this.$router.push('contacts')
            },
            saveCsv () {
                const contacts = this.$store.getters.contacts
                const customAttributes = this.$store.getters.customAttributes

                fetch(this.API_URL + '/csv/save', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ contacts, customAttributes })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw Error(response.statusText)
                        }
                        return response.json()
                    })
                    .then((data) => {
                        this.data.contacts = data.contacts
                        this.data.customAttributes = data.custom_attributes
                        this.data.contactInserts = data.contact_inserts
                        this.data.customAttributeInserts = data.custom_attribute_inserts

                        console.info('process then ', data)
                        // get the formrequest validation errors from the api
                        if (Object.prototype.hasOwnProperty.call(data, 'errors') &&
                            data.errors.length > 0) {
                            this.$store.dispatch('addError', data.errors)
                        }
                        this.isSaved = true
                    })
                    .catch((error) => {
                        console.info('process catch ', error)
                        console.error(error)
                        this.$store.dispatch('addError', error)
                        this.data = []
                    })
            }
        }
    }
</script>
