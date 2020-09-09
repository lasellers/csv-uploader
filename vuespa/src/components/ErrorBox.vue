<template>
    <div class="container-fluid" id="errorbox">
        <div class="row error">
            <p class="">
                errorbox: {{ msg}}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ErrorBox',
        props: {
            msg: String
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
