<style lang="scss" scoped>
	@import "./betRecord.scss";
	.betRecord {
		background: $bet-record-bg;
		
	}
    .generalizeLink-list{
			padding: 0 0.40rem 0.40rem;
			ul{
				li{
					background: $default-color;
					box-shadow: 0px 1px 5px 0px
					rgba(0, 0, 0, 0.15);
					border-radius: 0.13rem;
					padding: 0.32rem;
					display: flex;
					margin: 0.27rem 0;
					.left{
						flex: 1;
						h1{
							font-size: 0.32rem;
							color: $color-C;
							font-weight: 400;
							line-height: 1.6;
							span{
								font-size: 0.32rem;
								color: $color-p;
								font-weight: bold;
							}
						}
						h2{
							font-size: 0.32rem;
							color: $color-C;
							font-weight: 400;
							line-height: 1.6;

							span{
								font-size: 0.32rem;
								color: $color-C;
								font-weight: bold;
							}

						}
						p{
							font-size: 0.27rem;
							color: $color-J;
							line-height: 1.6;
						}
					}
					.right{
                        flex: 1;
						h1{
							font-size: 0.32rem;
							color: $color-C;
							font-weight: 400;
							line-height: 1.6;
							span{
								font-size: 0.32rem;
								color: $color-p;
								font-weight: bold;
							}
						}
						h2{
							font-size: 0.32rem;
							color: $color-C;
							font-weight: 400;
							line-height: 1.6;

							span{
								font-size: 0.32rem;
								color: $color-C;
								font-weight: bold;
							}

						}
						p{
							font-size: 0.27rem;
							color: $color-J;
							line-height: 1.6;
						}
						position: relative;
						h1{
							span{
								text-decoration: underline;
							}
						}
						i{
							font-size: 0.64rem;
							box-shadow: 0px 0px 5px 0px
							rgba(0, 0, 0, 0.2);
							border-radius: 0.13rem;
							color: $primary-color;
							position: absolute;
							right: 0;
							top: 50%;
							margin-top: -0.32rem;
						}
					}
				}
			}
		}
</style>

