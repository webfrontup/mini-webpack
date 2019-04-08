<style lang="scss" scoped>
	.systemAnnounce {
		@import "../../../../components/scss/pk-pwd.scss";
	}
</style>
<template>
	<div class="systemAnnounce">
		<div class="notice-list">
			<ul class="noticeGamePartial">
				<li
					@click="goPath(item.id, 2)"
					v-for="(item, i) in list"
					:key="i"
				>
					<div class="i">
						<div class="ct">
							<p>{{ item.content }}</p>
						</div>
						<p>
							{{item.title}} {{item.publishTime | filterDate}}
						</p>
					</div>
				</li>
			</ul>
            <no-data v-show="list == null || !list.length > 0"></no-data>
		</div>
	</div>
</template>
<script>
import noData from "@/components/NoData.vue"
import { getSysNotice } from "@/services/msgCenter.js";
export default {
    components:{
        noData
    },
	data() {
		return {
			list: []
		};
	},
	mounted() {
		getSysNotice({
			page: 1,
			pageSize: 100
		}).then(res => {
			if (res.success) {
				this.list = res.data.list;
				console.log(this.list, "this.list");
			} else {
				this.$toast.fail(res.message, {
					cover: true,
					duration: 1000
				});
			}
		});
	},
	methods: {
		goPath(id, status) {
			this.$router.push({
				name: "msgDetail",
				query: {
					id: id,
					status: status
				}
			});
		}
	}
};
</script>
