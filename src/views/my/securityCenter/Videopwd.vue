<style lang="scss" scoped>
	@import "../../../components/scss/pk-pwd.scss";
	.videopwd {
		background: #dedede;
		.pk-bankcard {
			height: 100%;
			width: 100%;
			text-decoration: none;
			
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
	.tipbox {
		color: #757575;
		font-size: 0.32rem /* 24/75 */;
		text-align: center;
		margin-top: 0.24rem /* 18/75 */;
		margin-bottom: 0.33333rem; /* 25/75 */
    }
    
</style>
<style lang="scss">
	.nut-button {
		height: 0.96rem /* 72/75 */;
		background: #151515;
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
	<div class="videopwd" ref="videopwd">
		<nut-navbar class="info-header" @on-click-back="back('securityCenter')">
			修改视讯密码
			<a class="spans" slot="back-icon">
				<img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png">
			</a>
			<a class="spans" slot="more-icon" v-if="false"></a>
		</nut-navbar>
		<div class="pk-form-content">
			<div class="pk-input mgb30">
				<label>登录密码</label>
				<nut-col :span="16">
					<div class="flex-content el-input">
						<input type="password" class="inputs" placeholder="请输入您的登录密码">
					</div>
				</nut-col>
			</div>
		</div>
		<div class="pk-form-content">
			<div class="pk-input pad0">
				<nut-cell
					class="pk-bankcard"
					:class="{'pk-bankcard-active':bankcardActive}"
					:showIcon="true"
					:isLink="true"
					@click.native="switchPicker('isVisible1')"
				>
					<span slot="title">
						<label class="noline">视讯</label>
					</span>
					<div slot="desc" class="selected-option">
						<span class="show-value">{{year ? year : '请选择视讯'}}</span>
					</div>
				</nut-cell>
				<nut-picker
					title="请选择视讯"
					:is-visible="isVisible1"
					:default-value-data="defaultValueData1"
					:list-data="listData1"
					@close="switchPicker('isVisible1')"
					@confirm="setYearValue"
				></nut-picker>
			</div>
			<div class="pk-input">
				<label>视讯密码</label>
				<nut-col :span="16">
					<div class="flex-content el-input">
						<input
							@input="p_len"
							v-model="password"
							class="inputs"
							type="password"
							placeholder="请输入您的视讯密码"
						>
					</div>
				</nut-col>
			</div>
			<div class="gb-stressed">
				<p id="PStrength">
					密码强度
					<i :class="{ 'active': contains_lovercase }"></i>
					<i :class="{ 'active': contains_number }"></i>
					<i :class="{ 'active': contains_uppercase }"></i>
				</p>
			</div>
			<div class="pk-input">
				<label>确认密码</label>
				<nut-col :span="16">
					<div class="flex-content el-input">
						<input class="inputs" type="password" placeholder="请输入新密码">
					</div>
				</nut-col>
			</div>
		</div>
		<p class="tipbox">密码长度6-20位，可以使用字母、数字、特殊字符、区分大小写</p>
		<div class="btns">
			<nut-button block shape="circle">修改</nut-button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			password: null,
			password_length: 0,
			typed: false,
			contains_lovercase: false,
			contains_number: false,
			contains_uppercase: false,
			valid_password_length: false,
			valid_password: false,
			special_char: false,

			year: null,
			isVisible1: false,
			defaultValueData1: null,
			listData1: [
				[
					"请选择游戏123",
					"请选择游戏Avb",
					"Asdfsfd",
					"201334345435",
					"请选择游戏",
					"ASDSF",
					"游戏游戏游戏",
					"2017",
					"2018"
				]
			]
		};
	},
	created() {},
	mounted() {
		this.$refs.videopwd.style.height = window.innerHeight + "px";
	},
	methods: {
		back(path) {
			this.$router.push({
				name: path
			});
		},
		p_len: function() {
			this.password_length = this.password.length;
			if (this.password_length > 7) {
				this.valid_password_length = true;
			} else {
				this.valid_password_length = false;
			}

			if (this.password_length > 0) {
				this.typed = true;
			} else {
				this.typed = false;
			}

			this.contains_lovercase = /[a-z]/.test(this.password);
			this.contains_number = /\d/.test(this.password);
			this.contains_uppercase = /[A-Z]/.test(this.password);
			this.special_char = /\W/.test(this.password);

			// Check if the password is valid
			if (
				this.contains_lovercase == true &&
				this.contains_number == true
			) {
				this.valid_password = false;
				if (
					this.contains_uppercase == true &&
					this.valid_password_length == true
				)
					this.valid_password = true;
			} else {
				this.valid_password = false;
			}

			if (
				this.contains_lovercase &&
				this.contains_number &&
				this.special_char &&
				this.contains_uppercase &&
				this.valid_password_length
			) {
				this.contains_lovercase = true;
				this.contains_number = true;
				this.contains_uppercase = true;
			} else if (
				(this.contains_lovercase &&
					this.contains_number &&
					this.valid_password_length) ||
				(this.contains_lovercase &&
					this.contains_uppercase &&
					this.valid_password_length) ||
				(this.contains_number &&
					this.contains_uppercase &&
					this.valid_password_length)
			) {
				this.contains_lovercase = true;
				this.contains_number = true;
				this.contains_uppercase = false;
			} else if (
				this.contains_lovercase ||
				this.contains_number ||
				this.contains_uppercase
			) {
				this.contains_lovercase = true;
				this.contains_uppercase = false;
				this.contains_number = false;
			}
		},
		switchPicker(param) {
			this[`${param}`] = !this[`${param}`];
		},
		setYearValue(chooseData) {
			// this.year = `${chooseData[0]}年`;
			this.year = chooseData[0];
			this.bankcardActive = true;
			console.log(chooseData[0], "chooseData[0]");
		}
	}
};
</script>