<template>
	<div class="betRecord" ref="betRecord">
		<nut-picker
			title="请选择游戏"
			:is-visible="isVisible1"
			:default-value-data="defaultValueData1"
			:list-data="listData1"
			@close="switchPicker('isVisible1')"
			@confirm="setYearValue"
		></nut-picker>
		<nut-actionsheet
			:is-visible="isShowlist"
			class="isShowlist"
			@close="switchPicker('isShowlist')"
		>
			<div slot="custom" class="custom-wrap"><span>自定义</span></div>
		</nut-actionsheet>
		<!-- common -->
		<nut-picker
			:title="fortitle"
			:is-visible="isVisibles"
			:default-value-data="defaultValueDatas"
			:list-data="listDatas"
			@close="switchPicker('isVisibles')"
			@confirm="setValues"
		></nut-picker>
		<nut-navbar class="info-header" @on-click-back="back('my')">
			<div class="headp">
				投注记录
				<div class="input-dates input-game">
					<nut-cell
						class="bet-name"
						:showIcon="false"
						:isLink="true"
						@click.native="switchPicker('isVisible1')"
					>
						<div slot="desc" class="selected-option">
							<span class="show-value">{{
								year ? year : "请选择"
							}}</span>
						</div>
					</nut-cell>
				</div>
				<!-- <span class="headspan">{{headTitle}}</span> -->
				<i class="headi">
					<img src="../../../assets/img/to-down-w.png" />
				</i>
			</div>
			<a class="spans" slot="back-icon">
				<img
					class="imgsbank"
					src="../../../assets/img/my-icon/fanhui.png"
				/>
			</a>
			<a class="spansright" slot="more-icon">
				<img class="imgsbank" src="../../../assets/img/zhuye.png" />
			</a>
		</nut-navbar>
		<div class="top-fifter">
			<div class="fifter" @click="makeList(0, betVideoTitle)">
				<label>视讯：</label>
				<div class="input-dates input-game hasicon">
					<nut-cell
						:showIcon="false"
						:isLink="true"
						@click.native="switchPicker('isVisibles')"
					>
						<div slot="desc" class="selected-option">
							<span class="show-value">{{
								years ? years : "全部彩票"
							}}</span>
						</div>
					</nut-cell>
					<i><img src="../../../assets/img/to-down-b.png"/></i>
				</div>
			</div>
			<div class="fifter" @click="makeList(1, dataList)">
				<label>时间：</label>
				<div class="input-dates input-game hasicon">
					<nut-cell
						:showIcon="false"
						:isLink="true"
						@click.native="switchPicker('isVisibles')"
					>
						<div slot="desc" class="selected-option">
							<span class="show-value">{{
								dateType ? dateType : "请选择"
							}}</span>
						</div>
					</nut-cell>
					<i><img src="../../../assets/img/to-down-b.png"/></i>
				</div>
			</div>
			<div
				v-show="ShowbetTypesTitle"
				class="fifter"
				@click="makeList(2, betTypesTitle)"
			>
				<label>彩种：</label>
				<div class="input-dates input-game hasicon">
					<nut-cell
						:showIcon="false"
						:isLink="true"
						@click.native="switchPicker('isVisibles')"
					>
						<div slot="desc" class="selected-option">
							<span class="show-value">{{
								betType ? betType : "全部彩种"
							}}</span>
						</div>
					</nut-cell>
					<i><img src="../../../assets/img/to-down-b.png"/></i>
				</div>
			</div>
        </div>
        <div class="table">
			<nut-row
				class="thead reheads"
				type="flex"
				justify="space-between"
				flexWrap="nowrap"
			>
				<nut-col class="md-3">
					<div class="flex-content">购彩名称</div>
				</nut-col>
				<nut-col class="md-3">
					<div class="flex-content">投注时间</div>
				</nut-col>
				<nut-col class="md-3">
					<div class="flex-content">投注额</div>
				</nut-col>
				<nut-col class="md-3">
					<div class="flex-content">派彩</div>
				</nut-col>
				<nut-col class="md-3">
					<div class="flex-content">状态</div>
				</nut-col>
			</nut-row>
			<div class="betList" >
				<div v-show="list.length > 0" class="page-loadmore">
					<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
						<pk-loadmore
							:top-method="loadTop"
							:bottom-method="loadBottom"
							:bottom-all-loaded="allLoaded"
							:top-all-loaded="topAllLoaded"
							@top-status-change="handleTopChange"
							@bottom-status-change="handleBottomChange"
							ref="loadmore"
							:stop-translate="stopTranslate"
						>
                                <div
                                    v-for="(item, index) of list"
                                    :key="index"
                                    class="nut-row nut-vert-list-panel thead tbody tableList nut-row-flex nut-row-justify-space-between"
                                >
                                    <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                                        <div class="flex-content">
                                            <p class="ptype">{{item.gameName}}</p>
                                            <p class="ptype">{{item.productName}}</p>
                                        </div>
                                    </div>
                                    <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                                        <div class="flex-content ptime">
                                            {{item.betTime | filterDate}}
                                        </div>
                                    </div>
                                    <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                                        <div class="flex-content green">{{item.singleAmount}}</div>
                                    </div>
                                    <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                                        <div class="flex-content red">{{item.win}}</div>
                                    </div>
                                    <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                                        <div class="flex-content">{{item.statusName}}</div>
                                    </div>
                                </div>
							<div class="nodata" v-show="hasData">我是有底线的</div>
						</pk-loadmore>
					</div>
				</div>
			</div>
		</div>
		

		
		<footer @click="back('detailRecord')">
			<div class="report">
				<i>
					<img src="../../../assets/img/report.png" />
				</i>
				<p>我的报表</p>
			</div>
		</footer>
	</div>
</template>
<script>
import func from "@/services/spread";
import {
	getGameTag,
	getSiteGames,
	betRecordCondition,
	betRecordThird,
	getBetList
} from "@/services/betRecord.js";
import {
	today,
	nearTwohours,
	week,
	month,
	lastmonth,
	timeItems
} from "@/services/commonfn.js";
import pkLoadmore from "@/components/Loadmore";

