<template>
    <header class="container-fluid" id="navheader">
        <div class="row">
            <div class="ml-auto">
                <h1>CSV Uploader</h1>
            </div>
            <div class="mr-auto">
                <ul class="steps-inline">
                    <router-link to="/upload"><div class="btn btn-step">1</div></router-link>
                    <router-link to="/mapping"><div class="btn btn-step">2</div></router-link>
                    <router-link to="/preview"><div class="btn btn-step">3</div></router-link>
                    <router-link to="/process"><div class="btn btn-step">4</div></router-link>
                    <router-link to="/contacts"><div class="btn btn-step">5</div></router-link>
                    <router-link to="/custom-attributes"><div class="btn btn-step">6</div></router-link>
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

<style scoped>
    #navheader {
        background-color: darkslategrey;
        min-height: 8vh;
        max-height: 8vh;
        font-size: calc(10px + 2vmin);
        line-height: 8vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
    }

    #navheader h1 {
        font-size: 5vh;
        line-height: 8vh;
        padding-right: 1em;
    }

    #navheader link {
        color: #61dafb;
    }

    ul.steps-inline {
        display: inline-block;
        padding: 0;
        margin: 0;
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
        text-align: center;
        padding: 0;
        margin: 1vh 0 1vh 0;
        font-size: 3vh;
        width: 6vh;
        height: 6vh;
        line-height: 6vh;
        border-radius: 8vh;
    }

    .btn.btn-step.router-link-active {
        background-color: white;
        color: black;
    }

    a.router-link-exact-active.router-link-active div.btn.btn-step {
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
