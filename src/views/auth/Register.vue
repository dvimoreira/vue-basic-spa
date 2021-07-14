<template>
    <div id="page-register">
        <div class="form">
            <div class="form-group">
                <label for="full_name">Nome Completo</label>
                <input type="text" v-model="form.full_name" placeholder="Informe o nome" id="full_name" class="form-control">
            </div>

            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="text" v-model="form.email" placeholder="Informe o e-mail" id="email" class="form-control">
            </div>

            <div class="form-group">
                <label for="username">Usuário</label>
                <input type="text" v-model="form.username" placeholder="Informe o usuário" id="username" class="form-control">
            </div>

            <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" v-model="form.password" placeholder="Informe a senha" id="password" class="form-control">
            </div>

            <div class="text-center">        
                <button class="btn-auth" v-on:click="onRegister()">Cadastrar</button>
                <br>
                <router-link :to="{ name: 'auth.login' }" class="reset-password">Fazer login</router-link>
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
            async onRegister () {
                try {
                    this.isLoading = true
                    
                    let data = {
                        full_name: this.form.full_name,
                        email: this.form.email,
                        username: this.form.username,
                        password: this.form.password
                    }
                    
                    let result = await AuthService.create(data)

                    if (result.status === 200) {
                        this.msgNotification('Usuário cadastrado com sucesso', 'is-top-right', 'is-success')
                        this.$router.push({ name: 'auth.login' })
                        return
                    } else if (result.status === 422 || result.status === 403) {
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
    @import '../../../assets/unauthenticated.scss';

    .ou { margin: 0 10px; }
    .create-account { color: $primary; }
</style>
