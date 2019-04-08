<template>
    <div id="backwater">
        <!-- 查看返水详情弹框 -->
        <div v-show="isShowBackwaterMask" class="dialogbox">
            <div class="positionFixed dialog-mask"></div>
            <div class="positionFixed deviceBody">
                <div class="dialogs">
                    <div class="title">返水详情
                        <span class="closebox" @click="isShowBackwaterMask = false;">
                            <nut-icon type="cross" size="0.4rem">
                            </nut-icon>
                        </span>
                    </div>
                     <div class="details-content">
                        <dl>
                            <dt>
                                <span>游戏名称</span>
                                <span>有效打码</span>
                                <span>返水金额</span>
                            </dt>
                            <div class="scorll-list">
                                <dd v-show="isShowBackwaterMask" v-for="(item,index) in infoData.list"
                                :key="index">
                                    <span>{{item.platformName}}</span>
                                    <span>{{item.betall}}</span>
                                    <span>{{item.money}}</span>
                                </dd>
                                <div v-show="!isShowBackwaterMask" class="noData">
                                    <img src="../../../assets/img/bet-record-no-data.png">
                                    <p>暂无数据</p>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <nut-navbar class="pk-title" :rightShow="false"
        @on-click-back="$router.go(-1)">
            自助返水
        </nut-navbar>
        <div class="content">
            <div class="backwater-top">
                <ul>
                    <li>
                        <h2>有效打码</h2>
                        <p>{{infoData.betall}}</p>
                    </li>
                    <li>
                        <h2>返水金额
                        </h2>
                        <p>{{infoData.allMoney}}</p>
                    </li>
                </ul>
                <div class="backwater-top-btn">
                    <div class="btn">
                        <button
                            :disabled="infoData.allMoney <= 0"
                            @click="getBackWaterInfo"
                        >查看返水额</button>
                        <button
                            :disabled="infoData.status === 2"
                            @click="handleBackWater"
                        >领取返水</button>
                    </div>
                </div>
            </div>
            <div class="backwater-list">
                <div class="title">自助返水历史</div>
                <div class="total">
                    <p>当日已返水：<span>{{today}}</span></p>
                    <p>本周返水额：<span>{{week}}</span></p>
                </div>
                <dl v-show="list != null">
                    <dt>
                        <span>有效打码</span>
                        <span>返水金额</span>
                    </dt>
                </dl>
            </div>
            <!--列表数据展示 -start -->
			<!--paddingTop 用来动态计算上面层级高度，这里是可以动态改变滴-->
			<div class="generalizeLink-list">

				<div v-show="list != null" class="page-loadmore">
				<!-- :style="{ height: wrapperHeight + 'px' }" -->
					<div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px'}" ref="wrapper">
						<pk-loadmore :top-method="loadTop" :bottom-method="loadBottom" 
						:bottom-all-loaded="allLoaded" :top-all-loaded="topAllLoaded" 
						@top-status-change="handleTopChange" 
						@bottom-status-change="handleBottomChange" ref="loadmore" 
						:stop-translate="stopTranslate">
							<ul>
								<li v-for="(item,index) in list" :key="index">
                                    <h2>
                                        <span>{{item.betall}}</span>
                                        <span>{{item.rebateWater}}</span>
                                    </h2>
                                    <p>
                                        <span>订单号：{{item.orderId}}</span>
                                        <span>{{item.createTime | filterDate}}</span>
                                    </p>
                                </li>
							</ul>
							<div class="noMoredata" v-show="hasData">我是有底线的</div>
						</pk-loadmore>
					</div>
				</div>
                <!--列表数据展示 -end -->
                <div v-show="list == null" class="no-data">
                    <div class="no-data-box">
                        <img src="@/assets/img/bet-record-no-data.png">
                        <p>您暂时还未获得返水哦~~</p>
                        <router-link tag="button" :to="{name:'index'}">去投注，获得返水！</router-link>
                    </div>
                </div>
			</div>
        </div>
    </div>
</template>

