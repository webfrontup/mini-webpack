<template>
	<div class="withdraw">
        <nut-navbar class="pk-title" @on-click-back="$router.go(-1)" :rightShow="false">取款</nut-navbar>

		<div class="content">
			<div class="widthdraw-top">
				<div class="title">
					<span class="must">收款账户</span>
				</div>
				<router-link tag="div" :to="{name:'bankCardadd'}" v-show="!infoData.has" class="no-bankCard">
					<p>您还未添加银行卡</p>
					<div class="add-card">
						<i class="iconfont icon-qb-bank-add"></i>
						<span>点击添加银行卡</span>
					</div>
				</router-link>
				<div v-show="infoData.has" class="has-bankCard">
					<swiper :options="swiperOption" ref="mySwiper">
						<swiper-slide v-for="(item, index) in swiperSlides" :key="index">
							<div class="card-list clearfix">
								<div class="left">
									<h2 class="text-dots">{{item.bankName}}
									</h2>
									<h3 class="text-dots">{{item.subbranch}}</h3>
									<p>{{item.card | filterBankNum}}</p>
								</div>
								<div class="right">
									<i class="iconfont icon-bank-normal" v-show="item.isDefault === 1"></i>
									<i class="iconfont icon-qb-bank-tongyong1"></i>
								</div>
							</div>
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
				</div>
				<div class="width-form">
					<ul>
						<li class="pk-1px-tb">
							<span class="must">取款金额</span>
							<input type="number" @keyup="validateRegExp()" v-model="postData.outMoney" placeholder="请输入取款金额">
						</li>
							<div v-show="postData.outMoney" class="money-chinese">{{outMoneyChinese}}</div>
						<li>
							<span class="must">取款密码</span>
							<input type="password" v-model="postData.drawPassword" placeholder="请输入取款密码">
						</li>
					</ul>
				</div>
			</div>
			<div class="widthdraw-bottom">
				<h2 v-show="infoData.hasP">忘记取款密码请
					<router-link tag="a" :to="{name:'contactus'}">联系客服</router-link>
				</h2>
				<h2 v-show="!infoData.hasP">您还未设置取款密码请
					<router-link tag="a" :to="{name:'password'}">点击设置</router-link>
				</h2>

				<button @click="handleWithdraw">取款</button>
				<div class="hint">
					<h3>温馨提示</h3>
					<p>1.单笔取款金额为<span>{{infoData.min}}~{{infoData.max}}</span>元</p>
					<p>2.取款金额需为整数，否则可能延长出款。</p>
					<p>3.有未完成的取款订单时，无法提交第二笔订单。</p>
					<p>4.出款出现以下情况将会扣除一定费用：</p>
					<p>1）未满足常态稽核 将扣除入款金额{{infoData.lineAuditAdminRate}}%行政费用与优惠金额。</p>
					<p>2) 未满足综合稽核 将扣除优惠金额。</p>
					<p>*常态稽核 = 会员入款金额 * 常态稽核倍数</p>
					<p>*综合稽核=（会员入款金额+入款优惠金额）*综合稽核倍数+优惠金额*相应综合稽核倍数</p>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    import func from '@/services/deposit'


    export default {
        name: 'withdraw',
        components: {
            swiper,
            swiperSlide
        },
        data () {
            return {
                size: parseInt(this.HTML_FONT_SIZE * 0.4),
                swiperOption: {
                    spaceBetween: '5%',
                    pagination: '.swiper-pagination',
                },
                swiperSlides: [],
                infoData: {},
                postData: {
                    outMoney: '',
                    drawPassword: "",
                    bankId: "",
                },
                outMoneyChinese:'',//出款金额中文大写
            }
        },
        computed: {
            swiper () {
                return this.$refs.mySwiper.swiper
            },
            outMoney(){
                return this.postData.outMoney;
			}
        },
        mounted () {
            this.refush();
        },
        methods: {
            //获取取款信息
            refush () {
                let loading = this.$toast.loading('加载中...');
                func.getWithdrawInfo().then((res) => {
                    loading.hide();
                    if(res.success){
                        this.infoData = res.data;
                        this.swiperSlides = res.data.bankList.slice(0,2);
                        //是否有完成的订单 true=没有 false=有
                        if (!this.infoData.isOrder) {
                            this.isFinishOrder();
                        }else if(!this.infoData.hasP){
                            //去设置取款密码hasP 1=有设置密码 2=没有设置密码
                            this.isSetOutMoneyPassword();
                        }
                    }else {
                        this.$toast.fail(res.message,{cover:true,duration:4000});
                    }
                })
            },
           
            //是否有未完成的订单
            isFinishOrder(){
                this.$dialog({
                    id:'dialog_back',
                    lockBgScroll:true,
                    closeOnClickModal:false,
                    noOkBtn:true,
                    cancelBtnTxt:'关闭',
                    title: "提示",
                    content:"您有尚未完成的取款订单，订单完成后才能再次取款！",
                    customClass:'my-dialog',
                });
            },
            //是否设置了取款密码
            isSetOutMoneyPassword () {
                let self = this;
                this.$dialog({
                    id:'dialog_pwd',
                    lockBgScroll:true,
                    closeOnClickModal:false,
                    okBtnTxt:"设置",
                    title: "提示",
                    content: "您还没有设置取款密码，暂时无法取款！",
                    customClass:'my-dialog',
                    onOkBtn(){
                        self.$router.push({name: 'password'});//设置取款密码
                        this.close();
                    }
                });
            },
            //是否设置了个人资料
            isSetUserInfo (info) {
                if (!info || info.isQq === 2
                    && info.isWechat === 2
                    && info.isEmail === 2
                    && info.isPhone === 2
                    && info.isIdCard === 2
                    
                ) {
                    this.$router.push({
                        name: 'withdrawAudit'
                    });
                    return;
                }
                let arr = [];
                if (info.isQq === 1) {
                    arr.push('QQ');
                }
                if (info.isWechat === 1) {
                    arr.push('微信');
                }
                if (info.isEmail === 1) {
                    arr.push('邮箱');
                }
                if (info.isPhone === 1) {
                    arr.push('手机号');
                }
                if (info.isIdCard === 1) {
                    arr.push('身份证');
                }
                let self = this;
                this.$dialog({
                    id:'dialog_info',
                    lockBgScroll:true,
                    closeOnClickModal:false,
                    okBtnTxt:"去完善资料",
                    cancelBtnTxt:"暂不取款",
                    title: "提示",
                    content:`您还未完善个人资料(${arr.join('、')}），暂时无法取款！`,
                    customClass:'my-dialog',
                    onOkBtn(){
                        self.$router.push({name: 'about'});//设置个人资料
                        this.close();
                    }
                });
            },

            validateRegExp(){
                this.postData.outMoney = this.postData.outMoney.replace(/[^\d]/,'');
            },
            
            //取款提交
            handleWithdraw () {
                //是否有完成的订单 1=有 2=没有
                if (!this.infoData.isOrder) {
                    this.isFinishOrder();
                    return ;
                }else if(!this.infoData.hasP){
                    //去设置取款密码hasP 1=有设置密码 2=没有设置密码
                    this.isSetOutMoneyPassword();
                    return;
                }

                if(!this.postData.outMoney){
                    this.$toast.fail('请输入取款金额',{cover:true});
                    return;
                }
                if (!/^[1-9]\d*$/.test(this.postData.outMoney)) {
                    this.$toast.fail('取款金额为正整数',{cover:true});
                    return;
                }
                if (this.postData.outMoney > this.infoData.max || this.postData.outMoney < this.infoData.min) {
                    this.$toast.fail(`取款金额为${this.infoData.min}-${this.infoData.max}`,{cover:true});
                    return;
                }
                if (!/^\d{6}$/.test(this.postData.drawPassword)) {
                    this.$toast.fail('取款密码为6位数字',{cover:true});
                    return;
                }
                let postData = {
                    outMoney: this.postData.outMoney * 1,
                    drawPassword: this.postData.drawPassword,
                    bankId: this.swiperSlides[this.swiper.activeIndex].id
                }
                let loading = this.$toast.loading('提交中...');
                func.postWithdraw(postData).then((res) => {
                    loading.hide();
                    if(res.success){
                        this.isSetUserInfo(res.data.imi);
                        let data = encodeURIComponent(JSON.stringify(res.data));
                        sessionStorage.setItem('withdrawAudit', data);
                    }else {
                        this.$toast.fail(res.message,{cover:true,duration:4000});
                    }
                    
                })
            },
        },
        watch:{
            outMoney(newVal,oldVal){
				this.outMoneyChinese = this.filterAmount(newVal * 1);
			}
        }
    }
