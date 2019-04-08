
<style lang="scss" scoped>
 @import "../../../components/scss/pk-pwd.scss";

.securityCenter {
    background:$center-background;
    margin-top: -1.22667rem;
    .topmy {
        height: 8rem /* 600/75 */;
        width: 100%;
        background: url("../../../assets/img/mybg.png") no-repeat 0 center;
        background-size: cover;
        background-position: 0 0;
        .info-header {
            background: none;
            background-size: cover;
            .spans {
                font-size: 0.48rem;
                img{
                    left:0px;
                }
            }
        }
        .info {
            height: 6rem /* 450/75 */;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            position: relative;
            .makemid {
                text-align: center;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                @keyframes circleRotate{
                    from{transform: rotate(0deg);}
                    to{transform: rotate(-360deg);}
                }
                // margin-top: 1.86667rem /* 140/75 */;
                img {
                    width: 5.33333rem /* 400/75 */;
                    &.bg_icon{
                        margin: 50px auto;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                    }
                    &.radar_icon{
                        width: 1.52rem /* 114/75 */;
                        position: absolute;
                        top: 166%;
                        left: 50%;
                        transform-origin: left bottom;
                        animation: circleRotate 5s infinite linear;
                    }
                }
                .name {
                    color:$default-color;
                    font-size: 0.37333rem /* 28/75 */;
                    transform: translateY(6.29333rem /* 472/75 */);
                }
                .names{}
                .mgt40{
                    margin-top: .26667rem /* 20/75 */;
                }
                
            }
        }
    }
    .sercur-content{
        margin-top: .26667rem /* 20/75 */;
        .pk-titler{
            height: 1.17333rem /* 88/75 */;
            line-height: 1.17333rem;
            font-size: .34667rem /* 26/75 */;
            color: $nondefault-color;
            padding: 0 .4rem /* 30/75 */;
            text-decoration: none;
        }
    }
    
}
.unbind{
    color:$center-unbind;
}
</style>
<style>
.nut-cell .nut-cell-title,.nut-cell .nut-cell-right{
    font-size: .34667rem /* 26/75 */;
}
.nut-cell .nut-cell-icon img{
    height: .33333rem /* 25/75 */
}
/* .nut-cell .nut-cell-sub-title{
    display: block;
    margin-top: -35px;
    margin-left: 128px;
    font-size: 0.34667rem;
} */
</style>


<template>
    <div class="securityCenter" ref="securityCenter">
        <div class="topmy">
            <nut-navbar class="info-header" @on-click-back="back('my')">安全中心
                <a class="spans" slot="back-icon"><img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png"></a>
                <a class="spans" slot="more-icon" v-if="false"></a>
            </nut-navbar>
            <div class="info">
                <div class="makemid">
                    <img class="bg_icon" src="../../../assets/img/my-icon/safety_bg@2x.png" alt="tupian">
                    <img class="radar_icon" src="../../../assets/img/my-icon/safety_effect@2x.png" alt="">
                    <p class="name mgt40">亲爱的xxx</p>
                    <p class="name">您的帐号信息，正在享受全面的安全防护</p>
                </div>
            </div> 
        </div>
        <div class="sercur-content">
            <nut-cell 
            class="pk-titler"
            title = "修改登录密码" 
            desc = "修改"
            :showIcon = "true"
            @click.native="back('editLoginpwd')"
            >
            </nut-cell>
            <nut-cell 
            class="pk-titler"
            title = "修改取款密码" 
            desc = "设置"
            :showIcon = "true"
            @click.native="back('securitypwd')"
            >
            </nut-cell>
            <nut-cell 
            class="pk-titler"
            title = "修改视讯密码" 
            desc = "设置"
            :showIcon = "true"
            @click.native="back('videopwd')"
            >
            </nut-cell>
            <!-- title todo -->
            <!-- <nut-cell 
            class="pk-titler"
            title = "银行卡" 
            subTitle = "（未绑定）"
            desc = "设置"
            :showIcon = "true"
            >
            </nut-cell> -->
            <a href="javascript:;" class="pk-titler nut-cell" style="background-color: rgb(255, 255, 255);" @click="back('bankcard')">
                <div class="nut-cell-box">
                    <div class="nut-cell-left">
                        <span class="nut-cell-title">银行卡<span class="unbind">(未绑定)</span></span>
                    </div>
                    <div class="nut-cell-right">
                        <span class="nut-cell-desc">设置</span>
                        <span class="nut-cell-icon">
                            <img :src="leftSrc" alt="" class="src">
                        </span>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            leftSrc: "data:image/svg+xml,%3Csvg viewBox='0 0 5 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.215 9.757l3.577-4.17a.931.931 0 0 0 0-1.173L1.215.244a.642.642 0 0 0-1.007 0 .929.929 0 0 0 0 1.172L3.283 5 .208 8.584a.93.93 0 0 0 0 1.173.643.643 0 0 0 1.007 0z' fill='rgb(200,200,205)'/%3E%3C/svg%3E"
        }
    },
    mounted() {
        this.$refs.securityCenter.style.height = window.innerHeight + "px";
    },
    methods: {
        back(path) {
            this.$router.push({
                name: path
            });
        },
    }
};
</script>
