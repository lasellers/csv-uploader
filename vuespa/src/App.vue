<template>
    <div id="app">
        <NavHeader/>
        <ErrorBox/>
        <main id="App-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <router-view/>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style>
    #App-body {
        text-align: center;
    }

    #App-body h1 {
        color: green;
    }

    #App-body p {
        text-align: justify;
        padding: .1em .1em .1em 1em;
        margin: 0;
    }

    .table-striped tbody tr:nth-of-type(odd) {
        background-color: rgba(93, 173, 27, 0.15) !important;
    }

</style>

<script>
import NavHeader from './components/NavHeader.vue'
import ErrorBox from './components/ErrorBox.vue'

export default {
  name: 'App',
  components: {
    NavHeader,
    ErrorBox
  }
}
</script>
