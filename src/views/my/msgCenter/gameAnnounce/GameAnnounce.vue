<template>
	<div class="gameAnnounce">
		<div class="mine-form pk-1px-b">
			<div class="pk-datafilter">
				<div class="datafilter">
					<nut-datepicker
						class="begin-time"
						:is-visible="beginVisible"
						type="date"
						title="开始时间"
						:is-show-chinese="false"
						defaultValue
						@close="beginPicker('beginVisible')"
						@choose="beginChoose"
					></nut-datepicker>
					<span class="input-date">
						<input
							@click="clickBegin()"
							type="datetime"
							class="date"
							v-model="startTime"
							readonly
						/>
					</span>
					~
					<nut-datepicker
						class="begin-time"
						:is-visible="endVisible"
						type="date"
						title="结束时间"
						:is-show-chinese="false"
						defaultValue
						@close="endPicker('endVisible')"
						@choose="endChoose"
					></nut-datepicker>
					<span class="input-date">
						<input
							@click="clickEnd()"
							type="datetime"
							class="date"
							v-model="endTime"
							readonly
						/>
					</span>
					<!-- <a class="btn" @click="messageBtn()">搜索</a> -->
				</div>
				<div class="input-dates input-game">
					<nut-cell
						:showIcon="true"
						:isLink="true"
						@click.native="switchPicker('isVisible1')"
					>
						<!-- <span slot="title">
							<label>年选择</label>
						</span>-->
						<!-- <span slot="sub-title">单列~~~</span> -->
						<div slot="desc" class="selected-option">
							<!-- <span class="btn" @click.stop.prevent="modifyYear">修改为指定的年份</span> -->
							<span class="show-value">{{
								year ? year : "请选择"
							}}</span>
						</div>
					</nut-cell>
					<nut-picker
						title="请选择游戏"
						:is-visible="isVisible1"
						:default-value-data="defaultValueData1"
						:list-data="listData1"
						@close="switchPicker('isVisible1')"
						@confirm="setYearValue"
					></nut-picker>
				</div>
			</div>
		</div>
		<div class="notice-list">
			<ul class="noticeGamePartial">
				<li
					@click="goPath(item.id, 1)"
					v-for="(item, i) in gameNoticeList"
					:key="i"
				>
					<div class="i">
						<div class="ct">
							<p>{{ item.context }}</p>
						</div>
						<p>
							{{ item.title }}
							{{ item.publishTime | filterDate }}
						</p>
					</div>
				</li>
			</ul>
			<no-data
				v-show="gameNoticeList == null || !gameNoticeList.length > 0"
			></no-data>
		</div>
	</div>
</template>
<script>
import { getGameNotice, getGameType } from "@/services/msgCenter.js";
import noData from "@/components/NoData.vue";

