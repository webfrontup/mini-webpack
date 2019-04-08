<template>
	<div class="transfer">
        <nut-navbar class="pk-title" @on-click-back="$router.go(-1)" :rightShow="false">额度转换</nut-navbar>
		<div class="transfer-fixed">
			<div class="pk-trans-type">
				<h2 @click="isShowTransType = true"><span>转换方式</span><i>?</i></h2>
				<div>
					<nut-radiogroup v-model="freeWalletSwitch">
						<nut-radio class="my-radio" v-for="(item,index) in transType" :key="item.value" :label="item.value">{{item.key}}
						</nut-radio>
					</nut-radiogroup>
				</div>

				<div v-show="isShowTransType">
					<div class="mask" @touchmove.self.prevent></div>
					<div class="mask-box">
						<div class="mask-box-title"><span>钱包说明</span>
							<nut-icon @click.native="isShowTransType = false;" size="0.4rem" type="cross">
							</nut-icon>
						</div>
						<div class="mask-box-content">
							<img src="../../assets/img/purse_type.png" alt="">
						</div>
					</div>
				</div>
			</div>

			<div class="total-asset-info">
				<div class="total-money-num">
					<span>总资产</span>
					<i>{{moneyInfo.balance | currency('',2)}}</i>
				</div>
				<div class="total-money-num">
					<span>钱包余额</span>
					<i>{{moneyInfo.walletBalance | currency('',2)}}</i>
				</div>
			</div>

			<div class="btn">
				<div @click="allTransfer()">一键回收</div>
				<div @click="refresh()">一键刷新</div>
			</div>

			<div v-show="date" class="money-synchronise">
				<span>资金已完成同步：</span>
				<i>{{date | filterDate}}</i>
			</div>
		</div>
		<div class="all-items">
			<nut-row  :gutter="0.5">
				<nut-col  :span="8" v-for="(item,index) in list" :key="index">
					<div class="flex-content">
						<p class="item-name">
							<span>{{item.text}}</span>
							<img @click="refresh(item.textName)" v-show="freeWalletSwitch === 1" src="../../assets/img/icon_recycling@3x.png" alt="">
							<i  @click="handleConversion(2,item)" v-show="freeWalletSwitch === 2">转入</i>
						</p>
						<b class="item-num">
							<span>{{item.value | currency('',2)}}</span>
							<i :class="{'disabled':item.value<=0}" @click="handleConversion(1,item)" v-show="freeWalletSwitch === 2">转出</i>
						</b>
					</div>
				</nut-col>

			</nut-row>
		</div>


		<!--额度转换弹框 -start -->
		<nut-dialog
				title="额度转换"
				customClass="my-dialog-transfer"
				:visible="isShowTransInOrOut"
                :closeBtn="true"
				:lockBgScroll="true"
                :closeOnClickModal="false"
                :noFooter="true"
                @close="isShowTransInOrOut=false"
                >
			<div class="title">
				<span>{{doType === 2?'系统余额':transInfo.text}}</span>
				<span>{{doType === 2?'转入':'转出'}}</span>
				<span>{{doType === 2?transInfo.text:'系统余额'}}</span>
			</div>
			<div class="money">
				<div class="label">{{doType === 2?'转入':'转出'}}金额：</div>
				<div class="money-input">
					<div class="num">
						<input type="number" :placeholder="doType === 2?'请输入转入金额':'请输入转出金额'" v-model.number="transferAmount">
						<p v-show="transferAmount" class="in-money-chinese">{{moneyChinese}}</p>
						<span>元</span>
					</div>

				</div>
			</div>

			<nut-row class="fast-money" :gutter="10">
				<nut-col :span="6"
						 v-for="(item,index) in fastMoneyArr"
						 :key="index"
						 :class="{'active':fastMoneyIndex === index}"
						 @click.native="handleFast(index)">
					<div class="fast-money-item"
					>{{item}}</div>
				</nut-col>

			</nut-row>

            <div class="btns">
                <div class="cancel" @click="isShowTransInOrOut=false">取消</div>
                <div class="sure" @click="transferSubmit()">确认转换</div>
            </div>


		</nut-dialog>
		<!--额度转换弹框 -end -->


	</div>

</template>

