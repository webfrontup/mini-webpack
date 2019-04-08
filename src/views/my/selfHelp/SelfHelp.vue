<template>
	<div id="selfhelp">
        <div v-show="loading" class="skeleton">
            <column>
                <skeleton-square 
                    width="9rem" 
                    height="1rem"
                    :count="9" 
                    margin="0.2rem 0.5rem"
                ></skeleton-square>
            </column>
        </div>
        <nut-navbar class="pk-title"
        @on-click-back="$router.go(-1)"
        @on-click-more="selfmore" >
            自助优惠申请
            <a slot="more-icon">
                <div class="selfmore"></div>
            </a>
        </nut-navbar>
        <div v-show="!loading" class="selfhelpBody">
            <ul>
                <li @click="toDetail(infoList)" v-for="(infoList,index) in actLists" :key="index">
                    <div v-if="infoList.status === 3" @click="toDetail(infoList)" class="maxMask"></div>
                    <div class="activity-status">
                        <span v-if="infoList.status === 1">进行中</span>
                        <span v-else-if="infoList.status === 2">未开始</span>
                        <span v-else-if="infoList.status === 3">已结束</span>
                    </div>
                    <img :src="infoList.wapImg">
                    <div class="title">
                        <span>{{infoList.proTitle}}</span>
                        <span class="right">查看详情</span>
                    </div>
                </li>
            </ul>
        </div>
	</div>
</template>

<script>
    import {
        getSelflist
    } from "../../../services/center.js"
    export default {
        name: "selfhelp",
        data () {
            return {
                loading: true,
                actLists: '',
			}
        },
        mounted () {
            this.getlist();
        },
        methods: {
            selfmore(){
                this.$router.push({
                    name: "selfmore"
                });
            },
            getlist(){
                getSelflist().then(res => {
                    if (res.success) {
                        this.loading = false;
                        this.actLists = res.data;
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                });
            },
            toDetail(item){
                if (item.status == 1) {
                    this.$router.push({
                        name: "selfDetail",
                        query: {
                            id: item.id
                        }
                    });
                } else if (item.status == 2) {
                    this.$toast.text('活动未开始');
                } else if (item.status == 3) {
                    this.$toast.text('活动已结束');
                }
            }
        }
    }
</script>

<style scoped lang="scss">
#selfhelp{
    background-color: $default-color;
    /deep/ .selfmore{
        margin-top: 0.2rem;
        width: 0.6rem;
        height: 0.6rem;
        background: url("../../../assets/img/my-icon/icon-gift.png") no-repeat;
        background-size: 100% 100%;
    }
    .nut-navbar.pk-title{
        z-index: 10;
    }
    .selfhelpBody{
        ul{
            padding-top: $tenrem*2;
            background-color: $default-color;
            li{
                position: relative;
                margin: 0 auto $tenrem*2;
                width: 9.4rem;
                border-radius: $tenrem;
                border: $onerem solid $border-color;
                overflow: hidden;
                .maxMask{
                    z-index: 9;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background-color: rgba($color: $nondefault-color, $alpha: 0.4);
                }
                .activity-status{
                    position: absolute;
                    top: 0.33rem;
                    right: 0;
                    width: 1.467rem;
                    height: 0.48rem;
                    background-color: rgba($color: $nondefault-color, $alpha: 0.4);
                    border-radius: 0.24rem 0rem 0rem 0.24rem;
                    opacity: 0.7;
                    color: $default-color;
                    text-align: center;
                    span {
                        line-height: 0.48rem;
                    }
                }
                img{
                    display: block;
                    width: 100%;
                    min-height: 3.5rem;
                    max-height: 3.8rem;
                }
                .title{
                    padding-left: $four;
                    line-height: 0.8rem;
                    font-size: 0.373rem;
                    color: $text-color;
                    .right{
                        float: right;
                        padding: 0 $four;
                        color: $default-color;
                        background-color: $bluebtn-color;
                    }
                }
            }
        }
    }
}
</style>