export default {
	components: {
		noData
	},
	data() {
		return {
			tryList: [], //保存的下拉框信息
            gameNoticeList: [], //列表信息
            first: false,

			firstName: null, //下拉框第一次值
			searchGameType: null, //下拉框值

			beginVisible: false,
			endVisible: false,
			startTime: "",
			endTime: "",
			// flag: 2,//1,为渲染返回页面，2，为不渲染

			year: null,
			isVisible1: false,
			defaultValueData1: null,
			listData1: [
				[
					// "请选择游戏123",
					// "请选择游戏Avb",
					// "Asdfsfd",
					// "201334345435",
					// "请选择游戏",
					// "ASDSF",
					// "游戏游戏游戏",
					// "2017",
					// "2018"
				]
			]
		};
	},
	mounted() {
		var _this = this;
		this.timeFormate();
		this.searchGameType =
			this.$route.query.searchGameType * 1 || this.searchGameType;
		this.getGameNoticeList();
		if (this.$route.query.searchGameType && !this.first) {
            console.log(this.$route.query.searchGameType, "123456");
            var type = this.$route.query.searchGameType;
			getGameType().then(res => {
				if (res.success) {
					this.listData1[0] = [];
					res.data.map(v => {
						this.listData1[0].push(v.apiName);
						if (v.apiId == type * 1) {
							_this.year = v.apiName;
                        }
                        console.log(_this.year,type,"123456")
						return;
					});
					console.log(_this.year, "this.year", res.data);
				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 1000
					});
				}
            });
            this.first = true;
            
		} else {
			this.getToSelect();
        }
        if(this.first){
            this.getToSelect();
        }
	},
	watch: {
		searchGameType(newValue) {
			this.getGameNoticeList();
		},
		startTime(newValue) {
			this.getGameNoticeList();
		},
		endTime(newValue) {
			this.getGameNoticeList();
		}
	},
	methods: {
		getToSelect() {
			this.tryList = [];
			getGameType().then(res => {
				if (res.success) {
					this.listData1[0] = [];
					res.data.map(v => {
						this.listData1[0].push(v.apiName);
					});
					this.tryList = res.data;
					this.firstName = this.listData1[0][0];
					// this.year = this.listData1[0][0]
				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		//时间插件默认值设置开始
		timeFormate() {
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
			this.endTime = year + seperator1 + month + seperator1 + strDate;
			this.startTime = this.endTime;

			// this.flag = this.$route.query.flag || this.flag;
			this.startTime = this.$route.query.startTime || this.startTime;
			this.endTime = this.$route.query.endTime || this.endTime;
		},
		beginPicker(param) {
			this[`${param}`] = !this[`${param}`];
		},
		endPicker(param) {
			this[`${param}`] = !this[`${param}`];
		},
		beginChoose(param) {
			this.startTime = param[3];
		},
		endChoose(param) {
			this.endTime = param[3];
		},
		clickBegin() {
			this.beginVisible = !this.beginVisible;
		},
		clickEnd() {
			this.endVisible = !this.endVisible;
		},
		//时间插件默认值设置
		goPath(id, status) {
			this.$router.push({
				name: "msgDetail",
				query: {
					id: id,
					status: status,
					startTime: this.startTime,
					endTime: this.endTime,
					searchGameType: this.searchGameType
				}
			});
		},
		getGameNoticeList() {
			let data = {
				startTime: this.startTime,
				endTime: this.endTime,
				apiId: this.searchGameType
			};
			getGameNotice(data).then(res => {
				console.log(res);
				if (res.success) {
					this.gameNoticeList = res.data.list;
					console.log(this.gameNoticeList);
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
		setYearValue(chooseData) {
			this.year = chooseData[0] || this.firstName;
			this.tryList.map(v => {
				if (v.apiName == this.year) {
					this.searchGameType = v.apiId;
				}
			});
			console.log(
				this.tryList,
				chooseData[0],
				"chooseData[0]",
				this.searchGameType
			);
		}
	}
};
</script>
<style lang="scss" scoped>
	@import "../../../../components/scss/pk-pwd.scss";
	.gameAnnounce {
		background: $default-bg-color;
		.no-data {
			height: 5.33333rem /* 400/75 */;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.contentp {
				font-size: 0.37333rem /* 28/75 */;
				text-align: center;
				.imgs {
					display: block;
					width: 5.33333rem /* 400/75 */;
					height: 3.84rem /* 288/75 */;
					img {
						display: block;
						width: 100%;
					}
				}
			}
			.contentmsg {
				display: flex;
				flex-direction: column;
				align-items: center;
				p {
					font-size: 0.46667rem /* 35/75 */;
					color: $tip-color;
				}
			}
		}
		.mine-form {
			// height:
			position: relative;
			width: 100%;
			.pk-datafilter {
				width: 100%;
				color: #333;
				background-color: $default-bg-color;
				font-size: 10px;
				display: flex;
				align-items: center;
				justify-content: space-around;
				.input-dates {
					display: inline-block;
					position: relative;
					width: 2.93333rem /* 220/75 */;
					height: 0.66667rem /* 50/75 */;
					background-color: #fff;
					border-radius: 0.2rem /* 15/75 */;
					a.icondate {
						display: inline-block;
						width: 0.26667rem /* 20/75 */;
						height: 0.33333rem /* 25/75 */;
						background: url("../../../../assets/img/ico-cal.png")
							no-repeat center;
						background-size: 0.24rem /* 18/75 */ auto;
						// position: absolute;
						z-index: 1;
						top: 0.16rem /* 12/75 */;
						left: 0.13333rem /* 10/75 */;
						z-index: 10;
					}
					a {
						position: absolute;
					}
					.date {
						padding: 0;
						height: 0.66667rem /* 50/75 */;
						line-height: 0.30667rem /* 23/75 */;
						color: #333;
						background-color: #fff;
						font-size: 0.26667rem /* 20/75 */;
						width: 100%;
						text-align: center;
						position: relative;
						border-radius: 0.13333rem /* 10/75 */;
					}

					/deep/ .nut-cell {
						.nut-cell-box {
							min-height: 0.66667rem /* 50/75 */;
							.nut-cell-right {
								.nut-cell-desc {
									margin-right: 0.13333rem /* 10/75 */;
								}
							}
						}
					}
				}
				.input-game {
					margin-left: -1rem;
					width: 2.6rem;
					margin-left: 0.3rem;
					background: #efefef;
					/deep/ .nut-cell {
						width: 2.3rem;
						//  .nut-cell-box{
						//      .nut-cell-right{
						//          .nut-cell-desc{

						//          }
						//      }
						//  }
						padding-left: 0;
						padding-right: 0;
						.nut-cell-icon {
							margin-right: 0.13333rem /* 10/75 */;
							img {
								margin-left: 0;
							}
						}
					}
				}
			}
			margin-bottom: 0.26667rem /* 20/75 */;
		}
		.notice-list {
			background: $default-bg-color;
			padding: 0.26667rem;
			margin: 0;
		}
		.datafilter {
			position: relative;
			padding: $tenrem;
			.begin-time {
				display: inline-block;
			}
			.input-date {
				display: inline-block;
				width: 30%;
				input {
					position: relative;
					padding: $tenrem 0;
					width: 95%;
					border: $onerem solid $rec-border-color;
					border-radius: $onerem * 2;
					height: $four;
					line-height: $four;
					text-align: center;
				}
			}
			.btn {
				display: inline-block;
				padding: 0;
				width: 15%;
				height: $four * 1.7;
				line-height: $four * 1.7;
				font-size: 0.3733rem;
				text-align: center;
				white-space: nowrap;
				border-radius: $onerem * 3;
				color: $default-color;
				background: $recommend-bg;
				&:hover {
					text-decoration: none;
				}
			}
			&::after {
				position: absolute;
				left: $twentyrem;
				right: $twentyrem;
				bottom: 0;
				content: "";
				height: 1px;
				background: $border-color;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
			}
			/deep/ .capitaltype {
				.nut-actionsheet-panel {
					.nut-actionsheet-item {
						height: $twentyrem !important;
					}
				}
			}
		}
	}
</style>
