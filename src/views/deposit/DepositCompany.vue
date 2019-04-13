<template>
	<div class="company-alipay">
        <nut-navbar class="pk-title" @on-click-back="$router.go(-1)" :rightShow="false">
			<a class="spans" slot="back-icon">
				<img class="imgsbank" src="../../assets/img/my-icon/fanhui.png"/>
			</a>
			公司存款
		</nut-navbar>

         <nut-datepicker class="begin-time"
                :is-visible="isShowTime"
                type="datetime"
                title="请选择存款时间" 
                :is-show-chinese="false"
                :defaultValue="dataVal"
                @close="beginPicker('isShowTime')"
                @choose="beginChoose"
            >
            </nut-datepicker>


		<div class="content">
			<div class="deposit-account">
				<h2 class="title">存款账户</h2>
				<div class="deposit-account-box">

                    <!-- 有二维码 展示的内容-->
					<div v-show="baseInfoData.payType === 2" class="left">
						<h2 v-show="baseInfoData.bankNum" @click="copy(baseInfoData.bankNum)">
							<p>存款账号</p>
							<span>{{baseInfoData.bankNum}}  <i class="iconfont icon-qb-copy"></i></span>
						</h2>
						<h2 v-show="baseInfoData.bankUser">
							<p>收款人</p>
							<span>{{baseInfoData.bankUser}}</span>
						</h2>
						<h2>
							<p>备注码</p>
							<span>{{randomNum}}</span>
						</h2>
						<h3>
							<span>您在转账时填写备注码，</span>
							<span>会提高您存款到账速度</span>
						</h3>
					</div>

                    <!-- 无二维码 展示的内容-->
                    <div v-show="baseInfoData.payType === 1" class="left">
                        <h2>
                            <p>存款银行</p>
                            <span>{{baseInfoData.bankName}}</span>
                        </h2>
                        <h2>
                            <p>户主</p>
                            <span>{{baseInfoData.bankUser}}</span>
                        </h2>
                        <h2 @click="copy(baseInfoData.bankNum)">
                            <p>账号</p>
                            <span>{{baseInfoData.bankNum}}<i class="iconfont icon-qb-copy"></i></span>
                        </h2>
                        <h2>
                            <p>备注码</p>
                            <span>{{randomNum}}</span>
                        </h2>
                        <h3>
                            <span>您在转账时填写备注码，会提高您存款到账速度</span>
                        </h3>
                    </div>


                    <!-- payType 1=无二维码 2=有二维码 -->
					<div v-show="baseInfoData.payType === 2" class="right">
						<h3>扫码转账</h3>
						<img :src="baseInfoData.payImg" alt="">
						<!-- <a>下载二维码</a> -->
					</div>
				</div>
			</div>
			<div class="deposit-info">
				<h2 class="title">填写存款信息</h2>
				<ul>
					<li class="pk-1px-b">
						<span class="must">存款金额</span>
						<input name="money" type="tel" @keyup="validateRegExp()" v-model="postData.depositMoney" placeholder="请输入存款金额" >
					</li>
					<div v-show="postData.depositMoney" class="money-chinese">{{depositMoneyChinese}}</div>

					<li class="pk-1px-b">
						<span class="must">存款人姓名</span>
						<input name="inAccount" type="text" v-model="postData.realName" placeholder="请输入存款账号" >
					</li>
					<li class="pk-1px-b">
						<span class="must">存款时间</span>
						<input name="inTime" @click="isShowTime=true" type="text" v-model="postData.depositTime"
							    readonly placeholder="请选择时间">
						<i class="iconfont icon-qb-time"></i>
					</li>

					<li>
						<span>备注</span>
						<input type="text" v-model="postData.remark" placeholder="可输入订单号后四位">
					</li>
				</ul>
			</div>
			
			<div class="deposit-submit">
				<button @click="handleDeposit()">立即存款</button>
				<div class="hint">
					<p>温馨提示：</p>
					<p>1、公司银行账号不定期更换。请每次存款前，务必先至[公司存款]查看账号。</p>
					<p>2、在金额转出之后请务必准确填写存款信息，以便财务能够及时确认并添加金额到您的会员帐户中。</p>
					<p>3、单笔存款金额为<span>{{baseInfoData.lineDepositMin}}~{{baseInfoData.lineDepositMax}}</span>元</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import func from '@/services/deposit'
    export default {
        name: 'company',
        mounted () {
            this.getBaseInfo();
            while (true) {
                this.randomNum = parseInt(Math.random() * 10000);
                if (this.randomNum <= 9999 && this.randomNum >= 1111) {
                    return;
                }
            }
        },
        computed: {
            //金额大写要用
            depositMoney(){
                return this.postData.depositMoney;
            }
        },
        data () {
            return {
                dataVal: this.filterDate(new Date()),
                isShowTime:false,
                baseInfoData: {},
                postData: {
                    depositMoney: "",
                    realName: "",
                    depositTime: "",
                    remark: "",
                    orderNum: "",
                },
                depositMoneyChinese:'',//存款金额中文大写
                randomNum: ''
            }
        },
        methods: {
            beginPicker(param) {
                this[`${param}`] = !this[`${param}`];
            },
            beginChoose(param) {
                this.postData.depositTime = param[5];
            },
            copy (msg) {
                this.$copyText(msg).then((e) => {
                    this.$toast.success('复制成功',{cover:true});
                }, (e) => {
                    this.$toast.fail('复制失败',{cover:true});
                })
            },
            getBaseInfo () {
                let loading = this.$toast.loading('加载中...');
                func.getCompanyInfo({id: this.$route.query.id * 1}).then((res) => {
                    loading.hide();
                    if(res.success){
                        this.baseInfoData = res.data;
                        this.postData.realName = res.data.realName;
                    }else {
                        this.$toast.fail(res.message,{cover:true,duration:4000});
                    }
                })
            },
            handleDeposit () {
                let postData = {
                    setId: parseInt(this.baseInfoData.id),
                    depositAccount: this.postData.realName,
                    depositMoney: parseFloat(this.postData.depositMoney),
                    depositTime: +new Date(this.postData.depositTime) / 1000,
                    remark: this.postData.remark,
                    orderCode: this.randomNum,
                }
                if(!this.validate(postData)) return;

                let loading = this.$toast.loading('提交中...');
                func.postCompany(postData).then((res) => {
                    loading.hide();
                     if(res.success){
                        this.$router.push({
                            name: 'paySuccess',
                            query: {
                                fromType: 2,
                                order: res.data.order,
                            }
                        })
                    }else {
                        this.$toast.fail(res.message,{cover:true,duration:4000});
                    }
                })
            },

            validateRegExp(){
                if(this.baseInfoData.isInteger === 1){//只能输入整数
                    this.postData.depositMoney = this.postData.depositMoney.replace(/[^\d]/,'');
                }else {
                    this.postData.depositMoney = this.postData.depositMoney.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
                }
            },

            validate(postData){
                if (!postData.depositMoney) {
                    this.$toast.fail('请输入存款金额',{cover:true});
                    return false;
                }else if (postData.depositMoney * 1  > this.baseInfoData.lineDepositMax || postData.depositMoney * 1  < this.baseInfoData.lineDepositMin) {
                    this.$toast.fail(`存款金额为${this.baseInfoData.lineDepositMin}-${this.baseInfoData.lineDepositMax}`,{cover:true});
                    return false;
                }else if(!postData.depositAccount){
                    this.$toast.fail('请输入存款人姓名',{cover:true});
                    return false;
                }else if(!postData.depositTime){
                    this.$toast.fail('请选择存款时间',{cover:true});
                    return false;
                }else {
                    return true;
                }
            }
        },
        watch:{
            depositMoney(newVal,oldVal){
                this.depositMoneyChinese = this.filterAmount(newVal * 1);
            }
        }

    }
