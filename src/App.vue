<template>
    <div class="containerPage">
        <router-view></router-view>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        // created: function () {
        //     axios.interceptors.response.use(function (response) {
        //         if (response.status === 401) {
        //             // this.$store.dispatch(logout)
        //             //window.localstorahe.removeItem('token');
        //         }
        //         throw response;
        //     });
        // }
    }
</script>
<style scoped>
    .containerPage {
        width: 100%;
        height: calc(100vh);
        background-image: url("./static/img/banner.jpg");
        background-repeat: no-repeat;
    }
</style>