export default {
	components: {
		pkLoadmore
	},
	data() {
		return {
			year: null,
			isVisible1: false,
			defaultValueData1: null,
			listData1: [[]],
			// commonPicker
			years: null,
			fortitle: "",
			isVisibles: false,
			defaultValueDatas: null,
			listDatas: [],
			dataList: [[]],
			dateType: null,
			//
			betType: null,
			//
			timers: null,
			page: 2,
			isShowlist: false,
			//整理三级联动数据
			betHeadTitle: [], //头部 渲染所需 key
			betHeadfindArr: [], //头部遍历对象
			betVideoTitle: [], //视讯 渲染所需 key
			betVideofindArr: [],
			//key对应key 渲染所需 三级联动地址需要
			betVideoObj: {}, //视讯
			thirdId: null, //视讯id
			betTypesTitle: [], //种类
			ShowbetTypesTitle: false, //是否展示彩种选项
			NumThree: null,
			thirdkey: null, //要传的第三方key
			second: false, //是否第一次循环找到头部ID
			beginTime: "",
			endTime: "",

			allLoaded: false,
			topAllLoaded: false,
			topStatus: "",
			bottomStatus: "",
			wrapperHeight: 0,
			stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
			page: 1, //当前页数
			pageSize: 10, //每页请求的条数
			totalSize: 0, //总页数
			list: [], //列表数据
			info: {}, //返点详情
			hasData: false, //我是有底线的 是否显示
		};
	},
	mounted() {
		// this.$refs.betRecord.style.height = window.innerHeight + "px";
		this.$nextTick(function() {
			var arr = [];
			timeItems.map(v => {
				arr.push(v.name);
			});
			this.dataList[0] = arr;
			this.dateType = this.dataList[0][1]; //默认选中今天
			this.makeList(1, this.dataList);
			this.makeTimeSE(this.dateType);
		});

		this.makeTitle();

		// this.getList();
	},
	watch: {
		year(val) {
			if (this.betHeadfindArr && this.second) {
				this.betHeadfindArr.map(v => {
					if (v.value == this.year) {
						this.titleHeadId = v.id;
					}
				});
				console.log(this.titleHeadId, "this.titleHeadId");
			}

			this.betVideoTitle[0] = this.betVideoObj[val];
			this.betVideofindArr = this.betVideoObj[val + "key"];
			console.log(
				this.betVideoTitle,
				"this.betVideoTitle",
				this.betVideoObj[val + "key"]
			);
			this.years = this.betVideoTitle[0][0];
			this.second = true;
		},
		years(val) {
			this.betVideofindArr.map(v => {
				if (v.value == val) {
					this.thirdId = v.id;
					this.NumThree = v.key;
				}
			});
			this.betTypesTitle = [];
			this.ShowbetTypesTitle = false;
			console.log(this.thirdId, "this.thirdId", this.NumThree);

			// 彩票游戏id为1，判断是否为彩票游戏
			if (this.titleHeadId == 1) {
				this.betRecordThird();
			} else {
				this.getBetList();
			}
		}
	},
	methods: {
		getBetList() {
			var post = {
				gameType: this.titleHeadId,
				platform: this.NumThree,
				fclxType: this.titleHeadId == 1 ? this.thirdkey : "",
				beginTime: this.beginTime,
				endTime: this.endTime,
				page: this.page,
				pageSize: this.pageSize
			};
			getBetList(post).then(res => {
				if (res.success) {
					if (res.data) {
						let data = res.data;
						let result = data.list ? data.list : [];
						this.totalSize = data.totalSize;
						// this.level = data.level;
						if (this.page === 1) {
							this.list = result;
							if (this.totalSize < this.page * this.pageSize) {
								this.allLoaded = true;
								this.topAllLoaded = true;
							} else {
								this.allLoaded = false;
								this.topAllLoaded = false;
							}
						} else {
							this.list = this.list.concat(result);
							this.topAllLoaded = false;
						}
						this.$nextTick(() => {
							this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
						});
					}
				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		},
		makeTitle() {
			var _this = this;
			betRecordCondition().then(res => {
				if (res.success) {
					console.log(res.data, "res.data");
					var dataList = res.data;
					dataList.map(v => {
						var betHeadfindObj = { id: null, value: null };
						let { id, value } = v;
						betHeadfindObj.id = id;
						betHeadfindObj.value = value;
						_this.betHeadfindArr.push(betHeadfindObj);
						this.betHeadTitle.push(v.value);
						var arr = []; //二级菜单
						var arrs = [];
						v.nextCondition.map((v2, i2) => {
							arr.push(v2.value);

							var betVideofindObj = {
								id: null,
								value: null,
								key: null
							};
							betVideofindObj.id = v2.id;
							betVideofindObj.key = v2.key;
							betVideofindObj.value = v2.value;
							arrs.push(betVideofindObj);
						});
						_this.betVideoObj[v.value + "key"] = arrs;
						_this.betVideoObj[v.value] = arr;
					});

					console.log(_this.betHeadfindArr, "betHeadfindArr");
					console.log(this.betHeadTitle, "betHeadTitle");
					console.log(_this.betVideoObj, "betVideoObj");
					this.listData1[0] = this.betHeadTitle;
					this.year = this.listData1[0][0];
					if (_this.betHeadfindArr) {
						_this.betHeadfindArr.map(v => {
							if (v.value == this.year) {
								this.titleHeadId = v.id;
							}
						});
						console.log(this.titleHeadId, "this.titleHeadId");
					}
				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		chooseTimes(value) {
			var timeobj = {};
			switch (value) {
				case 0:
					timeobj = nearTwohours();
					break;
				case 1:
					timeobj = today();
					break;
				case 2:
					timeobj = week();
					break;
				case 3:
					timeobj = month();
					break;
				default:
					timeobj = lastmonth();
			}
			return timeobj;
		},
		back(path) {
			this.$router.push({
				name: path
			});
		},
		con() {
			console.log(1234567);
		},
		betRecordThird() {
			betRecordThird({ lotteryId: this.thirdId }).then(res => {
				if (res.success) {
					console.log(res.data, "res");
					let dataList = res.data;
					this.thirdarr = dataList;
					var arr = [];
					if (dataList) {
						dataList.map(v => {
							arr.push(v.name);
						});
						this.betTypesTitle.push(arr);
						this.betType = this.betTypesTitle[0][0];
						this.ShowbetTypesTitle = true;

						dataList.map(v => {
							if (v.name == this.betType) {
								this.thirdkey = v.key;
							}
						});
						console.log(this.thirdkey, "thirdkey");
						this.getBetList();
					}
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
		//
		setYearValue(chooseData) {
			// this.year = `${chooseData[0]}年`;
			this.year = chooseData[0];
			console.log(chooseData[0], "chooseData[0]");
		},

		makeList(status, arr) {
			this.listDatas = arr;
			this.statusf = status;
		},
		makeTimeSE(dateType) {
			var timeobj = {};
			timeItems.map(v => {
				if (v.name == dateType) {
					timeobj = this.chooseTimes(v.value);
				}
			});
			this.beginTime = timeobj.startDate;
			this.endTime = timeobj.endDate;
			console.log(timeobj, "timeobj");
		},
		//公用picker选中执行方法
		setValues(chooseData) {
			if (this.statusf == 0) {
				this.years = chooseData[0];

				console.log(this.years, "1111111");
			} else if (this.statusf == 1) {
				this.dateType = chooseData[0];
				this.makeTimeSE(this.dateType);
				console.log(this.dateType, "1111111");
			} else if (this.statusf == 2) {
				this.betType = chooseData[0];
				var dataList = this.thirdarr;
				if (dataList) {
					dataList.map(v => {
						if (v.name == this.betType) {
							this.thirdkey = v.key;
						}
					});
				}
				console.log(this.betType, "1111111", this.thirdkey);
			}
		},
		//下拉刷新
		handleTopChange(status) {
            console.log("下拉刷新")
			this.topStatus = status;
		},

		//下拉刷新 状态改变
		loadTop() {
            console.log(12345)
			this.page = 1;
			this.hasData = false;
			setTimeout(() => {
				this.getBetList();
				this.$refs.loadmore.onTopLoaded();
				this.allLoaded = false;
			}, 1500);
		},

		//上拉加载 状态改变
		handleBottomChange(status) {
            this.bottomStatus = status;
            console.log("上拉加载")
		},

		// 上拉加载
		loadBottom() {
            console.log(12345)
            console.log("上拉加载")
			this.page += 1;
			this.hasData = false;
			setTimeout(() => {
				this.getBetList();
				this.$refs.loadmore.onBottomLoaded();
				if (this.page * this.pageSize >= this.totalSize) {
					this.allLoaded = true; //所有数据加载完成
					this.hasData = true;
					this.topAllLoaded = false;
				}
			}, 1500);
		}
	},
};
</script>
