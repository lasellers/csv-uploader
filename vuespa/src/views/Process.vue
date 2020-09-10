<template>
  <div class="process">
    <h1>Process</h1>
    <p>CSV records have been added to database.</p>

    <hr/>

    <p>Contact inserts: {data.contact_inserts}</p>
    <p>Contacts rows: {data.contacts?.length}</p>

    <br/>

    <p>Custom Attribute inserts: {data.custom_attribute_inserts}</p>
    <p>Custom Attributes data rows: {data.custom_attributes?.length}</p>


    <div class="row">
      <button class="btn btn-secondary mr-2" v-on:click="goBack=true">Back
      </button>
      <button class="btn btn-primary ml-2" v-on:click="goNext=true">Home</button>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
//import Process from '@/components/Process.vue'

export default {
  name: 'Process',
  components: {
 //   Process
  }
}
</script>
