<template>
	<div class="msgDetail" ref="msgDetail">
		<nut-navbar
			class="info-header blue-header"
			@on-click-back="back('msgCenter')"
		>
			{{ title }}
			<a class="spans" slot="back-icon">
				<img
					class="imgsbank"
					src="../../../../assets/img/my-icon/fanhui.png"
				/>
			</a>
			<a class="spans" slot="more-icon" v-if="false"></a>
		</nut-navbar>
		<div class="notice-list pk-1px-t">
			<ul class="noticeGamePartial">
				<li>
					<div class="i">
						<p class="ps">
							<i>{{list.publishTime | filterDate}}</i>
						</p>
						<div class="ct">
							<p class="pf">
								{{list.content}}
							</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { getGameNoticeDetail } from "../../../../services/msgCenter.js";

export default {
	data() {
		return {
			id: this.$route.query.id*1,
			title: this.$route.query.status == 1 ? "游戏公告" : "系统公告",
			list:{}
		};
	},
	mounted() {
		this.$refs.msgDetail.style.height = window.innerHeight + "px";
		getGameNoticeDetail({ apiId: this.id }).then(res => {
			if (res.success) {
                this.list = res.data;
                console.log(this.list,'list')
			} else {
				this.$toast.fail(res.message, {
					cover: true,
					duration: 1000
				});
			}
		});
	},
	methods: {
		back() {
			var path =
				this.$route.query.status == 1
					? "gameAnnounce"
					: "systemAnnounce";
			this.$router.push({
                name: path,
                query: {
                    active:this.$route.query.status == 1 ? 0 : 1,
                    startTime: this.$route.query.startTime,
                    endTime: this.$route.query.endTime,
                    searchGameType: this.$route.query.searchGameType+""
                }
            });
		}
	}
};
</script>
<style lang="scss" scoped>
	@import "../../../../components/scss/pk-pwd.scss";
	.msgDetail {
		background: #f2f2f2;
		margin-top: 0.26667rem /* 20/75 */;
		.blue-header {
			background-color: #1766bb;
		}
		.ps {
			padding-right: 0.26667rem;
		}
		.pf {
			color: #666 !important;
		}
	}
</style>