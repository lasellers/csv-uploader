import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Upload from '../views/Upload.vue'
import Mapping from '../views/Mapping.vue'
import Preview from '../views/Preview.vue'
import Process from '../views/Process.vue'
import Contacts from '../views/Contacts.vue'
import CustomAttributes from '../views/CustomAttributes.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/about',
        //name: 'Upload',
        component: About
    },
    {
        path: '/',
        redirect: '/upload',
    },
    {
        path: '/upload',
        //name: 'Upload',
        component: Upload
    },
    {
        path: '/mapping',
        ////name: 'Mapping',
        component: Mapping
    },
    {
        path: '/preview',
        // name: 'Preview',
        component: Preview
    },
    {
        path: '/process',
        //name: 'Process',
        component: Process
    },
    {
        path: '/contacts',
        // name: 'Contacts',
        component: Contacts
    },
    {
        path: '/custom-attributes',
        //    name: 'Custom Attributes',
        component: CustomAttributes
    },
    {
        path: '/*',
        //  name: 'Not Found',
        component: NotFound
    },
];

const router = new VueRouter({
    //mode: 'history',
    //base: process.env.BASE_URL,
    routes
});

export default router