<script>
    import func from '@/services/deposit';

    export default {
        name: "transfer",
        data () {
            return {
                moneyInfo:{
                    balance:0,
                    walletBalance:0
                },
                date:'',
                transType: [{key: '免转钱包', value: 1}, {key: '多钱包', value: 2}],
                freeWalletSwitch:0,//选择的模式 1=免转钱包 2=多钱包；
                isShowTransType: false,//钱包说明
                isShowTransInOrOut:false,//转入转出
                list: [],
                fastMoneyArr: [100000,50000,10000,5000,1000, 500, 200, 100],
                fastMoneyIndex:'',
                transferAmount:'',//转入转出金额
                moneyChinese:'',//转入,转出金额中文大写

                doType:2,//2=转入 1=转出
                transInfo:{}
            }
        },
        mounted(){
            this.getNoAutoTransferInfo();
        },
		methods:{
            getNoAutoTransferInfo(type){
                let loading = this.$toast.loading('加载中...');
                func.getNoAutoTransferInfo().then((res)=>{
                    loading.hide();
                    if(res.success){
                        if(res.data){
                            this.freeWalletSwitch = res.data.autoPay?1:2;
                            this.list = res.data.select;
                            this.moneyInfo = {
                                balance:res.data.balance,//总资产
                                walletBalance:res.data.walletBalance//钱包余额
                            }
                            this.date = new Date();
                            if(type){
                                this.$toast.success('刷新成功!',{cover:true});
                            }
                        }
                    }else {
                        this.list = [];
                        this.$toast.fail(res.message,{cover:true,duration:4000});
                    }
                })
            },
            //一键回归
            allTransfer(){
                let self = this;
                this.$dialog({
                    id:'dialog_back',
                    lockBgScroll:true,
                    closeOnClickModal:false,
                    title: "您确定将所有视讯余额转出到系统吗？",
                    customClass:'my-dialog',
                    onOkBtn() {
                        let loading = this.$toast.loading('提交中...');
                        func.recoveryById().then((res) => {
                            loading.hide();
                            if(res.success){
                                self.$toast.success('转出成功',{cover:true});
                                self.getNoAutoTransferInfo();
                            }else {
                                self.$toast.fail(res.message,{cover:true,duration:4000});
                            }
                            this.close(); //关闭对话框
                        })
                    },
                });
			},
            //快捷选择转换金额
            handleFast (index) {
                this.fastMoneyIndex = index;
                this.transferAmount = this.fastMoneyArr[index];
			},

			//转入 转出
            handleConversion(doType,item){
                this.doType = doType;
                this.transInfo = item;
                this.reset();

                //转出 金额为0就不弹出框
                if(doType === 1){
                    this.isShowTransInOrOut = item && item.value>0;
                }else {
                    this.isShowTransInOrOut = true;
                }
			},
            transferSubmit(){
                let postData = {
                    transferAmount:this.transferAmount
                };
                if(this.doType === 1){//转出
                    postData.transferOut = this.transInfo.textName;
                    postData.transferOutId = this.transInfo.texId;
                }else {
                    postData.transferInto = this.transInfo.textName;
                    postData.transferIntoId = this.transInfo.texId; 

                }
                
                if(!postData.transferAmount){
                    this.$toast.fail('请输入转换金额',{cover:true});
                    return;
                }
                if(this.doType === 1){
                    if(postData.transferAmount < 0 || postData.transferAmount>this.transInfo.value){
                        this.$toast.fail(`转出金额范围0-${this.transInfo.value}`,{cover:true});
                        return;
                    }
                }else {
                    if(postData.transferAmount < 0 || postData.transferAmount>this.moneyInfo.balance - this.moneyInfo.walletBalance){
                        this.$toast.fail(`转入金额范围0-${this.moneyInfo.balance - this.moneyInfo.walletBalance}`,{cover:true});
                        return;
                    }
                }

                let loading = this.$toast.loading('提交中...');
                func.transfersMoney(postData).then((res) => {
                    loading.hide();
                    if(res.success){
                        this.$toast.success('转换成功',{cover:true});
                        this.isShowTransInOrOut=false;
                        this.getNoAutoTransferInfo();
                        this.reset();
                    }else {
                        this.$toast.fail(res.message,{cover:true,duration:4000});
                    }
                })

            },

            reset(){
                this.transferAmount = '';
                this.fastMoneyIndex = '';
            },

            refresh(apiId){
                if(apiId){//单个刷新
                    let loading = this.$toast.loading('刷新中...');
                    func.refreshApi({
                        apiId
                    }).then((res) => {
                        loading.hide();
                        if(res.success){
                            this.list.map((item,index) => {
                                if(res.data.apiName === item.textName){
                                    item.value = res.data.balance;
                                }
                            })
                            this.$toast.success('刷新成功',{cover:true});
                        }else {
                            this.$toast.fail(res.message,{cover:true,duration:4000});
                        }
                    })
                }else {
                    this.getNoAutoTransferInfo(2);
                }
			},
            changeTransType(newVal){
                let loading = this.$toast.loading('切换中...');
                func.postTransferModeChange({
                        freeWalletSwitch: newVal
                    }).then((res) => {
                        loading.hide();
                    if(res.success){
                        this.$toast.success(`${newVal === 1? '免转钱包' : '多钱包'}切换成功`,{cover:true});
                    }else {
                        this.$toast.fail(res.message,{cover:true,duration:4000});
                    }
                })
            }
		},
        
        watch: {
            freeWalletSwitch (newVal, oldVal) {
               
               if(newVal != oldVal && oldVal!=0){
                    this.changeTransType(newVal);
				}
            },
            transferAmount(newVal,oldVal){
				this.moneyChinese = this.filterAmount(newVal * 1);
			}
        },
    }
