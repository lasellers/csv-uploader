<template>
  <div class="upload">
    <h1>CSV File Upload</h1>

    <div>
      <input class="btn btn-secondary mr-2" type="file" onChange={this.onFileChange}/>
      <button class="btn btn-primary ml-2" onClick="">
      Upload
      </button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Upload',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
