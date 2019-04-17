<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <span class="no-redirect">{{ levelList[levelList.length - 1].meta.title }}</span>
    </el-breadcrumb>
</template>

<script>
    export default {
        data() {
            return {
                levelList: null
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        created() {
            this.getBreadcrumb()
        },
        methods: {
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => {
                    if (item.name) {
                        return true
                    }
                })
                this.levelList = matched
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: $navBar-height;
        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>
