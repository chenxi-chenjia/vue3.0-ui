<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="sass">
    @import "./assets/font/iconfont.css"
</style>

<style lang="css">
    .page-container {
        padding: 20px 60px;
    }
    .app-container {
        box-sizing: border-box;
        height: 100%;
    }

    .app-box {
        height: 100%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border: 1px solid #ebeef5;
        background-color: #fff;
        /*border-radius: 10px;*/
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        box-sizing: border-box;
    }

    .scroll-bar {
        height: 100%;
    }

    .el-dialog__headerbtn{
        z-index: 999;
    }
</style>

<script>
    export default {
        name: 'App'
    }
</script>
