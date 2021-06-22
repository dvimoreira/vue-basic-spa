<template>
    <div>
        <div class="no-data">
            <i class="fas fa-exclamation-triangle"></i>
            <p><b>Nenhum dado cadastrado</b></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NoData',
        data () {
            return {}
        }
    };
</script>

<style scoped lang="scss">
    @import '../assets/authenticated.scss';

    .no-data {
        text-align: center;
        border: 1px dashed rgba(204, 204, 204, 0.76);
        padding: 30px 0;
        i {
            display: block;
            font-size: 48px;
            margin-bottom: 25px;
            opacity: 0.3;
        }
        p {
            text-transform: uppercase;
            opacity: 0.3;
        }
    }

    @media (min-width: 576px) {}
    @media (min-width: 768px) {}
    @media (min-width: 992px) {}
    @media (min-width: 1200px) {}
</style>