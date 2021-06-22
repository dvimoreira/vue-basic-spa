<template>
    <div>
        <div class="columns is-vcentered is-gapless">
            <div class="column is-variable is-12-mobile is-12-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                <div class="auth-box">
                    <!-- RENDER FORM -->
                    <transition name="slide-fade" mode="out-in">
                        <router-view></router-view>
                    </transition>

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

        computed: {},

        methods: {}
    }
</script>

<style lang="scss">
    @import '../assets/unauthenticated.scss';

    @media (max-width: 767px) {}
    @media (min-width: 768px) {}
    @media (min-width: 1200px) {}
</style>
