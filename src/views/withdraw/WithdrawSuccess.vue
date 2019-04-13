<template>
    <div class="widthdraw-success">
        <nut-navbar class="pk-title" @on-click-back="$router.go(-1)" :rightShow="false">
            <a class="spans" slot="back-icon">
				<img class="imgsbank" src="../../assets/img/my-icon/fanhui.png"/>
			</a>
            取款
        </nut-navbar>
        <div class="content">
            <pay-success :dataObj="dataObj" @ok="$router.go(-2)"></pay-success>
            <!-- <adv-common :advType="2" :typeId="2"></adv-common> -->
        </div>
    </div>
</template>
<script>
import PaySuccess from '@/components/PaySuccess'
// import AdvCommon from '@/components/Advcommon'
export default {
    name:'withdrawSuccess',
    components:{
        PaySuccess,
        // AdvCommon
    },
    data(){
        return {
            dataObj:{
                desc:'出款已提交，我们将尽快审核您的订单，请注意查收消息。',
                details:[
                    {name:'订单号',value:''},
                ]
            }
        }
    },
    mounted(){
        this.dataObj.details[0].value = this.$route.query.orderId;
    },
}
</script>
<style lang="scss" scoped>
</style>



