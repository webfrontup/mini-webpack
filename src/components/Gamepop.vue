<template>
    <div v-if="state" class="gameInto">
        <div class="popBox">
            <div class="popTit">快速转账
                <div @click="closepop()" class="close iconfont icon-sykszz-close"></div>
            </div>
            <ul class="quotaBox mui-clearfix">
                <li class="pk-1px-b">
                    <div class="left">系统余额</div>
                    <div class="right">
                        <span class="systemBalance">{{allmoney}}</span>
                        <router-link :to="{name:'deposit'}" tag="span" class="goWithdraw">去存款</router-link>
                    </div>
                </li>
                <li class="pk-1px-b">
                    <div class="left">{{gameName}}余额</div>
                    <div class="right systemBalance">{{balances}}</div>
                </li>
                <li>
                    <div class="left">即时转入</div>
                    <div class="right">
                        <input id="qtransfer" v-model="money" type="number" placeholder="请输入您要转入的金额">
                    </div>
                </li>
            </ul>
            <button @click="getForm()" type="button" class="mui-btn popBtn confirm active" data-loading-text="loading...">确认转账</button>
            <button @click="intoGame()" type="button" class="mui-btn popBtn goGame" data-loading-text="loading...">进入游戏</button>
        </div>
        <div class="box-mask"></div>
    </div>
</template>

<script>
    import {
        openGame
    } from "@/services/index.js";
    import func from '@/services/deposit';
    export default {
        props: {
            state: {
                type: Boolean,
                default: false,
            },
            allmoneyPop: {
                type: Number,
                default: 0,
            },
            platformId: {
                type: Number,
                default: 0,
            },
            platformName: {
                type: String,
                default: '',
            },
            gameName: {
                type: String,
                default: '',
            },
            gameId: {
                type: Number,
                default: 0
            },
            isDW: {
                type: Boolean,
                default: false
            },
            balances: {
                type: Number,
                default: 0,
            },
        },
        name: "gamepop",
        watch: {
            state(newVal, oldVal) {
                console.log(newVal)
                if (newVal) {
                    this.ModalHelper.open();
                } else {
                    this.ModalHelper.close();
                }
            },
            allmoneyPop() {
                this.allmoney = this.allmoneyPop;
            }
        },
        data() {
            return {
                money: null,
                allmoney: 0
            }
        },
        methods: {
            closepop() {
                this.states = false;
                this.$emit('returnState', this.states);
                this.money = ''
            },
            validateTrans() { //验证
                const Reg = /^[1-9]\d*$/; //非0正整数
                if (!Reg.test(this.money)) {
                    this.$toast.fail("转入金额为正整数", {
                        cover: true,
                        duration: 1500
                    });
                    return false;
                }
                if (this.money > this.allmoney || this.money < 1) {
                    this.$toast.fail(`转入金额不得高于${this.allmoney}元`, {
                        cover: true,
                        duration: 1500
                    });
                    return false;
                }
                return true
            },
            getForm() {
                if (!this.validateTrans()) return;
                let postData = {
                    doType: 2,
                    transferAmount: this.money * 1,
                    transferIntoId: this.platformId,
                    transferInto: this.platformName
                };
                console.log('确认转账提交数据', postData)
                func.transfersMoney(postData).then((res) => {
                    if (res.success) {
                        this.$toast.success("转入成功!", {
                            cover: true,
                            duration: 800
                        });
                        this.allmoney -= this.money * 1;
                        this.money = "";
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 4000
                        });
                    }
                })
    
            },
            intoGame() {
                console.log('进游戏数据', this.platformId);
                let data = {
                    platform: this.platformName,
                    gameId: this.gameId + '',
                    isDW: this.isDW
                }
                console.log(data);
                openGame(data).then(res => {
                    if (res.success) {
                        if (res.data) {
                            console.log(res.data);
                            window.open(res.data, '_blank', 'toolbar=yes, width=1300, height=900')
                        }
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .gameInto {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        .popBox {
            z-index: 999;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 9.2rem;
            height: 7.867rem;
            background-color: $color-S;
            border-radius: 0.133rem;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            overflow: visible;
            margin: 0 auto;
            .popTit {
                position: relative;
                line-height: 1.213rem;
                font-size: 0.427rem;
                font-weight: bold;
                padding-left: 0.4rem;
                color: $color-C;
                .close {
                    position: absolute;
                    right: 0.4rem;
                    top: 0;
                    font-size: 0.32rem;
                    color: $color-M;
                }
            }
            ul.quotaBox {
                padding: 0 0.4rem;
                height: 3.253rem;
                overflow: hidden;
                background-color: $default-color;
                li {
                    height: 1.08rem;
                    line-height: 1.08rem;
                    font-size: 0.373rem;
                    overflow: hidden;
                    .left {
                        float: left;
                        color: $color-C;
                    }
                    .systemBalance {
                        font-weight: bold;
                    }
                    .right {
                        float: right;
                        text-align: right;
                        color: $primary-color;
                        span {
                            display: inline-block;
                        }
                        .goWithdraw {
                            margin-left: 0.12rem;
                            width: 1.06667rem;
                            height: 0.5333rem;
                            line-height: 0.5333rem;
                            text-align: center;
                            font-weight: normal;
                            font-size: 0.2667rem;
                            border: 1px solid $primary-color;
                            color: $primary-color;
                            border-radius: 0.08rem;
                        }
                        input {
                            margin: 0;
                            padding: 0;
                            background: none;
                            border: none;
                            height: 0.506667rem;
                            text-align: right;
                            color: $color-primary;
                            &::-webkit-input-placeholder {
                                font-size: 0.32rem;
                                color: $color-primary;
                            }
                        }
                    }
                }
            }
            .popBtn {
                display: block;
                margin: 0.4rem auto;
                width: 8.4rem;
                height: 1.067rem;
                line-height: 1.067rem;
                font-size: 0.373rem;
                border-radius: 0.133rem;
                border: 1px solid $primary-color;
                color: $primary-color;
                background: transparent;
            }
            .popBtn.mui-btn.active {
                color: $default-color;
                background: $primary-color;
            }
        }
        .box-mask {
            z-index: 998;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: $color-rgab-black4;
        }
    }
</style>