<script>
import {
    getBackwaterInfo,
    getBackwaterReceive,
    getBackwaterList,
} from "@/services/center.js"
import pkLoadmore from '@/components/Loadmore';	
export default {
    name: "backwater",
    components: {
        pkLoadmore
    },
    mounted() {
        this.getBackWaterInfo(1);
        this.getList();
    },
    data() {
        return {
            isShowBackwaterMask: false,
            stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
            allLoaded: false,
            topAllLoaded: false,
            topStatus: '',
            bottomStatus: '',
            wrapperHeight: 0,
            // paddingTop:this.getPaddingTop(),
            page: 1, //当前页数
            pageSize: 10, //每页请求的条数
            totalNum: 0, //总页数
            list: null,
            hasData: false,

            infoData: {},
            today: 0,
            week: 0
        };
    },
    methods: {
        // //动态计算 层级哪里的高度
        // getPaddingTop(){
        //     //92是header的固定高度
        //     return (this.$(".content").height()+92) / 75;
        // },
        //获取返水列表
        getList(t) {
            let postData = {
                    page: this.page,
                    pageSize: this.pageSize
                };
            getBackwaterList(postData).then(res => {
                if (res.success) {
                    console.log(res, "--------");
                    this.today = res.data.today;
                    this.week = res.data.week;
                    this.totalNum = res.data.totalNum;
                    let result = res.data.list;
                    if (this.page === 1) {
                        this.list = result;
                        if (this.totalNum < this.page * this.pageSize) {
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
                    if (t === 1) {
                        this.$toast.text("刷新成功")
                    }
                    this.$nextTick(() => {
                        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
                        // this.paddingTop = this.getPaddingTop();
                    })
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 2000
                    });
                }
            })
        },
        //获取返水金额以及是否能返水
        getBackWaterInfo(t) {
            getBackwaterInfo().then(res => {
                if (res.success) {
                    this.infoData = res.data;
                    if (!t) {
                        this.isShowBackwaterMask = true;
                    }
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 2000
                    });
                }
            });
        },
        //领取返水
        handleBackWater() {
            getBackwaterReceive().then(res => {
                if (res.success) {
                    this.$toast.text("领取成功", {
                        cover: true,
                        duration: 2000
                    });
                    this.getBackWaterInfo();
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 2000
                    });
                }
            })
        },
        //下拉刷新
        handleTopChange (status) {
            this.topStatus = status;
        },
        loadTop () {
            this.page = 1;
            this.hasData = false;
            setTimeout(() => {
                this.getList(1);
                this.$refs.loadmore.onTopLoaded();
                this.allLoaded = false;
            }, 1500);
        },
        //mint-ui 上拉加载
        handleBottomChange (status) {
            this.bottomStatus = status;
        },
        loadBottom () {
            this.page += 1;
            this.hasData = false;
            setTimeout(() => {
                this.getList();
                this.$refs.loadmore.onBottomLoaded();
                if (this.page * this.pageSize >= this.totalNum) {
                    this.allLoaded = true; //所有数据加载完成
                    this.hasData = true;
                    this.topAllLoaded = false;
                }
            }, 1500);
        },
    }
};
</script>

<style lang="scss" scoped>
.no-data {
    padding: 0 0.4rem /* 30/75 */;
    .no-data-box {
        margin-top: 2rem /* 160/75 */;
        text-align: center;
        img{
            margin: 0 auto;
            width: 4.56rem;
	        height: 3.44rem;
        }
        p {
            text-align: center;
            font-size: 0.42667rem /* 32/75 */;
            color: $tabtit-color;
            margin-top: 0.26667rem /* 20/75 */;
        }
        button {
            width: 100%;
            height: 1.06667rem /* 80/75 */;
            line-height: 1.06667rem /* 80/75 */;
            color: $default-color;
            text-align: center;
            border: none;
            border-radius: 0.13333rem /* 10/75 */;
            font-size: 0.37333rem /* 28/75 */;
            background: $tabtit-color;
            box-shadow: 0px 2px 5px 0px rgba($color: $nondefault-color, $alpha: 0.12);
            margin-top: 0.53333rem /* 40/75 */;
            &:active {
                background: $tabtit-color;
            }
        }
    }
}

