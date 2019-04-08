<template>
	<div class="activityRecord">
		<nut-navbar class="pk-title"
		:rightShow="false"
        @on-click-back="$router.go(-1)">
            活动领取记录
        </nut-navbar>
		<div  class="content">
			<div v-show="list!=null" class="content-fixed">
				<div class="title">
					最近一个月累计领取了{{totalMoney}}元活动奖励
				</div>
				<div class="list">
					<dl>
						<dt class="pk-1px-b">
							<span>活动名称</span>
							<span>领取金额</span>
						</dt>
					</dl>
				</div>
			</div>
			<!--列表数据展示 -start -->
			<!--paddingTop 用来动态计算上面层级高度，这里是可以动态改变滴-->
			<div class="generalizeLink-list" :style="{paddingTop:paddingTop+'rem'}">

				<div v-show="list != null" class="page-loadmore">
				<!-- :style="{ height: wrapperHeight + 'px' }" -->
					<div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px'}" ref="wrapper">
						<pk-loadmore :top-method="loadTop" :bottom-method="loadBottom" 
						:bottom-all-loaded="allLoaded" :top-all-loaded="topAllLoaded" 
						@top-status-change="handleTopChange" 
						@bottom-status-change="handleBottomChange" ref="loadmore" 
						:stop-translate="stopTranslate">
							<ul>
								<li :class="{'pk-1px-b':index!=list.length-1}" v-for="(item,index) in list" :key="index">
									<h2>
										<span>{{item.activityName}}</span>
										<span>{{item.payMoney}}</span>

									</h2>
									<p>
										<span>{{item.applyTime | filterDate}}</span>
									</p>
								</li>
							</ul>
							<div class="noMoredata" v-show="hasData">我是有底线的</div>
						</pk-loadmore>
					</div>
				</div>

				<div v-show="list==null" class="noData">
					<img src="../../assets/img/bet-record-no-data.png">
					<p>暂无领取记录</p>
				</div>
			</div>
			<!--列表数据展示 -end -->
		</div>
	</div>
</template>

