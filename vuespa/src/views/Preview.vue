<template>
  <div class="preview">
    <h1>Preview</h1>

    <div class="row">
      <button class="btn btn-secondary mr-2" v-on:click="goBack=true">Back
      </button>
      <button class="btn btn-primary ml-2" v-on:click="goNext=true">Home</button>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import Preview from '@/components/Preview.vue'

export default {
  name: 'Preview',
  components: {
  //  Preview
  }
}
</script>
