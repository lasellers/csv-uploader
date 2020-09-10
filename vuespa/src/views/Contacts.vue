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
                    <button class="btn" onClick=""></button>
                </td>
            </tr>
            ))}
            </tbody>
        </table>

    </div>
</template>

<script>
    // @ is an alias to /src
    //import Contacts from '@/components/Contacts.vue'

    export default {
        //el: '#contacts-list',
        name: 'Contacts',
        data() {
            return {
                contacts: []
            }
        },
        components: {},
        created() {
            // GET request using fetch with set headers
            const headers = {"Content-Type": "application/json"};
            fetch("http://localhost:8000/api/contacts", {headers})
                .then(response => response.json())
                .then(data => {
                    this.contacts = data;
                    console.log(data);
                });
        }
    }
</script>
