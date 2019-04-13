<template>
    <div class="pk-auth">
        <nut-navbar class="pk-title" :rightShow="false">
            <a slot="back-icon" @click="goBack">返回</a>登录
        </nut-navbar>
        <div class="pk-login">
            <div class="pk-login-user ">
                <img src="../../assets/img/index-icon/login-user.png" alt="">
            </div>
            <div class="pk-login-item">
                <label for="account">请输入账号</label>
                <input type="text" id="account" placeholder="请输入账号" v-model="account">
            </div>
            <div class="pk-login-item">
                <label for="password">请输入密码</label>
                <input type="password" id="password" placeholder="请输入密码" v-model="password">
            </div>
            <div class="pk-login-item login-code" v-if="setting.isLoginCode == 1 && setting.loginCaptchaType == 1">
                <label for="code">请输入验证码</label>
                <div class="login-code-input">
                    <input type="text" id="code" placeholder="请输入验证码" v-model="code">
                </div>
                <img :src="'data:image/png;base64,'+codeInfo.code" alt="" class="login-code-img" @click="getCaptchaImg" v-if="codeInfo.code">
            </div>
            <div class="pk-login-item">
                <div class="pk-login-toLogin" @click="toLogin">
                    立即登录
                </div>
            </div>
            <div class="pk-login-item">
                <div class="pk-login-toRegister" @click="toRegister">
                    免费开户
                </div>
            </div>
        </div>
        <!-- 验证码 start -->
        <Mpanel v-if="mpanelShow" @close="mpanelShow = false" @success="onMpanelSuccess" :type="2"></Mpanel>
        <!-- 验证码 end -->
    </div>
</template>

<script>
    import {
        getCaptchaCode,
        login,
        getRegisterSet
    } from "../../services/auth.js";
    import Mpanel from "../../components/Mpanel.vue"; //验证
    export default {
        components: {
            Mpanel
        },
        data() {
            return {
                account: "",
                password: "",
                code: "",
                codeInfo: {},
                setting: {},
                mpanelShow: false
            };
        },
        mounted() {
            this.getRegisterSetFunc();
    
        },
        methods: {
            getCaptchaImg() {
                this.code = "";
                getCaptchaCode().then(res => {
                    if (res.success) {
                        this.codeInfo = res.data;
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                });
            },
            getRegisterSetFunc() {
                getRegisterSet().then(res => {
                    if (res.success) {
                        console.log(res.data);
                        this.setting = res.data;
                        if (this.setting.isLoginCode == 1 && this.setting.loginCaptchaType == 1) {
                            this.getCaptchaImg();
                        }
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                })
            },
            goBack() {
                this.$router.go(-1);
            },
            toLogin() {
                if (!this.account) {
                    this.$toast.fail("请输入账号！", {
                        cover: true,
                        duration: 1000
                    });
                    return;
                } else if (!this.password) {
                    this.$toast.fail("请输入密码！", {
                        cover: true,
                        duration: 1000
                    });
                    return;
                }
                if (this.setting.isLoginCode == 1 && this.setting.loginCaptchaType == 1 && !this.code) {
                    this.$toast.fail("请输入验证码！", {
                        cover: true,
                        duration: 1000
                    });
                    return;
                }
                if (this.setting.isLoginCode === 1 && this.setting.loginCaptchaType === 2) {
                    this.mpanelShow = true
                } else {
                    this.loginAjax();
                }
    
            },
            loginAjax() {
                const data = {
                    account: this.account,
                    password: this.password,
                    code: this.code,
                    codeId: this.codeInfo.id
                };
                login(data).then(res => {
                    if (res.success) {
                        sessionStorage.setItem('token', res.data);
                        this.$router.push({
                            name: "index"
                        });
                    } else {
                        this.getCaptchaImg();
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            // 验证通过
            onMpanelSuccess(back,id) {
                this.code = back + '';
                this.codeInfo.id = id;
                this.mpanelShow = false;
                this.loginAjax();
            },
            toRegister() {
                this.$router.push({
                    name: "register"
                });
            }
          
        }
    };
</script>

<style lang="scss" scoped>
    @import "./auth.scss";
</style>

