<template>
    <div class="app-container">
        <div class="app-box">
            <button type="button" style="z-index: 999;" @click="routerBack" aria-label="Close"
                    class="el-dialog__headerbtn">
                <i class="el-dialog__close el-icon el-icon-close"></i>
            </button>
            <el-scrollbar class="scroll-bar" wrap-class="scrollbar-wrapper">
                <div class="page-container">
                    <router-view/>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            routerBack() {
                this.$router.back()
            }
        }
    }
</script>
