<template>
    <div class="custom-attributes">
        <h1>Custom Attributes</h1>
        <p>None.</p>

        <p v-if="customAttributes.length===0">None.</p>

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
                    <button class="btn" onClick=""></button>
                </td>
            </tr>
            </tbody>
        </table>

    </div>

</template>

<script>
    // @ is an alias to /src
    //import CustomAttributes from '@/components/CustomAttributes.vue'

    export default {
        name: 'CustomAttributes',
        components: {
            // CustomAttributes
        },
        data() {
            return {
                // contacts: [],
                customAttributes: []
            }
        },
        beforeCreate() {
            //  this.contacts = [];
            this.customAttributes = [];
        },
        created() {
            // GET request using fetch with set headers
            const headers = {"Content-Type": "application/json"};
            fetch("http://localhost:8000/api/contacts", {headers})
                .then(response => response.json())
                .then(data => {
                    //this.contacts = data;

                    this.customAttributes = data.flatMap(row => {
                        return row.custom_attributes;
                    });

                    console.log(data);
                });
        }

    }
</script>
