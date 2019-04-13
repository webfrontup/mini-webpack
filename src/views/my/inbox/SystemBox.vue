
<template>
    <div class="systemAnnounce">
        <div class="notice-list">
            <div class="del-read">
                <div class="btn-item">
                    <label>
                        <input type="checkbox" class="checkbox" v-model="select">
                        <div class="question-answer-text">全选</div>
                    </label>
                </div>
                <div class="btn-item">
                    <button @click="delAll">删除</button>
                </div>
                <div class="btn-item">
                    <button @click="readAll">标记已读</button>
                </div>
            </div>
            <div class="generalizeLink-list table">
                <div v-show="list.length > 0 && !isLoading" class="page-loadmore">
                    <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px'}" ref="wrapper">
                        <pk-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :top-all-loaded="topAllLoaded" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore" :stop-translate="stopTranslate">
                            <div class="link-list">
                                <swipe-list ref="list" class="card" :disabled="!enabled" :items="list" item-key="id" @swipeout:click="itemClick()" @rightRevealed="slideRight($event)">
                                    <template v-slot="{ item, index, close }">
                                        <div class="box-cent" @click="goPath(item.id, 1)">
                                            {{ item.content }}
                                        </div>
                                        <p class="box-time">
                                            {{item.title}} {{item.publishTime | filterDate}}
                                            <span class="is-read" v-if="!item.read">未读</span>
                                            <span class="un-read" v-if="item.read">已读</span>
                                        </p>
                                    </template>

                                    <template v-slot:right="{ item,threshold ,index}">
                                        <div class="swipeout-action red" title="remove" @click="remove(item,index)">
                                            <span>删除</span>
                                        </div>
                                    </template>
                                    </swipe-list>
                                </div>
                            <div class="noMoredata" v-show="hasData">我是有底线的</div>
                        </pk-loadmore>
                    </div>
                </div>
                <no-data v-show="list.length <= 0  && !isLoading"></no-data>
            </div>
        </div>
    </div>
</template>

