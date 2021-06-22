<template>
    <div>        
        <aside>
            <ul>
                <li v-for="(item, key) in navigation.menu" :key="key" v-show="item.rules.find(element => element === profileData.permission)">
                    <router-link :to="{ name: item.route }" v-bind:class="{ 'active': activeRoute === item.route }">
                        <i :class="`${item.icon}`"></i> {{ item.name }}
                    </router-link>
                </li>
            </ul>

            <!-- APP VERSION -->
            <div class="version">
                <p v-html="version"></p>
            </div>
        </aside>

        <!-- CONTENT PAGES -->
        <div class="wrapper">       
            <div class="wrapper-content">
                <transition name="slide-fade" mode="out-in">
                    <router-view :profile="profileData"></router-view>
                </transition>
            </div>
        </div>

        <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
    </div>
</template>

<script>
    import menu from '@/config/menu'

    export default {
        name: 'authenticated',
        components: {},
        data () {
            return {
                isLoading: false,
                navigation: menu,
                version: 'v' + this._.replace(this._.replace(JSON.stringify(require('../../package.json').version), '"', ''), '"', ''),
            }
        },
        computed: {
            authenticated () {
                return this.$store.state.authenticated || false
            },

            /**
            * Pegando os dados do usuário
            */
            user () {
                return this.$store.state.user
            },

            /**
            * Pegando name da página ativa
            */
            activeRoute () {
                return this.$route.name
            }
        },

        async mounted () {         
            if (!this.$store.state.authenticated) {
                this.$router.push({ name: 'admin.auth.login' })
            }
        },

        methods: {            
            msgNotification (message, possition, type) {
                this.$buefy.notification.open({
                    duration: 5000,
                    message: message,
                    position: possition,
                    type: type,
                    hasIcon: false
                })
            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/authenticated.scss';

    @media (max-width: 767px) {}
    @media (min-width: 768px) {}
    @media (min-width: 1200px) {}
</style>
