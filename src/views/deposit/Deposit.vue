<template>
	<div class="deposit">
        <nut-navbar class="pk-title" @on-click-back="$router.go(-1)" :rightShow="false">选择支付方式</nut-navbar>

		<!-- 文案详情弹框 -->
        <div v-show="isShowCopyWriterMask">
            <div class="copy-writer-details-mask"></div>
            <div class="copy-writer-details-box" @touchmove.prevent>
                <div class="details-title pk-1px-b">
                    <span>文案详情</span>
                    <span @click.stop="isShowCopyWriterMask = false;"><i class="iconfont icon-sykszz-close"></i> </span>
                </div>
                <div class="details-content">
                    <div class="sub-title">{{detitle}}</div>
                    <p v-html="detail"></p>
                </div>
            </div>
		</div>


		<div class="content">
			<!-- 线上存款 -->
			<div v-show="onlineList.length>0" class="pay-list">
				<div class="title">
					<h2>线上存款</h2>
				</div>
				<ul>
					<li v-for="(item,index) in onlineList" :key="index" @click="goOnlineDeposit(item)"
						:class="{'pk-1px-b':index === onlineList.length-1}">
						<div class="left company-icon">
							<img :src="cdnUrl+'/online/'+item.payType+'.png'" alt="">
							<!--<i class="iconfont" :class="item.icon" :style="{'color':item.color}"></i>-->
						</div>
						<div class="right" :class="{'pk-1px-b':index != onlineList.length-1}">
							<div class="desc">
								<div>
									<h2>{{item.payName}}</h2>
									<p class="text-dots">存款区间{{item.depositMin}}~{{item.depositMax}}</p>
								</div>
								<a v-show="item.content" class="details-btn" @click.stop="deMore(item,1)">存款信息</a>
							</div>
							<i class="iconfont icon-list-more"></i>
						</div>
					</li>

					<div @click="speardMore()" v-show="isShowMoreWayBtn" class="more-payType">
						<span>{{more?'收起':'更多'}}支付方式</span>
						<i class="iconfont icon-wallet-more"></i>
					</div>

				</ul>
			</div>

			<!-- 公司存款 -->
			<div v-show="companyList.length>0" class="pay-list">
				<div class="title">
					<h2>公司存款</h2>
				</div>
				<ul>
					<li v-for="(item,index) in companyList" :key="index" @click="goCompanyDeposit(item)"
						:class="{'pk-1px-b':index === companyList.length-1}">
						<div class="left company-icon">
							<!-- <i class="iconfont icon-qb-tongyong1"></i> -->
							<img :src="cdnUrl+'/'+item.bankId+'.png'" alt="">
						</div>
						<div class="right" :class="{'pk-1px-b':index != companyList.length-1}">
							<div class="desc">
								<div>
									<h2>{{item.bankName}}{{item.bankAddress}}</h2>
									<p v-show="item.bankNum" class="text-dots">账号：{{item.bankNum}}</p>
								</div>
								<a v-show="item.content" class="details-btn" @click.stop="deMore(item,2)">存款信息</a>
							</div>
							<i class="iconfont icon-list-more"></i>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div v-show="companyList.length<1 && onlineList.length<1" class="noContent">
			<div class="noContent-box">
				<i class="iconfont icon-qb-zwzhifufs"></i>
				<h2>暂无支付方式</h2>
				<p>请<a>联系客服添加</a></p>
			</div>
		</div>

	</div>
</template>

