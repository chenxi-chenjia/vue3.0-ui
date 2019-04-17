<template>
    <nav>
        <NavItem hover>
            <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
        </NavItem>
        <NavItem>
            <breadcrumb/>
        </NavItem>
        <NavItem hover align="right">
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <svg-icon icon-class="person-center"/>
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <router-link class="inlineBlock" to="/">
                        <el-dropdown-item>
                            主页
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </NavItem>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Hamburger from './Hamburger'
    import NavItem from './NavItem'
    import Breadcrumb from './Breadcrumb'

    export default {
        components: {
            Hamburger,
            NavItem,
            Breadcrumb,
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar')
            },
            logout() {
                this.$store.dispatch('FedLogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    nav {
        @include clearfix;
        height: $navBar-height;
        line-height: $navBar-height;
        border-radius: 0 !important;
        padding-right: 30px;
        position: relative;
        &:after {
            content: '';
            position: absolute;
            left: 0;
            width: 100%;
            bottom: 0;
            border-bottom: solid 1px #e6e6e6;
        }
        .hamburger-container {
            line-height: 58px;
            height: 50px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 18px;
            color: red;
        }
        .avatar-container {
            width: 100%;
            height: 100%;
            font-size: 16px;
            line-height: $navBar-height;
            text-align: center;
        }
    }
</style>

