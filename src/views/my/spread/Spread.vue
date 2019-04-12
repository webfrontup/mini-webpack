

<template>
	<div class="spread" ref="spread">
		<nut-navbar class="info-header" @on-click-back="$router.go(-1)">
			我要推广
			<a class="spans" slot="back-icon">
				<img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png">
			</a>
			<a class="spansright" slot="more-icon">
				<img class="imgsbank" src="../../../assets/img/zhuye.png">
			</a>
		</nut-navbar>
		<div class="topSpread">
			<div class="spreadbox">
				<div class="toptitle">
					<hr class="hr">
					<p class="ps">推广越多，返佣越多!</p>
                </div>
				<div v-show="info.retreatAllMember != 0 || info.retreatAllMoney !=0 " class="contentp">
					您已推广
					<span class="levelBlue">{{info.retreatAllMember}}</span>人，
					<br>累计获得
					<span class="levelBlue">{{info.retreatAllMoney}}</span>元返佣！
				</div>
                
                <div v-show="info.retreatAllMember === 0 && info.retreatAllMoney === 0" class="no-data-box">
                    <i class="iconfont icon-list-zanwusj"></i>
                    <span>您暂时还未获得返佣哦~</span>
                </div>


				<div class="btn-spread" @click="back('generalizeLink')">我要推广</div>
			</div>
		</div>
		<div class="botSpread">
			<ul class="mgb20">
				<li class="pk-1px-t" @click="back('statisics')">
					<div class="lileft">
						<i>
							<img src="../../../assets/img/tongji.png">
						</i>
						<p class="pk-1px-b">推广统计</p>
					</div>
					<div class="liright">
						<img :src="leftSrc">
					</div>
				</li>
				<li class="pk-1px-b" @click="back('subordinate')">
					<div class="lileft">
						<i>
							<img src="../../../assets/img/xiajibaobiao.png">
						</i>
						<p>下级报表</p>
					</div>
					<div class="liright">
						<img :src="leftSrc">
					</div>
				</li>
			</ul>
			<ul class="mgb20">
				<li class="pk-1px-t" @click="back('generalizeLink')">
					<div class="lileft">
						<i>
							<img src="../../../assets/img/lianjie.png">
						</i>
						<p class="pk-1px-b">推广链接</p>
					</div>
					<div class="liright">
						<img :src="leftSrc">
					</div>
				</li>
				<li class="pk-1px-b" @click="back('memberManagement')">
					<div class="lileft">
						<i>
							<img src="../../../assets/img/chengyuan.png">
						</i>
						<p>下级会员管理</p>
					</div>
					<div class="liright">
						<img :src="leftSrc">
					</div>
				</li>
			</ul>
			<ul>
				<li class="pk-1px-t pk-1px-b" @click="back('promote')">
					<div class="lileft">
						<i>
							<img src="../../../assets/img/tuiguang.png">
						</i>
						<p>推广说明</p>
					</div>
					<div class="liright">
						<img :src="leftSrc">
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {getUserInfo} from '@/services/about'
export default {
	data() {
		return {
            info:{
                retreatAllMember:0,
                retreatAllMoney:0
            },
			leftSrc:
				"data:image/svg+xml,%3Csvg viewBox='0 0 5 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.215 9.757l3.577-4.17a.931.931 0 0 0 0-1.173L1.215.244a.642.642 0 0 0-1.007 0 .929.929 0 0 0 0 1.172L3.283 5 .208 8.584a.93.93 0 0 0 0 1.173.643.643 0 0 0 1.007 0z' fill='rgb(200,200,205)'/%3E%3C/svg%3E"
		};
	},
	mounted() {
        this.$refs.spread.style.height = window.innerHeight + "px";
        this.getUserInfo();
	},
	methods: {
		back(path) {
			this.$router.push({
				name: path
			});
        },
         //获取推广信息
            getUserInfo(){
                let loading = this.$toast.loading('加载中...');
                getUserInfo().then(res => {
                    loading.hide();
                    if(res.success){
                        this.info = res.data.user;
                    }else {
                        this.$toast.fail(res.message,{cover:true,duration:4000});
                    }
                })
                
			},
	}
};
</script>

