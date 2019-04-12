<template>
	<div class="my" ref="my">
		<div class="topmy">
			<nut-navbar class="info-header" :leftShow="false" @on-click-more="more('index')">
				我的
				<a class="spansright" slot="more-icon">
					<img class="imgsbank" src="../../assets/img/zhuye.png">
				</a>
			</nut-navbar>
			<div class="info">
				<div class="makemid">
					<img src="../../assets/img/my-icon/icon_visitor@3x.png" alt="tupian" class="src">
					<p class="name">{{userinfo.account}}</p>
					<p class="times">本次登录时间{{userinfo.lastLoginTime | filterDate}}</p>
				</div>
			</div>
		</div>
		<div class="content_container">
			<ul class="pk-my-ul">
				<li class="lis">
					<div class="total_asset md-6 bdr">
						<i>￥{{userinfo.totalBalance}}</i>
						<span>总资产</span>
					</div>
					<div class="total_asset md-6">
						<i>￥{{userinfo.gameBalance}}</i>
						<span>钱包余额</span>
					</div>
				</li>
				<li class="lis mgb2 pk-list">
					<div class="total_asset bdr iconpfn md-6" @click="goPath('deposit')">
						<i>
							<img src="../../assets/img/my-icon/my_ico_1.png" alt>
						</i>
						<span class="spans">充值</span>
					</div>
					<div class="total_asset iconpfn md-6" @click="goPath('withdraw')">
						<i>
							<img src="../../assets/img/my-icon/my_ico_2.png" alt>
						</i>
						<span class="spans">提现</span>
					</div>
				</li>
				<li class="lis pk-list">
					<div class="total_asset bdr iconpfn md-6" @click="goPath('transfer')">
						<i>
							<img src="../../assets/img/my-icon/my_ico_11.png" alt>
						</i>
						<span class="spans">额度转换</span>
					</div>
					<div class="total_asset iconpfn md-6" @click="goPath('auditQuery')">
						<i>
							<img src="../../assets/img/my-icon/my_ico_12.png" alt>
						</i>
						<span class="spans">即时稽核查询</span>
					</div>
				</li>
				<li class="lis fakes">
					<div class="total_asset iconpfn md-6" @click="goPath('about')">
						<i>
							<img src="../../assets/img/my-icon/my_ico_13.png" alt>
						</i>
						<div class="divspans">
							<div>账号信息</div>
							<p>查看和编辑个人资料</p>
						</div>
					</div>
					<div class="total_asset iconpfn md-6" @click="goPath('betRecord')">
						<i>
							<img src="../../assets/img/my-icon/my_ico_3.png" alt>
						</i>
						<div class="divspans">
							<div>投注记录</div>
							<p>查看所有参与的游戏记录</p>
						</div>
					</div>
					<router-link to="/agencyappli" tag="div" class="total_asset iconpfn md-6" v-show="switchList.isAgencyReg">
						<i>
							<img src="../../assets/img/my-icon/dailishenq.png" alt>
						</i>
						<div class="divspans">
							<div>代理申请</div>
							<p>申请成为代理</p>
						</div>
					</router-link>
					<router-link to="/capitalrecord" tag="div" class="total_asset iconpfn md-6">
						<i>
							<img src="../../assets/img/my-icon/my_ico_5.png" alt>
						</i>
						<div class="divspans">
							<div>资金记录</div>
							<p>查看所有资金来往记录</p>
						</div>
					</router-link>
					<router-link to="/backwater" tag="div" class="total_asset iconpfn md-6" v-show="switchList.isWaterSelf">
						<i>
							<img src="../../assets/img/my-icon/jinrifanshuijilu.png" alt>
						</i>
						<div class="divspans">
							<div>自助返水</div>
							<p>投注即得返水奖励</p>
						</div>
					</router-link>
					<div class="total_asset iconpfn md-6" @click="goPath('securityCenter')">
						<i>
							<img src="../../assets/img/my-icon/my_ico_7.png" alt>
						</i>
						<div class="divspans">
							<div>安全中心</div>
							<p>保护您的账号安全</p>
						</div>
					</div>
					<router-link to="/selfHelp" tag="div" class="total_asset iconpfn md-6" v-show="switchList.isOfferSelf">
						<i>
							<img src="../../assets/img/my-icon/my_ico_6.png" alt>
						</i>
						<div class="divspans">
							<div>自助优惠申请</div>
							<p>所有申请优惠与优惠记录</p>
						</div>
					</router-link>
					<div class="total_asset iconpfn md-6" @click="goPath('spread')" v-show="switchList.isSpread">
						<i>
							<img src="../../assets/img/my-icon/my_ico_15.png" alt>
						</i>
						<div class="divspans">
							<div>推广返佣</div>
							<p>查看团队信息</p>
						</div>
					</div>
				</li>
				<li class="lis">
					<div class="total_asset iconpfn md-6" @click="goPath('msgCenter')">
						<i>
							<img src="../../assets/img/my-icon/my_ico_8.png" alt>
						</i>
						<div class="divspans">
							<div>消息中心</div>
							<p>查看历史消息内容</p>
						</div>
					</div>
					<router-link to="/more" tag="div" class="total_asset iconpfn md-6">
						<i>
							<img src="../../assets/img/my-icon/my_ico_14.png" alt>
						</i>
						<div class="divspans">
							<div>更多</div>
							<p>保护你的账号安全</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { getInfo } from "../../services/auth.js";
