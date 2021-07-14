<template>
    <div id="page-newpassword">
        <div class="form">
            <div class="form-group">
                <label for="new_password">Nova Senha</label>
                <input type="password" placeholder="Informe a nova senha" id="new_password" class="form-control" v-model="form.new_password">
            </div>

            <div class="text-center">
                <button class="btn-auth" v-on:click="onSubmit()">Redefinir Senha</button>
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

                    let data = {
                        new_password: this.form.new_password,
                        username: this.$route.params.username,
                        token: this.$route.params.token
                    }

                    let result = await AuthService.updatePassword(data)

                    if (result.status === 200) {
                        this.msgNotification('Senha alterada com sucesso!.', 'is-top-right', 'is-success')
                        this.$router.push({ name: 'auth.login' })
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
