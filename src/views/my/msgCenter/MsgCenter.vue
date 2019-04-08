<style lang="scss" scoped>
 @import "../../../components/scss/pk-pwd.scss";
.msgCenter {
    .tab-msg {
        height: 1.52rem /* 114/75 */;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .tab {
            height: 0.8rem /* 60/75 */;
            width: 3.2rem /* 240/75 */;
            font-size: 0.32rem /* 24/75 */;
            color: $index-banner-bg;
            text-align: center;
            line-height: 0.8rem /* 60/75 */;
            border: 2px solid $index-banner-bg;
            background: #fff;
            border-radius: 0 0.13333rem /* 10/75 */ 0.13333rem /* 10/75 */ 0;
            &:first-child {
                border-right: none;
                border-radius: 0.13333rem /* 10/75 */ 0 0 0.13333rem /* 10/75 */;
            }
            &.active {
                background: $index-banner-bg;
                color: #fff;
            }
        }
    }
}
</style>


<template>
    <div class="msgCenter" ref="msgCenter">
        <nut-navbar class="info-header" :rightShow="false" @on-click-back="back('my')">
            消息中心
            <a class="spans" slot="back-icon">
                <img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png">
            </a>
        </nut-navbar>
        <div class="tab-msg pk-1px-b">
            <div class="tab" :class="{'active':active}" @click="tabs(0)">游戏公告</div>
            <div class="tab" :class="{'active':!active}" @click="tabs(1)">系统公告</div>
        </div>
        <div class="tab-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            states: 0,
            active: true,
            routerName: {
                0: 'gameAnnounce',
                1: 'systemAnnounce',
            }
        };
    },
    mounted() {
        this.tabSwitch(0);
    },
    methods: {
        tabs(status) {
            this.states = status;
            if (status == 0) {
                this.active = true;
                this.tabSwitch(status);
            } else {
                this.active = false;
                this.tabSwitch(status);
            }
        },
        tabSwitch(index, event) {
            console.log(index);
            this.$router.replace({ name: this.routerName[index] });
        },
        back(path) {
            this.$router.push({
                name: path
            });
        }
    }
};
</script>

