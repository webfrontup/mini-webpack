
<template>
    <div class="msgDetail" ref="msgDetail">
        <nut-navbar class="info-header blue-header" @on-click-back="back('msgCenter')">
            {{ title }}
            <a class="spans" slot="back-icon">
                <img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png" />
            </a>
            <a class="spans" slot="more-icon" v-if="false"></a>
        </nut-navbar>
        <div class="notice-list pk-1px-t">
            <ul class="noticeGamePartial">
                <li>
                    <div class="i">
                        <div class="title">{{list.advisoryTitle}}</div>
                        <p class="ps">
                            <i>{{list.advisoryTime | filterDate}}</i>
                        </p>
                        <div class="ct">
                            <p class="pf">
                                {{list.advisoryContent}}
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
        getInboxInfo,
        getInboxMyInfo
    } from "../../../services/msgCenter.js";
    
    export default {
        data() {
            return {
                id: this.$route.query.id * 1,
                title: this.$route.query.status == 1 ? "系统消息" : "我的消息",
                list: {}
            };
        },
        mounted() {
            if (this.$route.query.status == 1) {
                getInboxInfo({
                    id: this.id
                }).then(res => {
                    if (res.success) {
                        this.list = res.data.data[0];
                        console.log(this.list, 'list')
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                });
            } else {
                getInboxMyInfo({
                    id: this.id
                }).then(res => {
                    if (res.success) {
                        this.list = res.data.data[0];
                        console.log(this.list, 'list')
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                });
            }
    
        },
        methods: {
            back() {
                var path =
                    this.$route.query.status == 1 ?
                    "systemBox" :
                    "myBox";
                this.$router.push({
                    name: path,
                    query: {
                        active: this.$route.query.status
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../components/scss/pk-pwd.scss";
    .msgDetail {
        background: #f2f2f2;
        margin-top: 20.0003px/* 20/75 */
        ;
        .blue-header {
            background-color: #1766bb;
        }
        .ps {
            padding-right: 20.0003px;
        }
        .pf {
            color: #666 !important;
        }
    }
</style>