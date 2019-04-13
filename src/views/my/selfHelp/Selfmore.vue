<template>
	<div id="selfmore">
        <div v-if="loading" class="skeleton">
            <column>
                <skeleton-square 
                    width="9rem" 
                    height="1rem"
                    :count="9" 
                    margin="0.2rem 0.5rem"
                ></skeleton-square>
            </column>
        </div>
        <nut-navbar class="pk-title"  @on-click-back="$router.go(-1)">
            <a class="spans" slot="back-icon">
				<img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png"/>
			</a>
            我的优惠记录
            <a slot="more-icon">
                累计获得优惠
                <div>{{list.money}}</div>
            </a>
        </nut-navbar>
        <div v-if="!loading" class="selfmoreContent">
            <nut-tab @tab-switch="selfSwitch">
                <nut-tab-panel v-for="(tab,index) in tabTit" :key="index"  :tabTitle="tab.title">
                    <div v-if="forList.length === 0" class="noData">
                        <img src="../../../assets/img/bet-record-no-data.png">
                    </div>
                    <div v-if="forList.length > 0" class="threeBox">
                        <nut-row class="threetit">
                            <nut-col :span="8">
                                <div class="flex-content">活动名称</div>
                            </nut-col>
                            <nut-col :span="8">
                                <div class="flex-content">申请金额</div>
                            </nut-col>
                            <nut-col :span="8">
                                <div class="flex-content">实得金额</div>
                            </nut-col>
                        </nut-row>
                        <!--列表-->
                        <nut-row v-for="(infoList,index) in forList" :key="index" type="flex" align="center" class="threeList">
                            <nut-col :span="8">
                                <div class="flex-content">
                                    <div>{{infoList.activityTitle}}</div>
                                    <span>{{infoList.createTime | filterDate}}</span>
                                </div>
                            </nut-col>
                            <nut-col :span="8">
                                <div class="flex-content">{{infoList.depositMoney}}</div>
                            </nut-col>
                            <nut-col :span="8">
                                <div class="flex-content" :class="{'blue':infoList.status === 1,'red':infoList.status === 2,'yellow':infoList.status === 3}">{{infoList.actualMoney}}</div>
                            </nut-col>
                        </nut-row>
                    </div>
                </nut-tab-panel>
            </nut-tab>
        </div>
	</div>
</template>

<script>
import {
    getSelfInfo
} from "../../../services/center.js"
export default {
    name: "selfmore",
    data () {
        return {
            loading: true,
            haveNewVersion: false,
            list:'',
            forList:{},
            awarded:{},
            notpass: {},
            audited:{},
            tabTit: [{value:0,title:'全部优惠'},
                {value:1,title:'已通过'},
                {value:3,title:'未通过'},
                {value:2,title:'待审核'}]
        }
    },
    mounted () {
        this.getlist();
    },
    methods: {
        getlist(){
            let data = {
                id: parseInt(this.thisId),
            };
            getSelfInfo().then(res => {
                if (res.success) {
                    this.loading = false;
                    this.list = res.data;
                    this.forList = this.list.promotionRecord;
                    let data = res.data.promotionRecord;
                    this.audited = data.filter((item) => item.status === 1);
                    this.awarded = data.filter((item) => item.status === 2);//待审核
                    this.notpass = data.filter((item) => item.status === 3);
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1000
                    });
                }
            });
        },
        selfSwitch:function(index,event){
            if(index==1){
                this.forList = this.awarded
            }else if(index==2){
                this.forList = this.notpass
            }else if(index==3){
                this.forList = this.audited;//待审核
            }else{
                this.forList = this.list.promotionRecord
            }
        }
    }
}
</script>

<style scoped lang="scss">
#selfmore{
    .skeleton{
        background-color: $default-color;
    }
    .pk-title{
        /deep/ .nav-right{
            margin-top: -$four;
            .more{
                line-height: $four;
                font-size: 0.32rem;
                text-align: right;
            }
        }
    }
    .selfmoreContent{
        /deep/ .nut-tab{
            border: 0; 
            padding: 0;
            font-size: 0.427rem;
            color: $text-color;
            .nut-tab-title{
                height: $fourtrem;
                line-height: $fourtrem;
                .nut-title-nav-list{
                    .nut-tab-link{
                        font-size: 0.42rem;
                        &:hover{
                            text-decoration: none;
                        }
                    }
                }
                .nut-tab-active{
                    .nut-tab-link{
                        color: $tabtit-color;
                    }
                }
            }
            .nut-tab-item{
                margin-top: $tenrem;
                padding: 0 $four;
                height: auto;
                border: 0;
                border-top: $onerem solid $border-color;
                border-bottom: $onerem solid $border-color;
                .threeBox{
                    .threeList{
                        .nut-col:last-child{
                            font-size: 0.427rem;
                        }
                    }
                }
            }
        }
    }
}
.blue{
    color: $tabtit-color;
}
.red{
    color: $color-a;
}
.yellow{
    color: $yellow-color;
}
/deep/ .nav-bar{
    z-index: 9;
    bottom: 0;
    height: $onerem*2;
    background: $tabtit-color;
}
</style>