<script>
    import func from '@/services/deposit'

    export default {
        name: "deposit",
        data () {
            return {
                cdnUrl: "",
                detitle: '',
                detail: '',
                isShowMoreWayBtn: false,
                more: false,
                isShowCopyWriterMask: false,
                onlineList: [],
                onlineListMore: [],
                companyList: [],
                imgUrlArr: [{
                    payType: 1,
                    payName: "网银",
                    icon: 'icon-qb-wangyin',
                    color: '#4cd964'
                },
                    {
                        payType: 2,
                        payName: "微信",
                        icon: 'icon-qb-weixin',
                        color: '#62b900'

                    },
                    {
                        payType: 3,
                        payName: "支付宝",
                        icon: 'icon-qb-zhifubao',
                        color: '#00b7ee'
                    },
                    {
                        payType: 10,
                        payName: "点卡支付",
                        icon: 'icon-qb-dianka',
                        color: '#ff6057'
                    },
                ],
            };
        },
        mounted () {
            this.getOnlineCompanyList();
        },
        methods: {
            getOnlineCompanyList() {
                let loading = this.$toast.loading();
                func.getOnlineCompanyList().then((res) => {
                    loading.hide();
                    if(res.success){
                        this.cdnUrl = res.data.cdnUrl;
                        this.companyList = res.data.companyBankList;
                        this.onlineListMore = res.data.onlinePayItemList;
                        this.onlineListMore.map((v, i) => {
                            this.imgUrlArr.map((v2) => {
                                if (v.payType === v2.payType) {
                                    this.onlineListMore[i]['icon'] = v2.icon;
                                    this.onlineListMore[i]['color'] = v2.color;
                                }
                            })
                        })
                        this.isShowMoreWayBtn = this.onlineListMore.length > 5;
                        this.onlineList = this.onlineListMore.slice(0, 5);
                    }else {
                        this.$toast.fail(res.message,{cover:true,duration:4000});
                    }
                })
            },
            //展开收起-线上存款更多支付方式
            speardMore () {
                this.more = !this.more;
                if (this.more) {
                    this.onlineList = this.onlineListMore;
                } else {
                    this.onlineList = this.onlineListMore.slice(0, 5);
                }
            },

            //存款文案详情
            deMore (item, type) {
                this.isShowCopyWriterMask = true;
                if (type === 1) {//线上存款
                    this.detail = item.content;
                    this.detitle = item.payIdName + '-' + item.payName;
                } else {//公司存款
                    this.detail = item.content;
                    this.detitle = item.bankName + '-' + item.bankAddress;
                }
            },

            goOnlineDeposit (item) {
                let name = '';
                switch (item.payType) {
                    case 1: //网银
                    case 2://微信
                    case 3://支付宝
                        name = 'online'
                        break;
                }
                this.$router.push({name:name,query: {id:item.id}});
            },

            goCompanyDeposit (item) {
                // item.payType 1=无二维码 2=有二维码
                this.$router.push({name: 'company',query: {id: item.id},});
            }
        },
        watch: {
            isShowCopyWriterMask (newVal, oldVal) {
                if (newVal) {
                    this.ModalHelper.open();
                } else {
                    this.ModalHelper.close();
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
	// 无内容样式
	.noContent {
		padding-top: 1.22667rem /* 92/75 */;
		.noContent-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 2.13333rem /* 160/75 */;
			text-align: center;
			i {
				font-size: 2.66667rem /* 200/75 */;
				color: $primary-color;
				opacity: 0.6;
			}

			h2 {
				color: $primary-color;
				font-size: .48rem /* 36/75 */;
				margin: .4rem /* 30/75 */ 0;
			}
			p {
				color: $primary-color;
				font-size: .4rem /* 30/75 */;
				a {
					text-decoration: underline;
				}
			}
		}
	}

	.content {
		.pay-list {
			margin-top: 0.26667rem /* 20/75 */;
			.title {
				font-size: 0;
				padding: 0 0.4rem /* 30/75 */;
				h2 {
					font-size: 0.42667rem /* 32/75 */;
					color: $color-C;
					font-weight: normal;
				}
				p {
					font-size: 0.32rem /* 24/75 */;
					color: $color-J;
					margin-top: 0.2rem /* 15/75 */;
					width: 7.92rem /* 594/75 */;
					display: inline-block;
				}
				a {
					font-size: 0.32rem /* 24/75 */;
					color: $color-w;
					text-decoration: underline;
					vertical-align: bottom;
				}
			}
			ul {
				.more-payType {
					padding-top: .26667rem /* 20/75 */;
					background-color: $default-color;
					text-align: center;
					position: relative;
					height: 1.06667rem /* 80/75 */;
					span {
						display: block;
						font-size: .32rem /* 24/75 */;
						color: $color-w;
						margin-top: .13333rem /* 10/75 */;
					}
					i {
						font-size: 1.06667rem /* 80/75 */;
						color: $color-w;
						opacity: 0.6;
						display: block;
						position: absolute;
						left: 50%;
						transform: translate(-50%);
						bottom: -0.2rem;
					}

				}
				li {
					background-color: $default-color;
					display: flex;
					&:active {
						background: $color-rgab-b2;
					}
					.left {
						flex: 1;
						padding: 0.27rem /* 20/75 */ 0.4rem /* 30/75 */;
						display: flex;
						justify-content: center;
						align-self: center;
						i {
							font-size: .8rem /* 60/75 */;
							color: $color-a;
						}
						&.company-icon {
							img {
								width: 0.80rem; /* 60/75 */
								height: 0.80rem; /* 60/75 */
								display: block;
							}
						}
					}
					.right {
						flex: 10;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0.27rem /* 20/75 */ 0;
						padding-right: 0.4rem /* 30/75 */;
						.desc {
							display: flex;
							align-items: center;
							width: 100%;
							padding-right: 30px;
							justify-content: space-between;
							.details-btn {
								height: 0.53rem; /* 40/75 */;
								line-height: 0.53rem; /* 40/75 */;
								font-size: 0.27rem /* 20/75 */;
								border-radius: 0.08rem; /* 6/75 */;
								padding: 0 0.13rem /* 10/75 */;
								color: $primary-color;
								text-align: center;
								border: 1px solid $primary-color;
							}
							h2 {
								font-size: 0.37333rem /* 28/75 */;
								color: $color-C;
								font-weight: normal;
							}
							p {
								font-size: 0.32rem /* 24/75 */;
								color: $color-J;
								margin-top: 0.13rem /* 10/75 */;;
								/*width: 6.30667rem !* 473/75 *!;*/
								display: inline-block;
								a {
									font-size: .37333rem /* 28/75 */;
									text-decoration: none;
									color: $color-J;
									margin-right: .4rem /* 30/75 */;
									b {
										letter-spacing: 1em;
										font-weight: normal;
									}
								}
								span {
									font-size: .37333rem /* 28/75 */;
									color: $color-C;
									a {
										color: $color-C;
									}
								}
							}

						}
						.iconfont {
							font-size: 0.32rem /* 24/75 */;
							color: $color-K;
						}
					}
					&:last-child {
						.right {
							border-bottom: none;
						}
					}
				}
				&:nth-child(n+1) {
					margin-top: 0.26667rem /* 20/75 */;
				}
			}
		}
	}
</style>


