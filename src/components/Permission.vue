<template>
    <div>
        <div class="permission-alert text-center">
            <i class="fas fa-exclamation-triangle"></i>
            <h1>Você não tem permissão para acessar essa página</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Permission',
        data () {
            return {}
        }
    };
</script>

<style scoped lang="scss">
    @import '../assets/authenticated.scss';

    @media (min-width: 576px) {}
    @media (min-width: 768px) {}
    @media (min-width: 992px) {}
    @media (min-width: 1200px) {
        .permission-alert {
            i {
                font-size: 70px;
                color: #F14668;
                display: block;
                margin-bottom: 20px;
            }

            h1 {
                font-size: 18px;
                display: block;
                margin-bottom: 30px;
            }
        }
    }
</style>