<script>
	import {
        getActivityInfo
	} from "@/services/moneyRecord.js";
    import pkLoadmore from '@/components/Loadmore';	
    export default {
		name: "activityRecord",
		components: {
            pkLoadmore
        },
        data () {
            return {
                stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
                allLoaded: false,
                topAllLoaded: false,
                topStatus: '',
                bottomStatus: '',
                wrapperHeight: 0,
				paddingTop:this.getPaddingTop(),
                page: 1, //当前页数
                pageSize: 10, //每页请求的条数
                totalNum: 0, //总页数
                list: null,
                hasData: false,
                totalMoney:0,

            }
        },
		mounted(){
			this.getList();
			this.paddingTop = this.getPaddingTop();
		},
        methods: {
			//动态计算 层级哪里的高度
            getPaddingTop(){
                //92是header的固定高度
				return (this.$(".content-fixed").height()+92) / 75;
				console.log(this.$(".content-fixed").height())
			},
            getList (t) {
                let postData = {
                        page: this.page,
                        pageSize: this.pageSize,
					}
                getActivityInfo(postData).then((res) => {
					if (res.success) {
						let result = [];
						this.totalNum = res.data.totalCount;
						result = res.data.list;
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
							this.$toast.text('刷新成功');
						}
						this.$nextTick(() => {
                            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
							this.paddingTop = this.getPaddingTop();
						})
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
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
    }
</script>


<style lang="scss" scoped>
	.no-data {
		padding: 0 .4rem /* 30/75 */;
		position: fixed;
		top: 1.22667rem /* 92/75 */;
		left: 0;
		right: 0;
		.no-data-box {
			margin-top: 2.13333rem /* 160/75 */;
			text-align: center;
			i {
				font-size: 2.53333rem /* 190/75 */;
				color: $default-color;
				opacity: .6;
			}
			p {
				text-align: center;
				font-size: .42667rem /* 32/75 */;
				color: $default-color;
				margin-top: .26667rem /* 20/75 */;
			}
			button {
				width: 100%;
				height: 1.06667rem /* 80/75 */;
				line-height: 1.06667rem /* 80/75 */;
				color: $text-color;
				text-align: center;
				border: none;
				border-radius: .13333rem /* 10/75 */;
				font-size: .37333rem /* 28/75 */;
				background: $default-color;
				box-shadow: 0px 2px 5px 0px rgba($color: $nondefault-color, $alpha: 0.12);
				margin-top: .53333rem /* 40/75 */;
				&:active {
					background: $text-color;
				}
			}
			button.look {
				margin-top: .4rem /* 30/75 */;
				background: $text-color;
				border: 1px solid $text-color;
				color: $text-color;
			}
		}
	}

	.content {
		.content-fixed {
			position: fixed;
			width: 100%;
			top: 1.22667rem /* 92/75 */;
			left: 0;
			right: 0;
			z-index: 1;
		}
		.title {
			display: flex;
			align-items: center;
			height: 1.06667rem /* 80/75 */;
			background: $default-color;
			padding-left: .4rem /* 30/75 */;
			p {
				display: inline-block;
				span {
					font-size: .37333rem /* 28/75 */;
					color: $text-color;
				}
				button {
					margin-left: .13333rem /* 10/75 */;
					color: $text-color;
					border: 1px solid $border-color;
					padding: .08rem /* 6/75 */ .26667rem /* 20/75 */;
					background: $text-color;
					border-radius: .13333rem /* 10/75 */;
					font-size: .32rem /* 24/75 */;
				}
				&:last-child {
					margin-left: .57333rem /* 43/75 */;
					button {
						padding: .08rem /* 6/75 */ .6rem /* 45/75 */;
					}
				}
			}
		}
		.list {
			margin-top: .26667rem /* 20/75 */;
			dl {
				padding: 0 .4rem /* 30/75 */;
				background: $default-color;
				dt {
					display: flex;
					justify-content: space-between;
					padding: .32rem /* 24/75 */ 0;
					span {
						font-size: .42667rem /* 32/75 */;
						color: $text-color;
					}
				}
			}
		}
		.page-loadmore {
			position: fixed;
			top: 3.62667rem /* 272/75 */;
			left: 0;
			right: 0;
			.page-loadmore-wrapper{
				overflow-y: scroll;
				/*解决ios上滑动不流畅*/
        		-webkit-overflow-scrolling: touch;
				&::-webkit-scrollbar {
					display: none;
				}
			}
			ul {
				background: $default-color;
				padding: 0 .4rem /* 30/75 */;
				li {
					padding: .33333rem /* 25/75 */ 0;
					h2 {
						display: flex;
						justify-content: space-between;
						span {
							font-size: .37333rem /* 28/75 */;
							color: $text-color;
							&.inHand {
								color: $text-color;
							}
							&.success {
								color: $text-color;
							}
							&.fail {
								color: $text-color;
							}
						}
					}
					p {
						margin-top: $tenrem;
						display: flex;
						justify-content: space-between;
						span {
							font-size: .32rem /* 24/75 */;
							color: $text-color;
						}
					}
				}
			}
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: $text-color;
		opacity: .4;
		z-index: 2;
	}

	.mask-box {
		position: fixed;
		z-index: 3;
		top: 50%;
		transform: translateY(-50%);
		padding: 0 .4rem /* 30/75 */;
		width: 92%;
		opacity: 1;
		ul {
			background: $text-color;
			border-radius: .13333rem /* 10/75 */ .13333rem /* 10/75 */ 0 0;
			padding: .4rem /* 30/75 */;
			max-height: 6rem /* 450/75 */;
			overflow: auto;
			li {
				font-size: .37333rem /* 28/75 */;
				color: $text-color;
				line-height: 1.5;
				display: flex;
				justify-content: space-between;
				span {
					flex: 7.5;
					&:first-child {
						flex: 2.5;
						text-align: right;
					}
				}
			}
		}
		.close {
			background: $text-color;
			border-radius: 0 0 .13333rem /* 10/75 */ .13333rem /* 10/75 */;
			line-height: 1.06667rem /* 80/75 */;
			text-align: center;
			color: $text-color;
			font-size: .32rem /* 24/75 */;
		}
	}
.noData{
	padding: 1rem 0;
	margin: 1rem auto;
	p{
		font-size: 0.4rem;
		text-align: center;
	}
}
</style>
