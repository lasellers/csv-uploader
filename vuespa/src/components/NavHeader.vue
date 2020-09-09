<template>
    <header class="container-fluid" id="navheader">
        <div class="row">
            <div class="ml-auto">
                <h1>CSV Uploader</h1>
            </div>
            <div class="mr-auto">
                <ul class="steps-inline">
                    <router-link to="/" class="btn btn-step">1</router-link>
                    <router-link to="/mapping" class="btn btn-step">2</router-link>
                    <router-link to="/preview" class="btn btn-step">3</router-link>
                    <router-link to="/process" class="btn btn-step">4</router-link>
                    <router-link to="/contacts" class="btn btn-step">5</router-link>
                    <router-link to="/custom-attributes" class="btn btn-step">6</router-link>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'NavHeader',
        props: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #navheader {
        background-color: darkslategrey;
        min-height: 8vh;
        max-height: 8vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
    }

    #navheader h1 {
        font-size: 5vh;
        line-height: 6vh;
    }

    #navheader link {
        color: #61dafb;
    }

    ul.steps-inline > a {
        display: inline-block;
        padding-right: 5px;
        padding-left: 5px;
    }

    .steps-inline .nav-link {
        display: inline-block;
        padding-right: 5px;
        padding-left: 5px;
        color: white !important;
    }

    .btn.btn-step {
        background-color: darkgray;
        color: white;
        width: 6vh;
        height: 6vh;
        text-align: center;
        padding: 0;
        margin: 3vh 0 1vh 0;
        font-size: 3vh;
        line-height: 6vh;
        border-radius: 8vh;
    }

    .btn.btn-step.active {
        background-color: white;
        color: black;
    }

    @media (prefers-reduced-motion: no-preference) {
        #navheader h1 {
            animation: navheader-spin infinite 10s linear;
        }
    }

    @keyframes navheader-spin {
        70% {
            transform: scale(1);
        }
        80% {
            transform: scale(1.1);
        }
        90% {
            transform: scale(.9);
        }
    }
</style>