export default {
	data() {
		return {
			userinfo:{
				account:"",
				lastLoginTime:"",
				totalBalance:"",
				gameBalance:"",
			},
			switchList:{
				isSpread: true, //是否开启会员推广
				isAgencyReg: true,   //是否开启代理注册
				isOfferSelf: true,  //是否开启自助优惠
				isWaterSelf: true, //是否开启自助返水
			}
		};
	},
	mounted() {
		this.hasHeight();
		this.getMyInfo();
	},
	methods: {
		hasHeight() {
			this.$refs.my.style.height = window.innerHeight + "px";
		},
		more(path) {
			this.$router.push({
				name: path
			});
		},
		goPath(path) {
			this.$router.push({
				name: path
			});
		},
		getMyInfo(){
            getInfo().then(res => {
				if (res.success) {
					console.log(res);
					this.userinfo = res.data.user;
					this.switchList = res.data.switch

				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 1500
					});
				}
			});
		},
		
	}
};
</script>
<style lang="scss" scoped>
	.my {
		background: #dedede;
		margin-top: -1.22667rem;
		.topmy {
			height: 5.14667rem /* 386/75 */;
			width: 100%;
			background: url("../../assets/img/mybg.png") no-repeat 0 center;
			background-size: cover;
			background-position: 0 0;
			.info-header {
				height: 1.22667rem /* 92/75 */;
				padding: 0 0.4rem /* 30/75 */;
				padding-left: 0;
				line-height: 1.22667rem /* 92/75 */;
				font-size: 0.48rem;
				background: none;
				background-size: cover;
				color: #fff;
				.spans {
					font-size: 0.48rem;
				}
			}
			.info {
				height: 3.6rem /* 270/75 */;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				padding-top: 1.22667rem /* 92/75 */;
				.makemid {
					text-align: center;
					img {
						height: 1.38667rem /* 104/75 */;
						width: 1.38667rem /* 104/75 */;
					}
					.name {
						color: #333;
						font-size: 0.37333rem /* 28/75 */;
					}
					.times {
						color: #666;
						font-size: 0.32rem /* 24/75 */;
						font-weight: 600;
					}
				}
			}
		}
	}

	.content_container {
		position: relative;
		height: auto;
		width: 100%;
		padding: 0 2.5%;
	}

	.pk-my-ul {
		width: 95%;
		position: fixed;
		top: 4.5rem;
		z-index: 100;
		background-color: transparent;
		overflow: scroll;
		.bdr0 {
			border-radius: 0 !important;
		}

		.mgb2 {
			margin-bottom: 0.01333rem /* 1/75 */ !important;

		}
		.fakebot {
			border-radius: 0 0 0.13333rem 0.13333rem !important;
		}
		.fakes {
			border-radius: 0.13333rem !important;
			flex-flow: row wrap;
			align-content: flex-start;
			justify-content: flex-start !important;
			.total_asset{
				margin-bottom: .02rem /* 1.5/75 */ !important;
				flex: 0 0 50%;
				box-sizing: border-box;
				padding: .2rem /* 15/75 */ /* 10/75 */ 0;
				
			}
		}

		.fake {
			border-radius: 0 !important;
			margin-bottom: 0.01333rem /* 1/75 */ !important;
		}
		.lis {
			cursor: pointer;
			height: auto;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			border-radius: 0.13333rem /* 10/75 */;
			padding: 0.14667rem /* 11/75 */ 0;
			margin-bottom: 0.26667rem /* 20/75 */;
			text-align: center;
			.md-6 {
				width: 50%;
			}
			.bdr {
				border-right: 0.02667rem /* 2/75 */ solid #f2f4f3;
			}
			.total_asset {
				display: flex;
				flex-direction: column;
				align-items: center;
				i {
					font-style: normal;
					color: #2ba6fe;
					font-size: 0.48rem /* 36/75 */;
				}

				span {
					color: #333;
					font-size: 0.32rem /* 24/75 */;
					&.spans {
						font-size: 0.37333rem /* 28/75 */;
					}
				}
				.divspans {
					padding-left: 0.2rem /* 15/75 */;
					font-size: 0.37333rem /* 28/75 */;
					color: #141414;
					text-align: left;
					p {
						font-size: 0.28rem;
						color: #999;
					}
				}
			}
			.iconpfn {
				flex-direction: row;
				padding-left: 0.2rem /* 30/75 */;
				i {
					width: 0.93333rem /* 70/75 */;
					height: 0.93333rem /* 70/75 */;
					img {
						width: 100%;
					}
				}
				span {
					margin-left: 0.4rem /* 30/75 */;
				}
			}
			.text-lefts {
				text-align: left;
				width: 100%;
			}
		}
		.pk-list{
			.total_asset{
				i{
					margin-left: .26667rem /* 20/75 */
				}
			}
		}
	}
	@import "../../components/scss/pk-pwd.scss";
	.info-header {
		.spans {
			position: relative;
			img {
				position: absolute;
				left: 0.4rem /* 30/75 */;
				top: 0.13333rem /* 10/75 */ /* 10/75 */;
			}
		}
	}
	.spans {
		.imgsbank {
			left: 0.26667rem /* 20/75 */ !important;
			width: 0.46667rem /* 35/75 */;
		}
	}
	.spansright,.spansleft {
		position: absolute;
		right: 0.66667rem /* 50/75 */;
		top: 0.2rem /* 15/75 */;
		.imgsbank {
			width: .6rem /* 45/75 */;
		}
	}
</style>