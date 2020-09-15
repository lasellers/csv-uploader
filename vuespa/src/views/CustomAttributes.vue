<template>
    <div class="custom-attributes">
        <h1>Custom Attributes</h1>

        <p v-if="!(customAttributes.length>0)">None.</p>

        <table v-if="customAttributes.length>0" id="custom-attributes" class="table table-striped">
            <thead>
            <tr>
                <th>id</th>
                <th>Contact Id</th>
                <th>Key</th>
                <th>Value</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(customAttribute) in customAttributes" v-bind:key="customAttribute.id">
                <td>{{customAttribute.id}}</td>
                <td>{{customAttribute.contact_id}}</td>
                <td>{{customAttribute.key}}</td>
                <td>{{customAttribute.value}}</td>
                <td>
                    <button class="btn" v-on:click="onCustomAttributeDelete(customAttribute.id)">
                        <font-awesome-icon icon="trash-alt"/>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>

        <div class="row">
            <button class="btn btn-secondary mr-2" v-on:click="goBack">
                Back
            </button>
            <button class="btn btn-primary ml-2" v-on:click="goHome">
                Home
            </button>
        </div>

    </div>

</template>

<script>
export default {
  name: 'CustomAttributes',
  components: {
  },
  data () {
    return {
      API_URL: process.env.VUE_APP_API_URL,
      customAttributes: []
    }
  },
  beforeCreate () {
  },
  created () {
    const headers = { 'Content-Type': 'application/json' }
    fetch(this.API_URL + '/contacts', { headers })
      .then(response => response.json())
      .then(data => {
        this.customAttributes = data.flatMap(row => {
          return row.custom_attributes
        })
      })
  },
  methods: {
    goBack: async function (event) {
      this.$router.push('contacts')
    },
    goHome: async function (event) {
      this.$store.dispatch('clearError')
      this.$router.push('upload')
    },
    getContacts: function () {
      const headers = { 'Content-Type': 'application/json' }
      fetch(this.API_URL + '/contacts', { headers })
        .then(response => response.json())
        .then(data => {
          this.customAttributes = data.flatMap(row => {
            return row.custom_attributes
          })

          console.log(data)
        })
    },
    onCustomAttributeDelete: function (id) {
      fetch(this.API_URL + '/custom-attributes/' + id, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => {
          this.getContacts()
        })
        .catch((error) => {
          console.error(error)
          this.customAttributes = [] // if error, set this to empty array
        })
    }
  }

}
</script>
