<template>
  <div class="preview">
    <h1>Preview</h1>

    <table class="table table-striped">
      <thead>
      <tr>
        <th v-for="(column, index) in dbNamedHeaders" v-bind:key="index">{{column}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index2) in contacts" v-bind:key="index2">
        <td v-for="(col, index3) in row" v-bind:key="index3">{{col}}</td>
      </tr>
      </tbody>
    </table>

    <div class="row">
      <button class="btn btn-secondary mr-2" v-on:click="goBack">Back
      </button>
      <button class="btn btn-primary ml-2" v-on:click="goNext">Next</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Preview',
  components: {
  },
  methods: {
    goBack: async function (event) {
      this.$router.push('mapping')
    },
    goNext: async function (event) {
      this.$store.dispatch('clearError')
      this.$router.push('process')
    }
  },
  computed: {
    csvHeaders () {
      return this.$store.getters.csvHeaders
    },
    contacts () {
      return this.$store.getters.contacts
    }
  },
  data () {
    return {
      dbHeaders: this.$store.getters.dbHeaders,
      dbNamedHeaders: this.$store.getters.dbNamedHeaders
    }
  }
}
</script>
