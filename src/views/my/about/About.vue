<template>
	<div class="about" ref="about">
		<nut-navbar class="pk-title" :rightShow="false" @on-click-back="back('my')">
			账号信息
			<a class="spans" slot="back-icon">
				<img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png"/>
			</a>
		</nut-navbar>
		<div class="pk-form-content">
			<div class="pk-input">
				<label>头像</label>
				<img
					class="icon-img"
					src="../../../assets/img/my-icon/icon_visitor@3x.png"
					alt
				/>
			</div>
			<div class="pk-input">
				<label>姓名</label>
				<nut-col :span="16" class="pk-foricon">
					<div class="flex-content el-input">
						<!-- :disabled="realNames!=''" -->
						<input
							disabled
							class="inputs"
							type="text"
							placeholder="设置"
							v-model="user.realName"
						/>
						<i>
							<img :src="youSrc" alt />
						</i>
					</div>
				</nut-col>
			</div>
			<div class="pk-input">
				<label>昵称</label>
				<nut-col :span="16" class="pk-foricon">
					<div class="flex-content el-input">
						<input
							class="inputs"
							type="text"
							placeholder="设置"
							v-model="user.nickname"
						/>
						<i>
							<img :src="youSrc" alt />
						</i>
					</div>
				</nut-col>
			</div>
			<div class="pk-input">
				<label>身份证</label>
				<nut-col :span="16" class="pk-foricon">
					<div class="flex-content el-input">
						<input
							:disabled="idCardf != ''"
							class="inputs"
							type="text"
							placeholder="设置"
							v-model="user.idCard"
						/>
						<i>
							<img :src="youSrc" alt />
						</i>
					</div>
				</nut-col>
			</div>
			<div class="pk-input">
				<label>手机</label>
				<nut-col :span="16" class="pk-foricon">
					<div class="flex-content el-input">
						<input
							class="inputs"
							type="text"
							placeholder="设置"
							v-model="user.mobile"
						/>
						<i>
							<img :src="youSrc" alt />
						</i>
					</div>
				</nut-col>
			</div>
			<div class="pk-input">
				<label>邮箱</label>
				<nut-col :span="16" class="pk-foricon">
					<div class="flex-content el-input">
						<input
							class="inputs"
							type="text"
							placeholder="设置"
							v-model="user.email"
						/>
						<i>
							<img :src="youSrc" alt />
						</i>
					</div>
				</nut-col>
			</div>
			<div class="pk-input">
				<label>QQ</label>
				<nut-col :span="16" class="pk-foricon">
					<div class="flex-content el-input">
						<input
							class="inputs"
							type="text"
							placeholder="设置"
							v-model="user.qq"
						/>
						<i>
							<img :src="youSrc" alt />
						</i>
					</div>
				</nut-col>
			</div>
			<div class="pk-input">
				<label>微信号</label>
				<nut-col :span="16" class="pk-foricon">
					<div class="flex-content el-input">
						<input
							class="inputs"
							type="text"
							placeholder="设置"
							v-model="user.wechat"
						/>
						<i>
							<img :src="youSrc" alt />
						</i>
					</div>
				</nut-col>
			</div>
			<div class="pk-input pad0">
				<nut-cell
					class="pk-borth"
					:class="{ 'pk-place-active': placeActive || city!=null || city!='' }"
					:showIcon="true"
					:isLink="true"
					@click.native="switchPicker('isVisibles')"
				>
					<span slot="title">
						<label class="noline">所在地</label>
					</span>
					<div slot="desc" class="selected-option">
						<!-- <span class="btn" @click.stop.prevent="modifyCity">修改为指定的城市</span> -->
						<span class="show-value">{{
							city ? city : "选择"
						}}</span>
					</div>
				</nut-cell>
				<nut-picker
					:is-visible="isVisibles"
					title="请选择城市"
					:list-data="andCountry"
					:default-value-data="defaultValueData"
					@close="switchPicker('isVisibles')"
					@confirm="setChooseValues"
					@choose="updateChooseValue"
					@close-update="closeUpdateChooseValue"
				></nut-picker>
			</div>
			<div class="pk-input pad0">
				<!-- <label>生日</label> -->
				<!-- <nut-col :span="16" class="pk-foricon"> -->
				<nut-cell
					class="pk-borth"
					:class="{ 'pk-borth-active': borthActive }"
					:showIcon="true"
					:isLink="true"
					@click.native="switchPicker('isVisible')"
				>
					<span slot="title">
						<label class="noline">生日</label>
					</span>
					<div slot="desc" class="selected-option">
						<span class="show-value">{{
							dates ? dates : "选择"
						}}</span>
					</div>
				</nut-cell>
				<nut-datepicker
					:is-visible="isVisible"
					type="date"
					title="请选择日期"
					:is-show-chinese="false"
					startDate="1900-01-01"
					@close="switchPicker('isVisible')"
					@choose="setChooseValue"
				></nut-datepicker>
				<!-- </nut-col> -->
			</div>
		</div>
		<div class="bot">
			<p>最近登录: {{ user.lastLoginTime | filterDate }}</p>
		</div>
		<div class="btns">
			<nut-button block shape="circle" @click="updateUser"
				>保存</nut-button
			>
		</div>
	</div>