<style lang="scss" scoped>
	@import "../../../components/scss/pk-pwd.scss";
	.spread {
		background: #fff;
		.levelBlue {
			color: $prompt-blue;
			font-size: 0.48rem /* 36/75 */;
		}
		.spansright {
			.imgsbank {
				position: absolute;
				width: 0.58667rem /* 44/75 */;
                top: .24rem /* 18/75 */;
                right: .2rem /* 15/75 */;
			}
		}
		.topSpread {
			background-image: linear-gradient(#252232, #252232),
				linear-gradient(#f2f4fa, #f2f4fa);
			background-blend-mode: normal, normal;
			height: 2.66667rem /* 200/75 */;
			position: relative;
			.spreadbox {
				position: absolute;
				width: 9.2rem /* 690/75 */;
				height: 4.58667rem /* 344/75 */;
				z-index: 10;
				top: 0.4rem /* 30/75 */;
				left: 0.4rem;
				background-color: #f2f2f2;
				box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.06);
				border-radius: 10px;
				display: flex;
				align-items: center;
				justify-content: space-around;
				flex-direction: column;
				.toptitle {
					height: 0.32rem /* 24/75 */;
					padding-top: 0.18rem;
					position: relative;
					.hr {
						width: 7.06667rem /* 530/75 */;
						height: 1px;
						background-color: #c8c8cc;
					}
					.ps {
						position: absolute;
						top: 0;
						width: 3.77333rem /* 283/75 */;
						color: #323233;
						background-color: #f2f2f2;
						text-align: center;
						font-size: 0.32rem /* 24/75 */;
						left: 1.86667rem /* 140/75 */;
					}
				}
				.contentp {
					font-size: 0.37333rem /* 28/75 */;
					text-align: center;
					.imgs {
						display: block;
						width: 2.13333rem /* 160/75 */;
						height: 1.92rem /* 144/75 */;
					}
				}
				.contentmsg {
					display: flex;
					flex-direction: column;
					align-items: center;
					p {
						font-size: 0.26667rem /* 20/75 */;
					}
				}
				.btn-spread {
					width: 7.06667rem /* 530/75 */;
					height: 1.06667rem /* 80/75 */;
					background-color: #3a74d2;
					box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
					border-radius: 0.13333rem /* 10/75 */;
					color: #ffffff;
					font-size: 0.37333rem /* 28/75 */;
					text-align: center;
					line-height: 1.06667rem /* 80/75 */;
				}
			}
		}
		.botSpread {
			margin-top: 2.72rem /* 204/75 */;
			ul {
				background: #f2f2f2;
				li {
					border: none;
					padding-left: 1.2rem /* 90/75 */;
					background-color: #f2f2f2;
					box-shadow: 0px 1px 0px 0px #c8c8cc, 0px -1px 0px 0px #c8c8cc;
					position: relative;
					height: 1.06667rem /* 80/75 */;
					line-height: 1.06667rem /* 80/75 */;
                    font-size: 0.42667rem /* 32/75 */;
                    box-shadow: none;
					.lileft {
						position: relative;
						color: #323233;
						p {
							padding-right: 0.74667rem /* 56/75 */;
							position: relative;
						}
						i {
							width: 0.53333rem /* 40/75 */;
							height: 0.53333rem /* 40/75 */;
							position: absolute;
							left: -0.8rem /* 60/75 */;
							top: 0.26667rem /* 20/75 */;
							img {
								width: 100%;
								display: block;
							}
						}
					}
					.liright {
						img {
							position: absolute;
							right: 0.45333rem /* 34/75 */;
							top: 0.36rem /* 27/75 */;
							width: 0.18667rem /* 14/75 */;
						}
					}
				}
			}
		}
    }
    
    .no-data-box {
        text-align: center;
        i {
            font-size:1.07rem;
            color: $primary-color;
            opacity: .6;
        }
        span {
            display: block;
            text-align: center;
            font-size: .26667rem /* 20/75 */;
            color: $primary-color;
            margin-top: .26667rem /* 20/75 */;
        }
    }
    
</style>
<style lang="scss">
	.nut-cell .nut-cell-title,
	.nut-cell .nut-cell-right {
		font-size: 0.34667rem /* 26/75 */;
	}
	.nut-cell .nut-cell-icon img {
		height: 0.33333rem; /* 25/75 */
	}
</style>