<script>
    import noData from "@/components/NoData.vue";
    import pkLoadmore from '@/components/Loadmore';
    import {
        SwipeList,
        SwipeOut
    } from 'vue-swipe-actions';
    import {
        getInboxList,
        getInboxDel,
        getInboxStatus
    } from "@/services/msgCenter.js";
    export default {
        components: {
            noData,
            pkLoadmore,
            SwipeList,
            SwipeOut
        },
        data() {
            return {
                isLoading: true,
                list: [],
                wrapperHeight: 0,
                stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
                allLoaded: false,
                topAllLoaded: false,
                topStatus: '',
                bottomStatus: '',
                wrapperHeight: 0,
                page: 1, //当前页数
                pageSize: 5, //每页请求的条数
                pageTotal: 0, //总页数
                hasData: false,
                enabled: true,
                select: false
            };
        },
        mounted() {
            this.getList();
            this.$nextTick(() => {
                if (this.$refs.wrapper) {
                    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
                }
            })
        },
        methods: {
            getList() {
                this.isLoading = true;
                getInboxList({
                    page: this.page,
                    pageSize: this.pageSize
                }).then(res => {
                    this.isLoading = false;
                    if (res.success) {
                        if (res.data) {
                            let result = res.data.list || [];
                            this.pageTotal = res.data.pageTotal;
                            if (this.page === 1) {
                                this.list = result;
                                if (this.pageTotal < this.page * this.pageSize) {
                                    this.allLoaded = true;
                                    this.topAllLoaded = true;
                                } else {
                                    this.allLoaded = false;
                                    this.topAllLoaded = false;
                                }
                            } else {
                                this.list = this.list.concat(result);
                                this.topAllLoaded = false;
                            }
                            this.$nextTick(() => {
                                if (this.$refs.wrapper) {
                                    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
                                }
                            })
                        }
    
    
    
                        // this.list = res.data.list || [];
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                });
            },
            goPath(id, status) {
                this.$router.push({
                    name: "boxDetail",
                    query: {
                        id: id,
                        status: status
                    }
                });
            },
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop() {
                this.page = 1;
                this.hasData = false;
                setTimeout(() => {
                    this.getList();
                    this.$refs.loadmore.onTopLoaded();
                    this.allLoaded = false;
                }, 1500);
            },
            //mint-ui 上拉加载
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom() {
                this.page += 1;
                this.hasData = false;
                setTimeout(() => {
                    this.getList();
                    this.$refs.loadmore.onBottomLoaded();
                    if (this.page * this.pageSize >= this.pageTotal) {
                        this.allLoaded = true; //所有数据加载完成
                        this.hasData = true;
                        this.topAllLoaded = false;
                    }
                }, 1500);
            },
            slideRight(e) {
                let max = this.list.length;
                for (let i = 0; i < max; i++) {
                    if (i !== e.index) {
                        this.$refs.list.closeActions(i);
                    }
                }
            },
            //点击关闭
            itemClick() {
                this.$refs.list.closeActions();
            },
            remove(item, index) {
                let data = {
                    ids: [item.id]
                }
                getInboxDel(data).then(res => {
                    if (res.success) {
                        this.list.splice(index, 1);
                        this.$toast.success("删除成功！", {
                            cover: true,
                            duration: 1000
                        });
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                });
            },
            delAll() {
                if (!this.select) {
                    this.$toast.fail("请选择需要删除消息", {
                        cover: true,
                        duration: 1000
                    });
                    return;
                }
                let ids = [];
                this.list.map(item => {
                    ids.push(item.id)
                });
                let data = {
                    ids: ids
                }
                getInboxDel(data).then(res => {
                    if (res.success) {
                        this.$toast.success("删除成功！", {
                            cover: true,
                            duration: 1000,
                        });
                        this.list = [];
                        this.page = 1;
                        this.select = false;
                        this.getList();
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                });
            },
            readAll() {
                if (!this.select) {
                    this.$toast.fail("请选择消息记录", {
                        cover: true,
                        duration: 1000
                    });
                    return;
                }
                let ids = [];
                this.list.map(item => {
                    ids.push(item.id)
                });
                let data = {
                    ids: ids
                }
                getInboxStatus(data).then(res => {
                    if (res.success) {
                        this.$toast.success("修改成功！", {
                            cover: true,
                            duration: 1000,
                        });
                        this.list.map(item => {
                            item.read = true;
                        });
                        this.select = false;
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .systemAnnounce {
        @import "../../../components/scss/pk-pwd.scss";
    }
    
    .link-list {
        /deep/ .swipeout-list-item {
            margin-top: 0.40rem;
            background-color: $default-color;
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
            border-radius: 0.13rem;
            display: flex;
        }
    }
    
    .swipeout-action {
        display: flex;
        align-items: center;
        padding: 0 .5rem;
        cursor: pointer;
        left: 0;
    }
    
    /deep/.swipeout-list-item {
        position: relative;
        /deep/.swipeout-right {
            position: absolute;
            height: 100%;
            right: -1.6267rem;
        }
        /deep/.swipeout-content {
            padding: 0.26667rem;
            box-sizing: border-box;
            width: 100%;
        }
    }
    
    .swipeout-action.red {
        width: -1.6267rem;
        height: 100%;
        color: $default-color;
        background-color: rgb(255, 59, 48);
    }
    
    .card {
        width: 100%;
        border-radius: 3px;
        box-shadow: none;
    }
    
    .card-content {
        padding: 0.32rem;
        display: flex;
    }
    
    .box-cent {
        text-align: left;
        line-height: 1.5em;
        color: #333333;
        padding: 0.26667rem;
        box-sizing: border-box;
        font-size: 0.33333rem;
    }
    
    .box-time {
        text-align: right;
        color: #999999;
        font-size: 0.29333rem;
        margin-bottom: 0;
    }
    
    .is-read {
        line-height: 1;
        padding: 0 0.0667rem;
        background-color: #ffffff;
        border-radius: 0.0533rem;
        border: solid 0.0267rem #009944;
        color: #009944;
    }
    
    .un-read {
        line-height: 1;
        padding: 0 0.0667rem;
        background-color: #ffffff;
        border-radius: 0.0533rem;
        border: solid 0.0267rem #ff321d;
        color: #ff321d;
    }
    
    input.checkbox {
        width: 0.32rem;
        height: 0.32rem;
        position: absolute;
        margin-top: 0.0533rem;
        &::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 0.32rem;
            height: 0.32rem;
            border: 0.0267rem solid #646466;
            background: #fff;
        }
        &[type=checkbox]:checked::before {
            background: #4a90e2;
            border: 0.0267rem solid #4a90e2;
        }
        &[type=checkbox]:checked::after {
            font-family: 'iconfont';
            content: "\E662";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(-90deg);
            color: #fff;
            font-size: 0.24rem;
        }
    }
    
    .del-read {
        padding-bottom: 0.2667rem;
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        .btn-item {
            flex: 2;
            margin-left: 0.2667rem;
            .question-answer-text {
                padding-left: 0.4rem;
            }
            button {
                display: inline-block;
                padding: 0.1333rem 0;
                width: 100%;
                font-size: 12px;
                line-height: 1em;
                border-radius: 0.08rem;
                background: transparent;
                border: 0.0267rem solid $label-color;
            }
        }
    }
</style>