<template>
    <div class="upload">
        <h1>CSV File Upload</h1>

        <div>
            <input class="btn btn-secondary mr-2" type="file" v-on:change="onFileChange">
            <button class="btn btn-primary ml-2" v-on:click="onFileUpload">
                Upload
            </button>
        </div>

        <div v-if="!selectedFile">
            <p>Choose File from local system before pressing the Upload button.</p>
        </div>

        <div v-if="selectedFile">
            <p><b>CSV File Details</b></p>
            <hr/>
            <p>File Name: {{selectedFile.name}}</p>
            <p>File Type: {{selectedFile.type}}</p>
            <p>Last Modified: {{selectedFile.lastModifiedDate.toDateString()}}</p>
            <p>Rows: {{data.length}}</p>
            <p>Headers: {{headers.join(', ')}}</p>
        </div>

    </div>
</template>

<script>
export default {
  name: 'Upload',
  components: {
  },
  data () {
    return {
      selectedFile: null,
      headers: '',
      data: null
    }
  },
  created () {
  },
  methods: {
    // Input type="file" onChange, returns FileList on event target
    // with .files with File object
    // @see https://developer.mozilla.org/en-US/docs/Web/API/FileList
    // @see https://developer.mozilla.org/en-US/docs/Web/API/File
    onFileChange: async function (event) {
      event.preventDefault()

      const files = event.target.files
      if (files.length > 0) {
        const csv = (await files[0].text())
        const [headers, data] = this.csvToArray(csv)

        this.$store.dispatch('addCsvHeaders', headers)
        this.$store.dispatch('addCsvData', data)

        // Update the state
        this.selectedFile = files[0]
        this.headers = headers
        this.data = data
      }
    },

    csvToArray: function (csv) {
      const rows = csv.trim().split('\n')
      const headers = rows.shift().trim().split(',')
      const newRows = []
      rows.forEach(row => {
        const line = row.trim()
        if (line.length > 0) newRows.push(line.split(','))
      })
      return [
        headers,
        newRows
      ]
    },

    // On file upload (click the upload button)
    onFileUpload: async function (event) {
      this.$store.dispatch('clearErrors')
      this.$router.push('mapping')
    }
  }
}
</script>
