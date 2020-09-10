<template>
    <div class="contacts">
        <h1>Contacts</h1>
        <p v-if="contacts.length===0">None.</p>

        <table v-if="contacts.length>0" id="contacts-list" class="table table-striped">
            <thead>
            <tr>
                <th>id</th>
                <th>Team</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Sticky Phone</th>
                <th>Created</th>
                <th>Updated</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(contact) in contacts" v-bind:key="contact.id">
                <td>{{contact.id}}</td>
                <td>{{contact.team_id}}</td>
                <td>{{contact.name}}</td>
                <td>{{contact.phone}}</td>
                <td>{{contact.email}}</td>
                <td>{{contact.sticky_phone_number_id}}</td>
                <td>{{contact.created_at}}</td>
                <td>{{contact.updated_at}}</td>
                <td>
                    <button class="btn" v-on:click="onContactDelete(contact.id)">
                        <font-awesome-icon icon="trash-alt"/>
                    </button>
                </td>
            </tr>
            ))}
            </tbody>
        </table>

        <div class="row">
            <button class="btn btn-secondary mr-2" v-on:click="goBack=true">Back
            </button>
            <button class="btn btn-primary ml-2" v-on:click="goNext=true">Next</button>
        </div>

    </div>
</template>

<script>
    export default {
        //el: '#contacts-list',
        name: 'Contacts',
        data() {
            return {
                contacts: [],
                API_URL: "http://localhost:8000/api" //temp
            }
        },
        components: {},
        created() {
            this.getContacts();
        },
        methods: {
            getContacts: function () {
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
            }
        }
    }
</script>
