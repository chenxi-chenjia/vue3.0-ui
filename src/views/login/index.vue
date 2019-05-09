<template>
    <div class="login-container">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            label-position="left"
        >
            <el-row type="flex" align="middle">
                <!-- 登录框左边 -->
                <div class="logo-left-box flex-column">
                    <img src="@/assets/logo.png" alt>
                    <h2 class="logo-title">{{ AppTitle }}</h2>
                </div>
                <el-button id="test" type="primary">123123</el-button>

                <div class="logo-right-box">
                    <h3 class="title">后台系统</h3>
                    <el-form-item prop="username">
                        <div class="svg-container">
                            <svg-icon icon-class="user"/>
                        </div>
                        <el-input
                            v-model="loginForm.username"
                            name="username"
                            type="text"
                            placeholder="用户名"
                        />
                    </el-form-item>
                    <el-form-item prop="password">
                        <div class="svg-container">
                            <svg-icon icon-class="password"/>
                        </div>
                        <el-input
                            :type="pwdType"
                            v-model="loginForm.password"
                            name="password"
                            placeholder="密码"
                            @keyup.enter.native="handleLogin"
                        />
                        <div class="show-pwd" @click="showPwd">
                            <svg-icon icon-class="eye"/>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            :loading="loading"
                            type="primary"
                            style="width:100%;"
                            @click.native.prevent="handleLogin"
                        >登 录</el-button>
                    </el-form-item>
                </div>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import { login } from "@/api/login";
import test from "@/utils/test";

export default {
    name: "Login",
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入正确的用户名"));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入正确的密码"));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                username: "admin",
                password: "admin"
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateUsername
                    }
                ],
                password: [
                    { required: true, trigger: "blur", validator: validatePass }
                ]
            },
            loading: false,
            pwdType: "password",
            redirect: undefined
        };
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },
    computed: {
        AppTitle() {
            return process.env.VUE_APP_TITLE;
        }
    },
    methods: {
        showPwd() {
            if (this.pwdType === "password") {
                this.pwdType = "";
            } else {
                this.pwdType = "password";
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch("Login", this.loginForm)
                        .then(() => {
                            this.loading = false;
                            this.$router.push("/");
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        F1(e) {
            alert(`you press ${e.key}`);
        }
    },
    created() {
        test(this);
    }
};
</script>

<style rel="stylesheet/css" lang="less">
@bg: #ffffff;
@light_gray: #333;

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0;
            -webkit-appearance: none;
            border-radius: 0;
            padding: 12px 5px 12px 15px;
            color: @light_gray;
            height: 47px;

            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0 1000px @bg inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style rel="stylesheet/css" lang="less" scoped>
@dark_gray: #889aa4;
@light_gray: #eee;
@titleColor: #333;
.login-container {
    display: flex;
    height: 100%;
    width: 100%;
    background-color: @loginBackgroundColor;
    justify-content: center;
    align-items: center;

    .login-form {
        max-width: 1000px;
        min-width: 30%;
        padding: 50px;
        background-color: rgba(255, 255, 255, 0.7);
        margin-bottom: 10%;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: @dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title {
        font-size: 26px;
        font-weight: 400;
        color: @titleColor;
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: @dark_gray;
        cursor: pointer;
        user-select: none;
    }
}

.logo-left-box {
    img {
        width: 120px;
    }

    .logo-title {
        color: @loginLogoTitleColor;
    }
}

.logo-right-box {
    padding-left: 50px;
    min-width: 350px;
}
</style>
