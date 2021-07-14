<template>
    <div id="page-login">
        <div class="form">
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="text" placeholder="Seu e-mail" id="email" class="form-control" v-model="form.email">
            </div>

            <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" placeholder="Insira sua senha" id="password" class="form-control" v-model="form.password">
            </div>

            <div class="text-center">                
                <button class="btn-auth" v-on:click="onLogin()">Fazer Login</button>
                <br>
                <router-link :to="{ name: 'auth.reset-password' }" class="reset-password">Esqueci minha senha</router-link>
            </div>
        </div>

        <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
    </div>
</template>

<script>
    import AuthService from '@/services/auth/auth'

    export default {
        name: 'auth',
        components: {},
        data () {
            return {
                form: {},
                isLoading: false
            }
        },

        mounted () {
            if (this.$store.state.authenticated) {
                this.$router.push({ name: 'painel.dashboard' })
            }
        },

        methods: {
            async onLogin () {
                try {
                    this.isLoading = true

                    let data = {
                        email: this.form.email,
                        password: this.form.password
                    }

                    let result = await AuthService.login(data)

                    if (result.status === 200) {
                        this.$store.dispatch('login', result.data)
                        this.$store.dispatch('user', { email: this.form.email })
                        this.$router.push({ name: 'admin.dashboard' })
                        return
                    } else if (result.status === 422) {
                        for (const key in result.data.errors) {
                            if (result.data.errors[key]) {
                                throw Error(result.data.errors[key].message)
                            }
                        }
                        return
                    }

                    throw Error(result.data.message)
                } catch (e) {
                    this.isLoading = false
                    this.msgNotification(e.message, 'is-top-right', 'is-danger')
                } finally {
                    this.isLoading = false
                }
            },

            msgNotification (messagem, possition, type) {
                this.$buefy.notification.open({
                    duration: 5000,
                    message: messagem,
                    position: possition,
                    type: type,
                    hasIcon: false
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/unauthenticated.scss';

    .ou { margin: 0 10px; }
    .create-account { color: $primary; }
</style>
