<template>
    <div class="mapping">
        <h1>Remapping</h1>

        <p><b>CSV File Details</b></p>
        <hr/>
        <p>Headers: {headersCsv}</p>

        <div class="row">
            <button class="btn btn-secondary mr-2" v-on:click="goBack=true">Back
            </button>
            <button class="btn btn-primary ml-2" v-on:click="goNext=true">Home</button>
        </div>

    </div>
</template>

<script>
// @ is an alias to /src
// import Mapping from '@/components/Mapping.vue'

export default {
  name: 'Mapping',
  components: {
    // Mapping
  }
}
</script>