</script>

<style lang="scss" scoped>
	.widthdraw-top {
		background: $default-color;
		margin-top: .26667rem /* 20/75 */;
		padding: .4rem /* 30/75 */;
		padding-bottom: 0;
		.title {
			font-size: .37333rem /* 28/75 */;
			color: $color-C;
			margin-bottom: .26667rem /* 20/75 */;
		}
		.no-bankCard {
			p {
				text-align: center;
				font-size: .32rem /* 24/75 */;
				color: $color-M;
			}
			.add-card {
				width: 100%;
				border: 1px dashed $color-P;
				border-radius: .13333rem /* 10/75 */;
				margin: .4rem /* 30/75 */ 0;
				height: 2.66667rem /* 200/75 */;
				font-size: .37333rem /* 28/75 */;
				color: $color-J;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				i {
					font-size: .8rem /* 60/75 */;
					color: $color-P;
				}

			}
		}
		.has-bankCard {
			position: relative;
			.card-list {
				width: 100%;
				height: 2.66667rem /* 200/75 */;
				border-radius: .13333rem /* 10/75 */;
				box-sizing: border-box;
				font-size: .37333rem /* 28/75 */;
				background-image: linear-gradient(-90deg, $color-i 0%, $color-k 100%), linear-gradient($color-i, $color-i);
				color: $default-color;

				.left {
					padding-left: .53333rem /* 40/75 */;
					padding-top: .4rem /* 30/75 */;
					float: left;
					max-width: 65%;
					font-weight: 200;
					h2 {
						font-size: .48rem /* 36/75 */;
						position: relative;
						font-weight: 200;
					}
					h3 {
						// margin: .4rem /* 30/75 */ 0 .26667rem /* 20/75 */ 0;
						font-weight: 200;
					}
				}
				.right {
					float: right;
					position: relative;
					i.icon-qb-bank-tongyong1 {
						font-size: 3.8rem;
						opacity: 0.2;
						position: absolute;
						right: -0.26667rem;
						top: -.26667rem /* 20/75 */;
					}
					i.icon-bank-normal {
						position: absolute;
						font-size: 1.06667rem /* 80/75 */;
						color: $default-color;
						opacity: 0.8;
						right: .26667rem /* 20/75 */;
						top: -.08rem /* 6/75 */;
					}
				}
			}
		}
		.width-form {
			margin-top: 0.8rem;
			ul {
				.money-chinese{
					text-align: right;
					padding:.4rem 0 0 0;
				}
				li {
					height: 1.06667rem /* 80/75 */;
					line-height: 1.06667rem /* 80/75 */;
					display: flex;
					justify-content: space-between;
					span {
						flex: 2;
						font-size: .37333rem /* 28/75 */;
					}
					input {
						flex: 8;
						border: none;
						text-align: right;
						font-size: .37333rem /* 28/75 */;
						color: $color-C;
						&::-webkit-input-placeholder {
							color: $color-P;
							font-size: .32rem /* 24/75 */;
						}
					}
				}
			}
		}
	}

	.widthdraw-bottom {
		padding: 0 .4rem /* 30/75 */ .53333rem /* 40/75 */;
		h2 {
			height: .98667rem /* 74/75 */;
			line-height: .98667rem /* 74/75 */;
			font-size: .32rem /* 24/75 */;
			text-align: right;
			color: $color-M;
			a {
				color: $color-w;
				text-decoration: underline;
			}
		}
		button {
			width: 100%;
			height: 1.2rem /* 90/75 */;
			line-height: 1.2rem /* 90/75 */;
			font-size: .48rem /* 36/75 */;
			border-radius: .13333rem /* 10/75 */;
			background: $primary-color;
			border: none;
			color: $default-color;
			text-align: center;
			box-shadow: 0px 2px 5px 0px $color-rgab-black;
			&:active {
				background: $primary-color;
			}
			&:disabled {
				// background: $color-y;
				box-shadow: none;
				color: $color-P;
			}
		}
		.hint {
			margin-top: .4rem /* 30/75 */;
			font-size: .32rem /* 24/75 */;
			color: $color-M;
			p {
				line-height: 1.5;
				span {
					color: $primary-color;
				}
			}
			h3 {
				line-height: 1.5;
				font-size: .34667rem /* 26/75 */;
			}
		}
	}
</style>


