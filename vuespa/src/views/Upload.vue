<template>
  <div class="upload">
    <h1>CSV File Upload</h1>

    <div>
      <input class="btn btn-secondary mr-2" type="file" onChange={this.onFileChange}/>
      <button class="btn btn-primary ml-2" onClick="">
        Upload
      </button>
    </div>

    <p>Choose File from local system before pressing the Upload button.</p>
  </div>
</template>

<script>
// @ is an alias to /src
//import Upload from '@/components/Upload.vue'

export default {
  name: 'Upload',
  components: {
//    Upload
  }
}
</script>
