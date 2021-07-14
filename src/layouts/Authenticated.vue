<template>
    <div>        
        <aside>
            <!-- CMS LOGO -->
            <div id="company-logo">
                <img src="/img/logo-min.png" title="Uma plataforma Sejavisto.Digital">
            </div>

            <!-- RIGHT NAVIGATION -->
            <div class="navigation-menu">
                <ul>
                    <!-- v-show="item.rules.find(element => element === profileData.permission)" -->
                    <li v-for="(item, key) in navigation.menu" :key="key">
                        <b-tooltip :label="item.name" position="is-right" type="is-dark">
                            <router-link :to="{ name: item.route }" v-bind:class="{ 'active': activeRoute === item.route }">
                                <i :class="`${item.icon}`"></i>
                            </router-link>
                        </b-tooltip>
                    </li>
                </ul>
            </div>

            <!-- APP VERSION -->
            <div class="version">
                <p v-html="version"></p>
            </div>
        </aside>

        <!-- CONTENT PAGES -->
        <div class="wrapper">       
            <div class="wrapper-content">
                <router-view></router-view>
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
                this.$router.push({ name: 'auth.login' })
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

    .wrapper { font-family: 'Roboto', sans-serif; }

    @media (max-width: 767px) {}

    @media (min-width: 768px) {
        aside {
            width: 80px;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            background: $primary;
            box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);
            background: linear-gradient(164deg, $primary 0%, $secundary 100%);
            text-align: center;
            #company-logo {
                padding: 25px 15px;
                border-bottom: 1px dashed rgba(255, 255, 255, 0.144);
                img {
                    width: 100%;
                    display: block;
                }
            }
            
            .navigation-menu {
                ul {
                    padding: 0;
                    margin: 0;
                    li {
                        display: block;
                        width: 100%;
                        .b-tooltip { width: 100%; }
                        a {
                            display: block;
                            padding: 15px 0;
                            font-size: 24px;
                            color: #FFFFFF;
                            transition: all 0.3s;
                            border-left: 3px solid transparent;
                            &:hover, &.active {
                                border-color: #FFFFFF;
                                background: rgba(255, 255, 255, 0.144);
                            }
                        }
                    }
                }
            }
        }

        .wrapper {
            margin-left: 80px;
        }

        .version {
            position: absolute;
            left: 5px;
            bottom: 5px;
            font-size: 14px;
            color: #FFFFFF;
        }
    }

    @media (min-width: 1200px) {      
        .content-page { padding: 30px; }
    }
</style>
