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
            <p>File Name: {this.state.selectedFile.name}</p>
            <p>File Type: {this.state.selectedFile.type}</p>
            <p>Last Modified: {this.state.selectedFile.lastModifiedDate.toDateString()}</p>
            <p>Rows: {this.state.data.length}</p>
            <p>Headers: {{store.getState().csv.csv_headers.join(', ')}}</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Upload',
        components: {
//    Upload
        },
        data() {
            return {
                selectedFile: null,
                header: null,
                data: null,
                goNext: false,
                API_URL: "http://localhost:8000/api" //temp
            }
        },
        created() {
            // this.getContacts();
        },
        methods: {
            /*            getContacts: function () {
                            const headers = {"Content-Type": "application/json"};
                            fetch(this.API_URL + "/contacts", {headers})
                                .then(response => response.json())
                                .then(data => {
                                    this.contacts = data;
                                });
                        },
                        onContactDelete: function (id) {
                            fetch(this.API_URL + "/contacts/" + id, {method: "DELETE"})
                                .then(res => res.json())
                                .then(() => {
                                    this.getContacts();
                                })
                                .catch((error) => {
                                    console.error(error);
                                    this.contacts = []; // if error, set this to empty array
                                });
                        },
            */

            // Input type="file" onChange, returns FileList on event target
            // with .files with File object
            // @see https://developer.mozilla.org/en-US/docs/Web/API/FileList
            // @see https://developer.mozilla.org/en-US/docs/Web/API/File
            onFileChange: async function (event) {
                console.log(event);
                event.preventDefault();

                const files = event.target.files;
                if (files.length > 0) {
                    const csv = (await files[0].text());
                    const [header, data] = this.csvToArray(csv);

                    console.log(header);
                    console.log(data);

                    this.header = header;
                    this.data = data;
                    //store.dispatch(addCsvHeaders(header));
                    //store.dispatch(addCsvData(data));

                    // Update the state
                    /*  this.setState({
                          selectedFile: files[0],
                          header: header,
                          data: data
                      });*/
                }
            },

            csvToArray: function (csv) {
                const rows = csv.trim().split("\n");
                const header = rows.shift().trim().split(",");
                let newRows = [];
                rows.forEach(row => {
                    const line = row.trim();
                    if (line.length > 0) newRows.push(line.split(","));
                });
                return [
                    header,
                    newRows
                ];
            },

// On file upload (click the upload button)
            onFileUpload: async function (event) {
//  this.setState({goNext: true});
                // store.dispatch(clearError());
                console.log(event);
                this.goNext = true;
            }

        }

    }
</script>
