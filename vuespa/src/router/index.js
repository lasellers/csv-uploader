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
        component: About
    },
    {
        path: '/',
        redirect: '/upload',
    },
    {
        path: '/upload',
        component: Upload
    },
    {
        path: '/mapping',
        component: Mapping
    },
    {
        path: '/preview',
        component: Preview
    },
    {
        path: '/process',
        component: Process
    },
    {
        path: '/contacts',
        component: Contacts
    },
    {
        path: '/custom-attributes',
        component: CustomAttributes
    },
    {
        path: '/*',
        component: NotFound
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
