
<template>
	<div class="statisics">
        <nut-navbar class="pk-title" @on-click-back="$router.go(-1)" :rightShow="false">推广统计</nut-navbar>
        
		<div class="tab">
			<nut-tab @tab-switch="tabSwitch" :contentShow="false">
				<nut-tab-panel v-for="item in timeArr" :key="item.value" :tabTitle="item.name"></nut-tab-panel>
			</nut-tab>
		</div>
		<div class="tab-content">
			<div class="top-content">
				<ul>
					<li>
						<div class="title">彩票投注</div>
						<div class="num">{{info.cpBet | currency('',2)}}</div>
					</li>
					<li>
						<div class="title">棋牌投注</div>
						<div class="num">{{info.qpBet | currency('',2)}}</div>
					</li>
					<li>
						<div class="title">电子报表</div>
						<div class="num">{{info.dzBet | currency('',2)}}</div>
					</li>
					<li>
						<div class="title">捕鱼报表</div>
						<div class="num">{{info.byBet | currency('',2)}}</div>
					</li>
					<li>
						<div class="title">体育报表</div>
						<div class="num">{{info.tyBet | currency('',2)}}</div>
					</li>
					<li>
						<div class="title">视讯报表</div>
						<div class="num">{{info.sxBet | currency('',2)}}</div>
					</li>
				</ul>
                <ul class="makeblue">
					<li>
						<div class="title">投注返佣</div>
						<div class="num">{{info.tzRebate | currency('',2)}}</div>
					</li>
					<li>
						<div class="title">报表返佣</div>
						<div class="num">{{info.bbRebate | currency('',2)}}</div>
					</li>
					<li>
						<div class="title">推广人数</div>
						<div class="num">{{info.spreadNum}}</div>
					</li>
					<li>
						<div class="title">投注人数</div>
						<div class="num">{{info.betNum}}</div>
					</li>
					<li>
						<div class="title">团队充值</div>
						<div class="num">{{info.recharge | currency('',2)}}</div>
					</li>
					<li>
						<div class="title">团队提现</div>
						<div class="num">{{info.withdraw | currency('',2)}}</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
    import func from '@/services/spread'

export default {
	data() {
		return {
            timeArr:[
                {value:2,name:'今日'},
                {value:1,name:'昨日'},
                {value:5,name:'本月'},
                {value:6,name:'上月'},
            ],
            dayType: 2,
            info:{},
		};
	},
	mounted() {
        this.getGeneralizeStatisList();
	},
	methods: {
        getGeneralizeStatisList(){
            let loading = this.$toast.loading('加载中...');
            func.getGeneralizeStatisList({
                dayType:this.dayType
            }).then((res) => {
                loading.hide();
                if(res.success){
                    this.info = res.data;
                }else {
                    this.$toast.fail(res.message,{cover:true,duration:4000});
                }
            })
        },
		tabSwitch(index) {
            this.dayType = this.timeArr[index].value;
            this.getGeneralizeStatisList();
		}
	}
};
</script>
<style lang="scss" scoped>
	.statisics {
        background-color: $prompt-bg;
        .spansright {
			.imgsbank {
				position: absolute;
				width: 0.58667rem /* 44/75 */;
                top: .24rem /* 18/75 */;
                right: .2rem /* 15/75 */;
			}
		}
		.tab {
			position: fixed;
			top: 1.17rem;
			left: 0;
			width: 100%;
			z-index: 1;
			/deep/ .nut-tab-title {
				height: 1.07rem;
				.nav-bar {
					background: $primary-color;
				}
			}
			/deep/ .nut-tab {
				padding: 0;
				.nut-tab-active {
					.nut-tab-link {
						color: $primary-color;
					}
				}
				/deep/ .nut-tab-link {
					font-size: 0.37rem;

					&:hover {
						text-decoration: none;
					}
				}
			}
		}
		.tab-content {
			padding-top: 1.17rem;
			.top-content {
				width: 100%;
				ul ,.makeblue{
                    margin-top: .26667rem /* 20/75 */;
					display: flex;
					justify-content: space-around;
					align-items: center;
					width: auto;
					padding: 0.26667rem /* 20/75 */ 0.4rem /* 30/75 */ 0.26667rem
						/* 20/75 */;
					flex-wrap: wrap;
					background: $default-color;
					li {
						display: flex;
						flex-direction: column;
						margin: 0.13333rem /* 10/75 */ 0.06667rem /* 5/75 */
							0.13333rem /* 10/75 */;
						.title,
						.num {
							width: 2.8rem /* 210/75 */;
							height: 1.17333rem /* 88/75 */;
							background-color: $default-color;
							border-radius: 0.26667rem /* 20/75 */ 0.26667rem
								/* 20/75 */ 0px 0px;
							border: solid 2px $prompt-tongji-yellow;
							border-bottom: none;
							font-size: 0.37333rem /* 28/75 */;
							text-align: center;
							line-height: 1.17333rem /* 88/75 */;
							color: $prompt-tongji-yellow;
						}
						.num {
							border-radius: 0px 0px 0.26667rem /* 20/75 */ 0.26667rem
								/* 20/75 */;
							border: solid 2px $prompt-tongji-yellow;
							background-color: $prompt-tongji-yellow;
							color: $default-color;
						}
					}
                }
                .makeblue{
                    li {
                        .title,
						.num {
                            color: $prompt-tongji-blue;
                            border: solid 2px $prompt-tongji-blue;
                        }
                        .num{
                            border: solid 2px $prompt-tongji-blue;
                            background-color: $prompt-tongji-blue;
                            color: $default-color;
                        }
                    }
                }
			}
		}
	}
</style>