</script>

<style scoped lang="scss">
	.my-radio {
		font-size: 0.37rem;
		line-height: 1.07rem;
		/deep/ input {
			width: 0.48rem;
			height: 0.48rem;
		}
		/deep/ .nut-radio-label {
			font-size: 0.37rem;
			margin-right: 0.27rem;
		}
	}
	/deep/ .nut-radiogroup {
		display: inline-block;
		margin-left: .4rem;
	}

	.transfer-fixed {
		position: fixed;
		top: 1.17rem;
		left: 0;
		width: 100%;
	}

	.pk-trans-type {
		background: $default-bg-color;
		height: 1.06667rem;
		line-height: 1.06667rem;
		padding-left: .4rem;
		h2 {
			display: flex;
			justify-content: center;
			align-items: center;
			float: left;
			font-size: .4rem;
			i {
				display: inline-block;
				width: 0.37333rem;
				height: 0.37333rem;
				line-height: 0.37333rem;
				text-align: center;
				font-style: normal;
				border-radius: 50%;
				border: 2px solid #ff8d3a;
				color: #ff8d3a;
				margin-left: 0.13333rem;
				cursor: pointer;
			}
		}
	}

	.total-asset-info {
		width: 100%;
		height: 1.95rem;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 0.37rem 0;
		border-bottom: 1px solid $border-color;
		background-color: $default-color;
		.total-money-num {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			span {
				color: $primary-color;
				font-size: 0.35rem;
			}
			i {
				color: $primary-color;
				font-size: 0.40rem;
				font-style: normal;
			}
			&:last-child {
				border-left: 1px solid $border-color;
				span {
					color: #0ec392;
				}
				i {
					color: #0ec392;
				}
			}
		}
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;

		div {
			width: 50%;
			height: 0.80rem;
			line-height: 0.80rem;
			text-align: center;
			font-size: 0.37rem;
			color: $default-color;
			background: $primary-color;
			&:last-child {
				background: #0ec392;
			}

		}
	}

	.money-synchronise {
		height: 0.80rem;
		background-color: #F7F7F7;
		color: $normal-color;
		font-size: 12px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid $border-color;
		font-size: 0.32rem;
		i {
			font-style: normal;
		}
	}

	.all-items {
		padding-top: 4.6rem;
		.flex-content {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			padding: 0.27rem 0.29rem;
			border-right: 1px solid $border-color;
			border-bottom: 1px solid $border-color;
			background: $default-color;

			.item-name {
				width: 100%;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-start;
				margin-bottom: 0.27rem;
				span {
					color: $text-color;
					flex: 1;
					padding-right: 10px;
					font-size: 0.32rem;
				}
				img {
					width: 0.40rem;
					heigth: 0.40rem;
					vertical-align: middle;
				}
				i {
					font-style: normal;
					color: $primary-color;
				}
			}
			.item-num {
				color: $text-color;
				font-weight: normal;
				font-size: 0.32rem;
				width: 100%;
				display: flex;
				justify-content: space-between;
				i {
					font-style: normal;
					color: $primary-color;
					&.disabled{
						color:$placeholder-color;
						cursor: not-allowed;
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
		background: $nondefault-color;
		opacity: .4;
		z-index: 2;
	}

	.mask-box {
		position: fixed;
		z-index: 3;
		top: 50%;
		transform: translateY(-50%);
		width: 92%;
		opacity: 1;
		.mask-box-title {
			height: 1.07rem;
			line-height: 1.07rem;
			background: $default-color;
			border-radius: 0.27rem 0.27rem 0 0;
			padding: 0 .4rem;
			font-size: 0.43rem;
			color: $text-color;
			display: flex;
			justify-content: space-between;
			.close {
				border-radius: 0 0 .13333rem /* 10/75 */
				.13333rem /* 10/75 */
			;
				line-height: 1.06667rem /* 80/75 */
			;
				text-align: center;
				color: $text-color;
				font-size: .32rem /* 24/75 */
			;
				width: 1rem;
				text-align: center;
				margin-right: -.4rem;
			}
		}

		.mask-box-content {
			padding: .4rem;
			background: $default-color;
			border-radius: 0 0 0.27rem 0.27rem;
			img {
				width: 100%;
				display: block;
			}
		}

	}
</style>