</script>

<style lang="scss" scoped>
	.company-alipay {
		.content {
			.deposit-account {
				.title {
					height: 1.06667rem /* 80/75 */;
					line-height: 1.06667rem /* 80/75 */;
					padding-left: .4rem /* 30/75 */;
					font-size: .42667rem /* 32/75 */;
					color: $color-C;
				}
				.deposit-account-box {
					padding: .32rem /* 24/75 */ .4rem /* 30/75 */;
					background: $default-color;
					display: flex;
					justify-content: space-between;
					.left {
						h2 {
							line-height: 1.5;
							p {
								font-size: .37333rem /* 28/75 */;
								color: $color-J;
								display: inline-block;
								width: 2rem /* 150/75 */;
							}
							span {
								display: inline-block;
								font-size: .37333rem /* 28/75 */;
								color: $color-C;
								i {
									font-size: .37333rem /* 28/75 */;
									margin-left: .13333rem /* 10/75 */;
								}
							}
						}
						h3 {
							line-height: 1.5;
							color: $color-M;
							font-size: .32rem /* 24/75 */;
							span {
								display: block;
							}
						}
					}
					.right {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						h3 {
							font-size: .32rem /* 24/75 */;
							color: $nondefault-color;
							text-align: center;
						}
						img {
							width: 1.86667rem /* 140/75 */;
							height: 1.86667rem /* 140/75 */;
							display: block;
							margin: .13333rem /* 10/75 */ 0;
						}
						a {
							font-size: .32rem /* 24/75 */;
							color: $color-x;
							text-decoration: underline;
							text-align: center;
						}
					}
				}
			}
			.deposit-info {
				.title {
					height: 1.06667rem /* 80/75 */;
					line-height: 1.06667rem /* 80/75 */;
					padding-left: .4rem /* 30/75 */;
					font-size: .42667rem /* 32/75 */;
					color: $color-C;
				}
				ul {
					background: $default-color;
					.money-chinese{
						text-align: right;
						padding:.4rem .4rem 0 0;
					}
					li {
						margin-left: .4rem /* 30/75 */;
						padding-right: .4rem /* 30/75 */;
						height: 1.06667rem /* 80/75 */;
						line-height: 1.06667rem /* 80/75 */;
						display: flex;
						justify-content: space-between;
						font-size: .37333rem /* 28/75 */;
						span {
							flex: 3;
						}
						i {
							font-size: .37333rem /* 28/75 */;
							color: $color-P;
							vertical-align: middle;
						}
						input {
							flex: 7;
							text-align: right;
							border: none;
							color: $color-C;
						}
						input::-webkit-input-placeholder {
							color: $color-P;
							font-size: .32rem /* 24/75 */;
						}
					}
				}
			}
		}
		.deposit-info {
			.title {
				height: 1.06667rem /* 80/75 */;
				line-height: 1.06667rem /* 80/75 */;
				padding-left: .4rem /* 30/75 */;
				font-size: .42667rem /* 32/75 */;
				color: $color-C;
			}
			ul {
				background: $default-color;
				li {
					margin-left: .4rem /* 30/75 */;
					padding-right: .4rem /* 30/75 */;
					height: 1.06667rem /* 80/75 */;
					line-height: 1.06667rem /* 80/75 */;
					display: flex;
					justify-content: space-between;
					font-size: .37333rem /* 28/75 */;
					position: relative;
					span {
						flex: 3;
					}
					i {
						font-size: .37333rem /* 28/75 */;
						color: $color-P;
						vertical-align: middle;
					}
					input {
						flex: 7;
						text-align: right;
						border: none;
						color: $color-C;
					}
					input::-webkit-input-placeholder {
						color: $color-P;
						font-size: .32rem /* 24/75 */;
					}
					i.error-icon {
						position: absolute;
						right: 0;
						font-size: .4rem /* 30/75 */;
						color: $color-a;
					}

				}
			}
		}
		.error-hint {
			font-size: .32rem /* 24/75 */;
			color: $color-a;
			padding-left: .4rem /* 30/75 */;
			height: .8rem /* 60/75 */;
			line-height: .8rem /* 60/75 */;
		}
		.deposit-submit {
			padding: .4rem /* 30/75 */;
			button {
				width: 100%;
				height: 1.06667rem /* 80/75 */;
				line-height: 1.06667rem /* 80/75 */;
				border-radius: .13333rem /* 10/75 */;
				font-size: .37333rem /* 28/75 */;
				color: $default-color;
				background: $primary-color;
				border: none;
				text-align: center;
				box-shadow: 0px 2px 5px 0px $color-rgab-black;
				&:active {
					background: $primary-color;
				}
			}
			.hint {
				margin-top: .26667rem /* 20/75 */;
				p {
					font-size: .32rem /* 24/75 */;
					color: $color-P;
					line-height: .48rem /* 36/75 */;
					span {
						color: $primary-color;
					}
				}
			}
		}
	}
</style>


