<template>
    <div id="page-password">
        <div class="form">
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="text" placeholder="Informe seu e-mail" id="email" class="form-control" v-model="form.email">
            </div>

            <div class="text-center">
                <button class="btn-auth" v-on:click="onSubmit()">Resetar Senha</button>
                <br>
                <router-link :to="{ name: 'auth.login' }" class="reset-password">Fazer Login</router-link>
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
           async onSubmit () {
                try {
                    this.isLoading = true

                    let data = { email: this.form.email }
                    let result = await AuthService.forgotPassword(data)

                    if (result.status === 200) {
                        this.msgNotification('Solicitação enviada com sucesso. Verifique seu e-mail.', 'is-top-right', 'is-success')
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
</style>
