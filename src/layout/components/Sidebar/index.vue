<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :show-timeout="200"
            :default-active="$route.path"
            :collapse="isCollapse"
            mode="vertical"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
        >
            <router-link to="/">
                <el-menu-item class="submenu-title-noDropdown logo-item" index="0">
                    <svg-icon icon-class="password"></svg-icon>
                    <span>{{ appTitle }}</span>
                </el-menu-item>
            </router-link>
            <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import { mapGetters } from 'vuex'
    import SidebarItem from './SidebarItem'

    export default {
        components: { SidebarItem },
        computed: {
            ...mapGetters([
                'permission_routers',
                'sidebar',
            ]),
            routes() {
                return this.$router.options.routes
            },
            isCollapse() {
                return !this.sidebar.opened
            },
            appTitle() {
                return process.env.VUE_APP_TITLE
            }
        }
    }
</script>

<style rel="stylesheet" lang="less">
    .logo-item {
        background-color: @sidebar-logo-background !important;
        height: @navBar-height;
        line-height: @navBar-height;
        font-size: 18px;

        &:after {
            content: '';
            position: absolute;
            left: 0;
            width: 100%;
            bottom: 0;
            border-bottom: solid 1px #e6e6e6;
        }

        .svg-icon {
            color: red;
        }

        span {
            color: @sidebar-logo-color !important;
        }
    }

    .hideSidebar {
        .logo-item {
            font-size: 18px;
        }
    }
</style>
