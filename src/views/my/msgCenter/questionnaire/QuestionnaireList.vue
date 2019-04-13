<template>
    <div class="systemAnnounce questionnaire">
        <div class="notice-list">
            <div class="skeleton vue-skeleton-loading" v-show="isLoading">
                <div class="skeleton-bac-animation"></div>
                <div class="skeleton-bac-content">
                    <column padding="0.2rem  0 0.2rem 0 ">
                        <skeleton-square width="9.4667rem" style="height:2.9777rem" margin="0 0  0.2667rem 0"></skeleton-square>
                        <skeleton-square width="9.4667rem" style="height:2.9777rem" margin="0 0  0.2667rem 0"></skeleton-square>
                        <skeleton-square width="9.4667rem"  style="height:2.9777rem" margin="0 0  0.2667rem 0"></skeleton-square>
                    </column>
                </div>
            </div>
            <ul class="noticeGamePartial" v-show="!isLoading && list.length > 0">
                <li @click="toInfo(item)" v-for="(item, i) in list" :key="i" class="mint-cell-value">
                    <div class="i">
                        <div class="ct">
                            <p>{{ item.title }}</p>
                            <i class="iconfont icon-weitianxie pk-qs-status pk-stats-wt" v-if="item.status == 1 && item.stopStatus == 2"></i>
                            <i class="iconfont icon-yitianxie pk-qs-status pk-stats-yt" v-if="item.status == 2 && item.stopStatus == 2"></i>
                            <i class="iconfont icon-yitianxie pk-qs-status icon-yiguoqi" v-if="item.stopStatus == 1"></i>
                        </div>
                        <p>
                            {{item.stopTime | filterDate}}
                            <span class="type-style-wt" v-if="item.status == 1 && item.stopStatus == 1">未填写</span>
                            <span class="type-style-yt" v-if="item.status == 2 && item.stopStatus == 1">已填写</span>
                        </p>
                    </div>
                </li>
            </ul>
            <no-data v-show="list.length <= 0 && !isLoading"></no-data>
        </div>
    </div>
</template>

<script>
    import noData from "@/components/NoData.vue"
    import {
        getQuestionnaireList
    } from "@/services/msgCenter.js";
    export default {
        components: {
            noData
        },
        data() {
            return {
                isLoading: true,
                list: []
            };
        },
        mounted() {
            getQuestionnaireList({
                page: 1,
                pageSize: 100
            }).then(res => {
                this.isLoading = false;
                if (res.success) {
                    this.list = res.data.investigationFrontMessage;
                    console.log(this.list, "this.list");
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1000
                    });
                }
            });
        },
        methods: {
            toInfo(item) {
                this.$router.push({
                    name: "questionnaire",
                    query: {
                        id: item.status == 2 ? item.pid : item.id,
                        showAnswer: item.status == 2
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .systemAnnounce {
        @import "../../../../components/scss/pk-pwd.scss";
    }
    
    @import "./questionnaire.scss";
</style>