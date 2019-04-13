<template>
	<div class="editpwd" ref="editpwd">
		<nut-navbar
			class="info-header"
			:rightShow="false"
			@on-click-back="back('securityCenter')"
		>
			修改登录密码
			<a class="spans" slot="back-icon"
				><img
					class="imgsbank"
					src="../../../assets/img/my-icon/fanhui.png"
			/></a>
		</nut-navbar>
		<div class="pk-form-content">
			<div class="pk-input">
				<label>当前密码</label>
				<nut-col :span="16">
					<div class="flex-content el-input">
						<input
							v-model="oldpassword"
							type="password"
							class="inputs"
							placeholder="请输入当前密码"
						/>
					</div>
				</nut-col>
			</div>
			<div class="pk-input">
				<label>新密码</label>
				<nut-col :span="16">
					<div class="flex-content el-input">
						<input
							@input="p_len"
							v-model="password"
							class="inputs"
							type="password"
							placeholder="请输入新密码"
						/>
					</div>
				</nut-col>
			</div>
			<div class="gb-stressed">
				<p id="PStrength">
					密码强度
					<i :class="{ active: contains_lovercase }"></i>
					<i :class="{ active: contains_number }"></i>
					<i :class="{ active: contains_uppercase }"></i>
				</p>
			</div>
			<div class="pk-input">
				<label>确认密码</label>
				<nut-col :span="16">
					<div class="flex-content el-input">
						<input
							class="inputs"
							type="password"
							placeholder="请输入新密码"
							v-model="rePassword"
						/>
					</div>
				</nut-col>
			</div>
		</div>
		<div class="btns">
			<nut-button block shape="circle" @click="modify()">修改</nut-button>
		</div>
	</div>
</template>
<script>
import {
	modifyLoginPwd,
	modifyWithdrawlPwd
} from "../../../services/securityCenter.js";
export default {
	data() {
		return {
			oldpassword: null, //旧密码
			password: null, //新密码
			rePassword: null, //确认密码
			password_length: 0,
			typed: false,
			contains_lovercase: false,
			contains_number: false,
			contains_uppercase: false,
			valid_password_length: false,
			valid_password: false,
            special_char: false,
            passFlag:false, //是否通过长度校验
            passPower:false //密码强度校验
		};
	},
	mounted() {
		this.$refs.editpwd.style.height = window.innerHeight + "px";
	},
	watch: {},
	methods: {
		modify() {
            if(!this.passFlag){
                return this.$toast.fail("请输入5-12位密码", {
					cover: true,
					duration: 1000
				});
            }
            if(!this.passPower){
                return this.$toast.fail("请输入字母数字组合的密码", {
					cover: true,
					duration: 1000
				});
            }
			if (this.password != this.rePassword) {
				return this.$toast.fail("两次输入密码不一致", {
					cover: true,
					duration: 1000
				});
			}
			var post = {
				password: this.oldpassword,
				newPassword: this.password
            };
            console.log(post,this.rePassword)
			modifyLoginPwd(post).then(res => {
				if (res.success) {
					this.$toast.success("登录密码修改成功", {
						cover: true,
						duration: 1000
					});
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
		p_len: function() {
            //满足一项为弱 纯数字 纯字母
            // 数字字母组合为中 大小写
            // 特殊字符 数字字母组合为强
            this.password_length = this.password.length;
            if (this.password_length > 4&&this.password_length<13) {
                this.passFlag=true
            }else{
               this.passFlag=false 
            }
			if (this.password_length > 4) {
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
                this.passPower=true;
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
                this.passPower=true;
			} else if (
				this.contains_lovercase ||
				this.contains_number ||
				this.contains_uppercase
			) {
				this.contains_lovercase = true;
				this.contains_uppercase = false;
                this.contains_number = false;
                this.passPower=false;
			}
		}
	}
};
</script>
<style lang="scss" scoped>
	@import "../../../components/scss/pk-pwd.scss";
	.editpwd {
		background: $center-background;
	}
	.nut-button {
		height: 0.96rem /* 72/75 */;
		background: $index-banner-bg;
		font-size: 0.34667rem /* 26/75 */;
	}
	.nut-button.circle {
		border-radius: 0.13333rem /* 10/75 */;
	}
</style>