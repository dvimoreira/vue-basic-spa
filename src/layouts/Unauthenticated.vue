<template>
    <div>
        <div class="columns is-vcentered is-gapless">
            <div class="column is-variable is-12-mobile is-12-tablet is-8-desktop is-8-widescreen is-8-fullhd">
                <!-- LEFT BANNER -->
                <div id="fixed-banner"></div>
            </div>

            <div class="column is-variable is-12-mobile is-12-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                <div class="auth-box">
                    <div id="main-logo">
                        <img src="/img/logo.png">
                    </div>
                    
                    <!-- RENDER PAGE -->
                    <router-view></router-view>

                    <!-- APP VERSION -->
                    <div class="version">
                        <p v-html="version"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'unauthenticated',
        components: {},
        data () {
            return {
                version: 'v' + this._.replace(this._.replace(JSON.stringify(require('../../package.json').version), '"', ''), '"', ''),
            }
        },

        async mounted () {         
            if (this.$store.state.authenticated) {
                this.$router.push({ name: 'admin.dashboard' })
            }
        },
    }
</script>

<style lang="scss">
    @import '../assets/unauthenticated.scss';

    #fixed-banner {
        background: url("/img/banner-auth.png") no-repeat center;
        background-size: cover;
        width: 100%;
        height: 100vh;
    }

    .auth-box {
        padding: 60px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        #main-logo {
            max-width: 300px;
            margin: 0 auto;
            img { width: 100%; }
        }
    }

    .version {
        position: absolute;
        bottom: 15px;
        right: 15px;
    }

    @media (max-width: 767px) {}
    @media (min-width: 768px) {
        .auth-box {
            #main-logo { margin-bottom: 50px; }
        }
    }

    @media (min-width: 1200px) {}
</style>
