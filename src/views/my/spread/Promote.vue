<template>
	<div class="promote">
		<nut-navbar class="info-header" @on-click-back="$router.go(-1)">
			推广说明
			<a class="spans" slot="back-icon">
				<img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png">
			</a>
			<a class="spansright" slot="more-icon">
				<img class="imgsbank" src="../../../assets/img/zhuye.png">
			</a>
		</nut-navbar>
		<div class="imgs">
			<img src="../../../assets/img/image-tgsm-banner.png" alt>
		</div>
		<div class="instruct mgb22">
			<h2>
				推广说明
				<i></i>
			</h2>
			<p>
				通过分享推广，您可以获得下级会员投注和玩游戏之后的佣金返
				点，分享推广的会员越多，佣金越多！下级会员再次推广的下级
				会员，一样可以为您贡献佣金，无限级推广！
				可为下级会员设置彩票投注的返佣比例，合理分配，保证无限级
				模式的良性发展。
			</p>
		</div>
		<div class="instruct mgb22">
			<h2>
				F&Q
				<i></i>
			</h2>
			<div class="list-ul">
				<h3>·返佣比例怎么计算的?</h3>
				<p class="ps">
					上级可以设置下级的彩票投注返佣比例，假设A推广了B，B推
					广了C，A给B设置比例为10%，B给C设置比例为6%，那么C投注
					后，B获得6%返佣，A获得(10%-6%)的返佣。其他五大类的返佣
					根据报表计算得出。
				</p>
				<h3>·彩票和其他五大类游戏返佣有区别吗？</h3>
				<p class="ps">
					彩票是根据下级会员的投注额进行返佣，不考虑实际胜负；其他
					五大类根据盈利情况进行一定比例的返佣；
				</p>
				<h3>·返佣是实时到账吗？</h3>
				<p class="ps">彩票投注的返佣是实时到账的，报表盈利的返佣将等待一天。</p>
				<h3>·返佣的金额能直接使用吗？</h3>
				<p class="ps">
					可以的，返佣的金额将保管在返佣钱包里，可以实时转换到系统
					余额里以供使用。
				</p>
			</div>
		</div>
		<div class="instruct">
			<h2>
				温馨提示
				<i></i>
			</h2>
			<p>建议为下级会员开设的返佣比例不要太低，发展空间才会更大哦~</p>
		</div>
	</div>
</template>
<script>
export default {
	methods: {
		
	}
};
</script>
<style lang="scss" scoped>
 @import "../../../components/scss/pk-pwd.scss";
	.promote {
		background-color: $prompt-bg;
		
        .spansright {
			.imgsbank {
				position: absolute;
				width: 0.58667rem /* 44/75 */;
                top: .24rem /* 18/75 */;
                right: .2rem /* 15/75 */;
			}
		}
		.imgs {
			height: 3.33333rem /* 250/75 */;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.instruct {
			background: #fff;
			padding: 0.2rem /* 15/75 */;
			h2 {
				color: #252232;
				font-size: 0.48rem /* 36/75 */;
				padding-left: 0.53333rem; /* 40/75 */
				position: relative;
				i {
					position: absolute;
					top: 0;
					width: .10667rem /* 8/75 */;
					height: .48rem /* 36/75 */;
					left: .26667rem /* 20/75 */;
					top: .09333rem /* 7/75 */;
					background-image: linear-gradient(#3a74d2, #3a74d2),
						linear-gradient(#00d897, #00d897);
					background-blend-mode: normal, normal;
				}
			}
			p {
				color: #2b2b2b;
				font-size: 0.32rem /* 24/75 */;
				line-height: 1.3em;
			}
			.list-ul {
				h3 {
					font-size: 0.37333rem /* 28/75 */;
					color: #3a74d2;
					margin-bottom: 0.2rem /* 15/75 */;
					&:last-child {
						margin-bottom: 0;
					}
				}
				.ps {
					color: #2b2b2b;
					font-size: 0.32rem /* 24/75 */;
					margin-bottom: 0.30667rem /* 23/75 */;
					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
	}
</style>