</template>
<script>
import { getUserInfo, updateUser } from "@/services/about.js";
import worldaddress from "@/components/json/world.json";

export default {
	data() {
		return {
			endDate: "",
			user: {},
			realNames: "", //检验姓名是否为空
			idCardf: "", //检验身份证是否为空

			borthActive: false,
			youSrc:
				"data:image/svg+xml,%3Csvg viewBox='0 0 5 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.215 9.757l3.577-4.17a.931.931 0 0 0 0-1.173L1.215.244a.642.642 0 0 0-1.007 0 .929.929 0 0 0 0 1.172L3.283 5 .208 8.584a.93.93 0 0 0 0 1.173.643.643 0 0 0 1.007 0z' fill='rgb(200,200,205)'/%3E%3C/svg%3E",
			loginTime: "2018.4.23 23:23:11",
			isVisible: false,
			date: null,
			dates: null,

			city: null,
			isVisibles: false,
			placeActive: false,
            defaultValueData: null,
            // 地区选择
            countryList: [],
            countryObj:{},
            countrySub:{},
            andCountry:[],
		};
	},
	created() {
		console.log(worldaddress, "worldaddress");
        this.forEndDate();
        this.andCountry[0] = this.countryList
        this.hasPlace();
	},
	mounted() {
		this.$refs.about.style.height = window.innerHeight + "px";
		
        this.getUser();
		this.createPlace();
        
	},
	methods: {
		createPlace() {
			//第一个数组 为 国家
			//第二个数组 为 省份
			//第三个数组 为 市县
            // 即 当第一个数组变的时候 第二个数组默认选中对应的第一项 第三个数组默认选中对应的第一项 watch
            this.andCountry = [
				...[this.countryList[0]],
				this.countryObj[this.countryObj[0][0]],
				this.countrySub[this.data[this.countryObj[0][0]]]
			];
			// console.log(this.andCountry, "this.listData");
		},
		hasPlace() {
			var indexs = 0;
			var provinceIndex = 0;
			var cityIndex = 0;
			Object.keys(worldaddress.Earth.Country).map((v, i) => {
				var country = worldaddress.Earth.Country[v * 1].CountryName;
				// console.log(country,'country',this.defaultValueDatas[0])
                this.countryList.push(country)
					var Station = worldaddress.Earth.Country[i].Station;
                    // console.log("Station",Station)
					if (!Station) {
						return;
                    }
                    var arrStation=[]
					Station.map((v2, i2) => {
							var StationName =
								worldaddress.Earth.Country[i].Station[
									i2
                                ].StationName;
                                
							if (!StationName) {
								return;
                            }
                            arrStation.push(StationName)
                            var City =
								worldaddress.Earth.Country[i].Station[
									i2
                                ].City;
                            if(!City) return
                            var cityArr = []
                            if (City.constructor === Object) {
								cityArr.push(City.CityName)
							}
							if (City.constructor === Array) {
								City.map((v3, i3) => {
                                    cityArr.push(v3.CityName)
								});
							}
                            this.countrySub[StationName] = cityArr;
                            this.countryObj[country] = arrStation;
					});
            });
            // console.log(this.countryObj,'this.countryObj',this.countrySub)
		},
		back(path) {
			this.$router.push({
				name: path
			});
		},
		getUser() {
			getUserInfo().then(res => {
				if (res.success) {
					this.user = res.data.user;
					this.realNames = this.user.realName;
					this.idCardf = this.user.idCard;

					console.log(res.data.user, "res");
                    this.dates = this.user.birthday;
                    this.defaultValueData = [this.user.country, this.user.province,this.user.city];
					if (this.dates != "" && this.dates != null) {
						this.borthActive = true;
					}
				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		forEndDate() {
			var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			this.endDate = year + seperator1 + month + seperator1 + strDate;
			console.log(this.endDate, "this.endDate");
		},
		updateUser() {
            this.user.city = this.citys;
            this.user.country = this.country;
            this.user.province = this.province;
			updateUser(this.user).then(res => {
				if (res.success) {
					this.$toast.success(res.message, {
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
		switchPicker(param) {
			this[`${param}`] = !this[`${param}`];
		},
		setChooseValue(param) {
			this.dates = param[3];
			this.borthActive = true;
			this.user.birthday = this.dates;
			console.log(this.dates, "this.dates");
		},

		setChooseValues(chooseData) {
            this.city = `${chooseData[0]}-${chooseData[1]}${chooseData[2] ? '-' + chooseData[2] : ''}`;
            this.country = chooseData[0];
            this.province = chooseData[1];
            this.citys = chooseData[2];
		},
		updateLinkage(self, value, index, chooseValue, cacheValueData) {
            if (!value) {
                return false;
            }
            switch(index) {
                case 1: 
                    let i = this.andCountry[0].indexOf(value);
                    this.andCountry.splice(index, 1, [...this.countryObj[this.andCountry[0][i]]]);
                    chooseValue = chooseValue ? chooseValue : this.andCountry[index][0];
                    self && self.updateChooseValue(self, index, chooseValue);
                    this.updateLinkage(self, chooseValue, 2, (cacheValueData && cacheValueData[2] ? cacheValueData[2] : null));
                    break;
                case 2: 
                    let areaData = this.countrySub[value] ? this.countrySub[value] : []; 
                    this.andCountry.splice(index, 1, [...areaData]);
                    chooseValue = chooseValue ? chooseValue : this.andCountry[index][0];
                    self && self.updateChooseValue(self, index, chooseValue);
                    break;
            }
		},

		updateChooseValue(self, index, value, cacheValueData) {
            index < 2 && this.updateLinkage(self, value, index + 1, null);
            this.placeActive = true;
		},

		closeUpdateChooseValue(self, chooseData) {
			this.updateLinkage(
				self,
				chooseData[0],
				1,
				chooseData[1],
				chooseData
			);
		}
	}
};
</script>
<style lang="scss" scoped>
	@import "../../../components/scss/pk-pwd.scss";
	.height100b {
		height: 100%;
	}
	.width100b {
		width: 100%;
	}
	.pk-borth {
		height: 100%;
		width: 100%;
		font-size: 0.4rem /* 30/75 */;
		line-height: 1.22667rem /* 92/75 */;
		padding: 0 0.26667rem;
		padding-right: 0.5rem;
		text-decoration: none;
		background-color: $forminput-color !important;
		span,
		label {
			font-size: 0.4rem /* 30/75 */;
		}
        /deep/ .nut-cell-box{
            .nut-cell-left{
                min-width: 1.86667rem /* 140/75 */;
            }
        }
	}
	.pk-borth-active,
	.pk-place-active {
		.show-value {
			color: #141414 !important;
		}
	}
	.bot {
		height: 1.22667rem /* 92/75 */;
		line-height: 1.22667rem /* 92/75 */;
		text-align: center;
		font-size: 0.4rem /* 30/75 */;
	}

	.about {
		background-color: $forminput-color;
		.pk-form-content {
			background-color: $forminput-color;
			.pk-input {
				position: relative;
				display: flex;
				padding: 0 0.26667rem /* 20/75 */;
				height: 1.22667rem /* 92/75 */;
				justify-content: space-between;
				font-size: 0.4rem /* 30/75 */;
				color: $about-color;
				align-items: center;
				.icon-img {
					width: 1rem;
					height: 1rem;
				}
				&::after {
					content: " ";
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					height: 0.01333rem /* 1/75 */;
					border-bottom: 0.01333rem /* 1/75 */ solid $inputbotline-color;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
				}
				.pk-foricon {
					height: 100%;
					padding-right: 0.53333rem /* 40/75 */;
				}
				.el-input {
					width: 100%;
					position: relative;
					input {
						width: 100%;
						height: 1.22667rem /* 92/75 */;
						border: none;
						text-align: right;
						background-color: $forminput-color;
					}
					i {
						position: absolute;
						right: -0.5rem /* 30/75 */;
						width: 0.37333rem /* 28/75 */;
						height: 0.34667rem /* 26/75 */;
						top: 32%;
						img {
							width: 0.18667rem /* 14/75 */;
							margin-top: -10px;
						}
					}
				}
			}
		}
	}
	.nut-cell .nut-cell-title,
	.nut-cell .nut-cell-right {
		font-size: 0.4rem;
	}
	.nut-cell .nut-cell-icon img {
		display: none;
	}
	.nut-button {
		height: 0.96rem /* 72/75 */;
		background: $index-banner-bg;
		font-size: 0.34667rem /* 26/75 */;
	}
	.nut-button.circle {
		border-radius: 0.13333rem /* 10/75 */;
	}
	/deep/ .nut-cell .nut-cell-box {
		min-height: 1.22667rem /* 92/75 */;
		.nut-cell-right {
			.nut-cell-desc {
				.selected-option {
					.show-value {
						color: $placeholder-color;
					}
				}
			}
		}
	}
	/deep/ .nut-cell .nut-cell-icon img {
		margin-left: 6px;
	}
</style>
