<template>
    <div class="container-fluid" id="errorbox">

        <div v-if="errors === null" class="row">
            <p></p>
        </div>

        <div v-if="!(errors === null) && Array.isArray(errors)">
            <div class="row">
                <div class="col-md-12 text-center error">
                    <h3>Validation Errors</h3>
                    <table class="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th>Field</th>
                            <th>Message</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(error, index) in errors" v-bind:key="index">
                                <td>{{error.field}}</td>
                                <td>{{error.message.join(', ')}}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <div class="row">
                <div class="col-md-12 text-left">
                <button class="btn btn-primary btn-sm" v-on:click="clearErrors">
                    Clear Errors
                </button>
            </div>
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
