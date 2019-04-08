<template>
    <div class="pay-result">
        <nut-navbar class="pk-title" @on-click-back="$router.go(-1)" :rightShow="false">线上存款</nut-navbar>

        <div class="content">
            <pay-return-result :fromType="2"></pay-return-result>
        </div>
        <!-- <Advcommon :advType="2" :typeId="1"></Advcommon> -->
    </div>
</template>
<script>
// import Advcommon from '../../../components/Advcommon'
import PayReturnResult from '../../components/PayReturnResult'
export default {
    name:'payResult',
    components:{
        PayReturnResult,
        // Advcommon
    }
}
</script>
<style lang="scss" scoped>
</style>


