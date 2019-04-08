<style lang="scss" scoped>
	@import "../../../components/scss/pk-pwd.scss";
	.bankcard {
		background: $center-background;
		.pk-form-content {
			padding-left: 0.4rem;
		}
		.pk-input {
			padding-left: 0;
			label {
				font-size: 0.29333rem /* 22/75 */;
			}
		}
		.names {
			color: $bank-card-color;
			text-align: right;
		}
		.pk-bankcard {
			height: 100%;
			width: 100%;
			// padding: 0 0.26667rem;
			// padding-right: 0.5rem;
			text-decoration: none;
			padding-left: 0;
			background-color: $default-color !important;
			span,
			label {
				font-size: 0.29333rem;
			}
		}

		/deep/.nut-actionsheet-menu {
			display: none;
		}
	}
	small {
		color: $label-color;
	}
</style>
<style lang="scss">
	.nut-button {
		height: 0.96rem /* 72/75 */;
		background: $index-banner-bg;
		font-size: 0.34667rem /* 26/75 */;
	}
	.nut-button.circle {
		border-radius: 0.13333rem /* 10/75 */;
	}
	.pk-bankcard-active {
		.show-value {
			color: $about-color !important;
		}
	}
	.pk-bankcard {
		.nut-cell-box {
			min-height: 1.06667rem /* 80/75 */;
			.nut-cell-right {
				.nut-cell-icon {
					img {
						margin-left: 0.08rem /* 6/75 */;
					}
				}
			}
		}
		.show-value {
			color: $color-W;
		}
	}
</style>

<template>
	<div class="bankcard" ref="bankcard">
		<nut-navbar
			class="info-header"
			:rightShow="false"
			@on-click-back="back('securityCenter')"
		>
			修改取款密码
			<a class="spans" slot="back-icon">
				<img
					class="imgsbank"
					src="../../../assets/img/my-icon/fanhui.png"
				/>
			</a>
			<a class="spans" slot="more-icon" v-if="false"></a>
		</nut-navbar>
		<div class="pk-form-content mgb30">
			<div class="pk-input">
				<label>
					登录密码：
				</label>
				<nut-col :span="9">
					<div class="flex-content el-input">
						<!-- <p class="names">p*d</p> -->
						<input
							type="password"
							class="inputs"
							placeholder="请输入您的登录密码"
						/>
					</div>
				</nut-col>
			</div>
		</div>
		<div class="pk-form-content">
			<div class="pk-input">
				<label>取款密码：</label>
				<nut-col :span="16">
					<div class="flex-content el-input">
						<input
							type="password"
							class="inputs"
							placeholder="请输入您的取款密码"
						/>
					</div>
				</nut-col>
			</div>
			<div class="pk-input">
				<label>
					确认新密码：
				</label>
				<nut-col :span="16">
					<div class="flex-content el-input">
						<input
							type="text"
							class="inputs"
							placeholder="请再次输入您的取款密码"
						/>
					</div>
				</nut-col>
			</div>
		</div>
		<div class="btns">
			<nut-button block shape="circle">保存设置</nut-button>
		</div>
	</div>
</template>
<script>
import { memBankList } from "@/services/securityCenter.js";
export default {
	data() {
		return {
			bankcardActive: false,
			isVisible: false,
			date: null,

			year: null,
			isVisible1: false,
			defaultValueData1: null,
			listData1: [],
			backList: [],
			bankId: null
		};
	},
	mounted() {
		this.$refs.bankcard.style.height = window.innerHeight + "px";
		this.getBankList();
	},
	methods: {
		getBankList() {
			memBankList().then(res => {
				if (res.success) {
					let data = res.data;
					if (data) {
						var arr = [];
						data.map(v => {
							arr.push(v.bankName);
						});
						this.backList = data;
						this.listData1.push(arr);
					}
				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		back(path) {
			this.$router.push({
				name: path
			});
		},
		switchPicker(param) {
			this[`${param}`] = !this[`${param}`];
		},
		setYearValue(chooseData) {
			// this.year = `${chooseData[0]}年`;
			this.year = chooseData[0];
			this.bankcardActive = true;
			console.log(chooseData[0], "chooseData[0]");
			var data = this.backList;
			if (data) {
				data.map(v => {
					if (this.year == v.bankName) {
						this.bankId = v.bankId;
					}
				});
				console.log(this.bankId, "this.bankId");
			}
		}
	}
};
</script>
