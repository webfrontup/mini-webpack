<style lang="scss" scoped>
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
</style>
<template>
	<div class="no-data">
		<div class="contentp contentmsg">
			<img class="imgs" :src="noDataimg" />
			<p class="levelBlue">暂无内容~</p>
		</div>
	</div>
</template>
<script>
import noDataimg from "../assets/img/prompt-no-data.png";
export default {
	data() {
		return {
			noDataimg: noDataimg
		};
	}
};
</script>



