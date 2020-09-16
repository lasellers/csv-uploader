<template>
    <div class="container-fluid" id="errorbox">
        <div class="row error">
            <p v-if="errors === null">
                errorbox: None
            </p>
            <p v-if="typeof errors === 'string'">
                errorbox: {{ errors}}
            </p>
            <p v-if="typeof errors === 'array'">
                errorbox: {{ errors.join(',')}}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ErrorBox',
        props: {
          //  errors: String
        },
        components: {},
        created () {
        },
        data () {
            return {
                API_URL: process.env.VUE_APP_API_URL,
                // errors: this.$store.getters.errors,
                data: {
                }
            }
        },
        computed: {
            errors () {
                return this.$store.getters.errors
            }
        },
        methods: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .error {
        margin: .4em !important;
        padding: .2em;
        background-color: greenyellow;
        font-size: x-large;
    }

    .errors {
        margin: 0 !important;
        padding: .5em;
        background-color: indianred;
        color: black;
        font-size: small;
    }

    table tr td, table tr th {
        text-align: left;
        font-size: .8em;
    }
</style>
