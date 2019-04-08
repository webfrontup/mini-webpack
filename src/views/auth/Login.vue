<template>
    <div class="pk-auth">
        <nut-navbar class="pk-title" :rightShow="false">
            <a slot="back-icon" @click="goBack">返回</a>登录
        </nut-navbar>
        <div class="pk-login">
            <div class="pk-login-user iconfont icon-tab-mine"></div>
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
        <nut-tabbar @tab-switch="tabSwitch3" :tabbarList="tabList3" :bottom="true"></nut-tabbar>
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
                tabList3: [{
                        tabTitle: "主页",
                        curr: true,
                        icon: "http://img13.360buyimg.com/uba/jfs/t1/29316/38/1115/3203/5c0f3d61E35d0c7da/9e557f2cb5c9dab6.jpg",
                        activeIcon: "http://img20.360buyimg.com/uba/jfs/t1/9996/36/8646/4833/5c0f3d61E7c1b7e0f/c98ad61124172e93.jpg"
                    },
                    {
                        tabTitle: "存款",
                        curr: false,
                        icon: "http://img12.360buyimg.com/uba/jfs/t1/25443/23/1062/4600/5c0f3d61E2e9f1360/c9b3421fe18614e2.jpg",
                        activeIcon: "http://img20.360buyimg.com/uba/jfs/t1/19241/12/1048/8309/5c0f3d61E17ed5a56/c3af0964cade47f8.jpg"
                    },
                    {
                        tabTitle: "优惠",
                        curr: false,
                        icon: "http://img13.360buyimg.com/uba/jfs/t1/10361/35/4713/4643/5c0f3d62E437a3c94/273fd0fb90798f03.jpg",
                        activeIcon: "http://img14.360buyimg.com/uba/jfs/t1/26604/35/1073/7896/5c0f3d61Eb9f5f184/5f01c938abe4216d.jpg"
                    },
                    {
                        tabTitle: "客服",
                        curr: false,
                        icon: "http://img11.360buyimg.com/uba/jfs/t1/14848/18/1066/3723/5c0f41bdE9f2a38fe/e6ed6768717297fb.jpg",
                        activeIcon: "http://img30.360buyimg.com/uba/jfs/t1/17538/16/1070/6214/5c0f41bdE4bc9a1db/74cf978e5015454b.jpg"
                    },
                    {
                        tabTitle: "我的",
                        curr: false,
                        icon: "http://img20.360buyimg.com/uba/jfs/t1/20004/20/1045/3620/5c0f3d61Eaaec1670/9e59db63983b7b9f.jpg",
                        activeIcon: "http://img14.360buyimg.com/uba/jfs/t1/23967/14/1072/6714/5c0f3d61E0ad8991e/8f741953f6e38f15.jpg"
                    }
                ],
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
            },
            tabSwitch3: function(value, index) {
                console.log(index);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "./auth.scss";
</style>

