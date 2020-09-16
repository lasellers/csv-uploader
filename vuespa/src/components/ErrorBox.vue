<template>
    <div class="container-fluid" id="errorbox">

        <div v-if="errors === null" class="row">
            <p></p>
        </div>

        <div v-if="!(errors === null) && Array.isArray(errors)" class="col-md-12 text-center error">
            <div class="row">
                <p v-for="(error, index) in errors" v-bind:key="index">
                    {{error.field}}: {{error.message.join(',')}}
                </p>
            </div>
            <div class="row">
                <button class="btn btn-secondary mr-2" v-on:click="clearErrors">
                    Clear Errors
                </button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'ErrorBox',
        computed: {
            errors () {
                return this.$store.getters.errors
            }
        },
        methods: {
            clearErrors: async function (event) {
                this.$store.dispatch('clearErrors')
            }
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