.content {
    .generalizeLink-list{
        .page-loadmore-wrapper{
            overflow-y: scroll;
            /*解决ios上滑动不流畅*/
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
    .backwater-top {
        position: relative;
        ul {
            background: $nondefault-color;
            display: flex;
            justify-content: space-around;
            text-align: center;
            height: 2.6667rem;
            padding-top: 0.74667rem /* 56/75 */;
            li {
                flex: 1;
                display: flex;
                flex-direction: column;
                h2 {
                    font-size: 0.4rem /* 30/75 */;
                    color: $default-color;
                    font-weight: normal;
                }
                p {
                    margin-top: 0.44rem /* 33/75 */;
                    font-size: 0.48rem /* 36/75 */;
                    color: $tabtit-color;
                }
            }
        }
        .backwater-top-btn {
            position: absolute;
            bottom: -0.53333rem /* 40/75 */;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .look {
                font-size: 0.37333rem /* 28/75 */;
                color: $default-color;
                text-align: center;
                margin-bottom: 0.4rem /* 30/75 */;
            }
            .btn {
                padding: 0;
                display: flex;
                justify-content: space-around;
                button {
                    width: 3.2rem /* 240/75 */;
                    height: 1.06667rem /* 80/75 */;
                    line-height: 1.06667rem /* 80/75 */;
                    font-size: 0.37333rem /* 28/75 */;
                    border-radius: 0.13333rem /* 10/75 */;
                    border: none;
                    background: $tabtit-color;
                    color: $default-color;
                    box-shadow: 0px 2px 5px 0px rgba($color: $nondefault-color, $alpha: 0.12);
                    &:first-child {
                        background-color: $default-color;
                        box-shadow: 0rem 0.0267rem 0.0667rem 0rem rgba($color: $nondefault-color, $alpha: 0.12);
                        border-radius: 0.1333rem;
                        border: solid 0.0267rem $bluebtnlow-color;
                        color: $bluebtnlow-color;
                    }
                    &:last-child {
                        color: $default-color;
                        background-color: $primary-color;
                        box-shadow: 0rem 0.0267rem 0.0667rem 0rem rgba($color: $nondefault-color, $alpha: 0.12);
                        border-radius: 0.1333rem;
                    }
                    &:first-child:disabled {
                        color: $bluebtnlow-color;
                    }
                    &:last-child:disabled {
                        background: $bluebtnlow-color;
                        box-shadow: none;
                        color: $default-color;
                    }
                }
            }
        }
    }
    .backwater-list {
        margin-top: 0.53333rem /* 40/75 */;
        .title {
            line-height: 1.06667rem /* 80/75 */;
            padding-left: 0.4rem /* 30/75 */;
            font-size: 0.42667rem /* 32/75 */;
            color: $text-color;
        }
        .total {
            background: $default-color;
            padding: 0 0.4rem /* 30/75 */;
            height: 1.06667rem /* 80/75 */;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: $onerem solid $border-color;
            p {
                font-size: 0.37333rem /* 28/75 */;
                color: $tip-color;
                span {
                    color: $primary-color;
                    font-weight: bold;
                }
            }
        }
        dl{
            background: $default-color;
            padding: 0 0.4rem /* 30/75 */;
            dt {
                padding: 0.33333rem /* 25/75 */ 0;
                display: flex;
                justify-content: space-between;
                font-size: 0.42667rem /* 32/75 */;
                color: $text-color;
                font-weight: bold;
            }
        }
    }
    .page-loadmore {
        position: fixed;
        top: 8.4rem /* 686/75 */;
        left: 0;
        right: 0;
        ul {
            background: $default-color;
            padding: 0 0.4rem /* 30/75 */;
            li {
                padding: 0.33333rem /* 25/75 */ 0;
                border-top: $onerem solid $border-color;
                h2 {
                    display: flex;
                    justify-content: space-between;
                    color: $text-color;
                    font-size: 0.37333rem /* 28/75 */;
                    font-weight: bold;
                }
                p {
                    display: flex;
                    justify-content: space-between;
                    color: $text-color;
                    margin-top: 0.26667rem /* 20/75 */;
                    font-size: 0.32rem /* 24/75 */;
                }
            }
        }
    }
}
.dialogbox{
    .dialogs{
        .title{
            border-bottom: $onerem solid $border-color;            
        }
        .noData{
            margin: 1rem auto 0;
            p{
                font-size: 0.4rem;
                text-align: center;
            }
        }
        .details-content {
            border-radius: 0 0 .13333rem/* 10/75 */
            .13333rem/* 10/75 */
            ;
            padding: .4rem/* 30/75 */
            ;
            .sub-title {
                font-size: .37333rem/* 28/75 */
                ;
                color: $text-color;
            }
            p {
                margin-top: .4rem/* 30/75 */
                ;
                line-height: .48rem/* 36/75 */
                ;
                color: $tip-color;
                word-break: break-all;
                max-height: 4rem;
                overflow: auto;
            }
            dl {
                dt {
                    display: flex;
                    justify-content: space-between;
                    padding: .33333rem/* 25/75 */
                    0;
                    span {
                        font-size: .42667rem/* 32/75 */
                        ;
                        color: $tip-color;
                        flex: 1;
                        text-align: center;
                        &:first-child {
                            text-align: left;
                        }
                        &:last-child {
                            text-align: right;
                        }
                    }
                }
                .scorll-list {
                    max-height: 6rem/* 450/75 */
                    ;
                    ;
                    overflow: auto;
                    dd {
                        display: flex;
                        justify-content: space-between;
                        padding: .33333rem/* 25/75 */
                        0;
                        span {
                            font-size: .37333rem/* 28/75 */
                            ;
                            color: $tip-color;
                            flex: 1;
                            text-align: center;
                            &:first-child {
                                text-align: left;
                            }
                            &:last-child {
                                text-align: right;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>