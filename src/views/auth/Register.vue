<template>
    <div class="pk-auth">
        <nut-navbar class="pk-title" :rightShow="false">
            <a slot="back-icon" @click="goBack">返回</a>注册
        </nut-navbar>
        <div class="noticebar" v-if="announcement.length > 0">
            <div class="noticebar-label">
                <button>公告</button>
            </div>
            <marquee direction="left" align="bottom" height="27" width="100%" onmouseout="this.start()" onmouseover="this.stop()" scrollamount="4" scrolldelay="1">
                <div class="noticeText" v-for="(noticeDatas,index) in announcement" :key="index">
                    {{noticeDatas.content}}
                </div>
            </marquee>
        </div>
        <div class="pk-register">
            <ul>
                <li class="pk-register-item">
                    <label><span class="must">介绍人</span></label>
                    <div class="item-input">
                        <input type="text" readonly v-model="promoCode">
                    </div>
                </li>
                <li class="pk-register-item">
                    <label><span class="must">账号</span></label>
                    <div class="item-input">
                        <input type="text" placeholder="5-12位字母和数字组合" v-model="account" @focus="showAccountIcon = true" @blur="hideClear()">
                        <i class="iconfont icon-login-error" v-if="showAccountIcon" @click="clearVal"></i>
                    </div>
                </li>
                <li class="pk-register-item">
                    <label><span class="must">密码</span></label>
                    <div class="item-input">
                        <input :type="showPassword?'password':'text'" placeholder="6-20位字母和数字组合" v-model="password">
                        <img src="../../assets/img/index-icon/eyeclose.png" alt="" v-if="showPassword" @click="showPassword = !showPassword">
                        <img src="../../assets/img/index-icon/eye.png" alt="" v-if="!showPassword" @click="showPassword = !showPassword">
                    </div>
                </li>
                <li class="pk-register-item">
                    <label><span class="must">确认密码</span></label>
                    <div class="item-input">
                        <input placeholder="再次输入您的登录密码" :type="showPasswordComf?'password':'text'" v-model="passwordComf">
                        <img src="../../assets/img/index-icon/eyeclose.png" alt="" v-if="showPasswordComf" @click="showPasswordComf = !showPasswordComf">
                        <img src="../../assets/img/index-icon/eye.png" alt="" v-if="!showPasswordComf" @click="showPasswordComf = !showPasswordComf">
    
                    </div>
                </li>
                <li class="pk-register-item item-code" v-if="setting.isCode == 1 && setting.captchaType == 1">
                    <label><span class="must">验证码</span></label>
                    <div class="item-input">
                        <input type="text" placeholder="请输入验证码" v-model="code" @focus="showCodeClearIcon = true" @blur="hideClearCodeIcon">
                        <i class="iconfont icon-login-error" v-if="showCodeClearIcon" @click="clearCodeVal"></i>
                    </div>
                    <div class="item-code-img">
                        <img :src="'data:image/png;base64,'+codeInfo.code" alt="" class="login-code-img" @click="getCaptchaImg" v-if="codeInfo.code">
                    </div>
                </li>
                <li class="pk-register-item register-agreement">
                    <label><nut-checkbox v-model="agree">同意</nut-checkbox></label>
                    <div class="item-input">
                        <div @click="toAgreement">用户注册协议</div>
                    </div>
                </li>
            </ul>
            <div class="pk-register-btn" :class="{'btn-light':agree}" @click="toRegister">
                立即注册
            </div>
            <div class="pk-toLogin">
                <span>已有账号</span>
                <span @click="toLogin">前往登录</span>
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
        getRegisterSet,
        getAgent,
        register
    } from "../../services/auth.js";
    import {
        getAnnouncement
    } from "../../services/index.js";
    import Mpanel from "../../components/Mpanel.vue"; //验证
    export default {
        components: {
            Mpanel
        },
        data() {
            return {
                showAccountIcon: false,
                showCodeClearIcon: false,
                announcement: [],
                promoCode: "aaa",
                account: "",
                password: "",
                passwordComf: "",
                showPasswordComf: true,
                showPassword: true,
                code: "",
                codeInfo: {},
                agree: false,
                RegExp: {
                    account: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,12}$/,
                    pwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
                },
                setting: {},
                mpanelShow: false
            };
        },
        mounted() {
            this.getRegisterSetFunc();
            this.getAgentFunc();
            this.getAnnouncementFunc();
        },
        methods: {
            getAnnouncementFunc() {
                getAnnouncement(-2).then(res => {
                    if (res.success) {
                        this.announcement = res.data.announcement;
                        console.log(213123123);
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            getAgentFunc() {
                getAgent().then(res => {
                    if (res.success) {
                        this.promoCode = res.data;
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                });
            },
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
                        if (this.setting.isCode == 1 && this.setting.captchaType == 1) {
                            this.getCaptchaImg();
                        }
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
    
            goBack() {
                this.$router.push({
                    name: "index"
                });
            },
    
            hideClear() {
                setTimeout(() => {
                    this.showAccountIcon = false;
                }, 1);
            },
            clearVal() {
                this.account = "";
            },
            hideClearCodeIcon() {
                setTimeout(() => {
                    this.showCodeClearIcon = false;
                }, 1);
            },
            clearCodeVal() {
                this.code = "";
            },
            toAgreement() {
                this.$router.push({
                    name: "registerAgreement"
                });
            },
            toLogin() {
                this.$router.push({
                    name: "login"
                });
            },
            toRegister() {
                if (!this.agree) {
                    return;
                }
                if (!this.account) {
                    this.$toast.fail("请输入账号！", {
                        cover: true,
                        duration: 1000
                    });
                    return;
                } else if (!this.RegExp.account.test(this.account)) {
                    this.$toast.fail("账号必须由5-12位字母和数字组合", {
                        cover: true,
                        duration: 1500
                    });
                    return;
                } else if (!this.password) {
                    this.$toast.fail("请输入密码！", {
                        cover: true,
                        duration: 1000
                    });
                    return;
                } else if (!this.RegExp.pwd.test(this.password)) {
                    this.$toast.fail("密码必须由6-20位字母和数字组合", {
                        cover: true,
                        duration: 1500
                    });
                    return;
                } else if (!this.passwordComf) {
                    this.$toast.fail("请再次输入密码！", {
                        cover: true,
                        duration: 1000
                    });
                    return;
                } else if (this.passwordComf != this.password) {
                    this.$toast.fail("两次密码输入不一致！", {
                        cover: true,
                        duration: 1000
                    });
                    return;
                }
                if (
                    this.setting.isCode == 1 &&
                    this.setting.captchaType == 1 &&
                    !this.code
                ) {
                    this.$toast.fail("请输入验证码！", {
                        cover: true,
                        duration: 1500
                    });
                    return;
                }
                if (this.setting.isCode === 1 && this.setting.captchaType === 2) {
                    this.mpanelShow = true;
                } else {
                    this.loginAjax();
                }
            },
            // 验证通过
            onMpanelSuccess(back, id) {
                this.code = back + "";
                this.codeInfo.id = id;
                this.mpanelShow = false;
                this.loginAjax();
            },
            loginAjax() {
                let data = {
                    account: this.account,
                    password: this.password,
                    confirmPassword: this.passwordComf,
                    spreadId: this.promoCode,
                    code: this.code,
                    codeId: this.codeInfo.id,
                    readAgree: this.agree
                }
                register(data).then(res => {
                    if (res.success) {
                        sessionStorage.setItem('token', '234567890-=');
                        this.$router.push({
                            name: "index"
                        });
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                })
    
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "./auth.scss";
</style>

