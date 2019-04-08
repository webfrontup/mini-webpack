<template>
    <div class="aboutbox">
         <nut-navbar class="pk-title" :rightShow="false"
        @on-click-back="$router.go(-1)">
            {{title}}
        </nut-navbar>
        <div v-show="!list" class="skeleton">
            <skeleton-square width="100%" height="1rem"></skeleton-square>
            <skeleton-square width="9rem" height="1.4rem" margin="0.2rem 0.5rem"></skeleton-square>
            <skeleton-square width="2rem" height="0.4rem" margin="0.2rem 0.5rem"></skeleton-square>
            <column>
                <skeleton-square 
                    width="9rem" 
                    :count="16" 
                    margin="0.1rem 0.5rem"
                ></skeleton-square>
            </column>
        </div>
        <div v-show="list">
            <div v-show="content== false" class="noData">
                <img src="../../../assets/img/bet-record-no-data.png">
                <p>暂无数据</p>
            </div>
            <ul>
                <div v-for="(infoList,index) in content" :key="index">
                    <router-link v-if="infoList.itype===1" tag="li" :to="infoList.url">
                        <div class="moretitle">{{infoList.title}}</div>
                        <nut-icon type="right" color="#666" size="0.4rem"></nut-icon>
                    </router-link>
                    <router-link v-if="infoList.itype===2" tag="li" :to="{name:'morelist',query:{id:infoList.id,position:infoList.position}}">
                        <div class="moretitle">{{infoList.title}}</div>
                        <nut-icon type="right" color="#666" size="0.4rem"></nut-icon>
                    </router-link>
                    <router-link v-if="infoList.itype===3" tag="li" :to="{name:'morepage',query:{id:infoList.id,position:infoList.position}}">
                        <div class="moretitle">{{infoList.title}}</div>
                        <nut-icon type="right" color="#666" size="0.4rem"></nut-icon>
                    </router-link>
                    <li v-if="infoList.itype===4">
                        <a class="moretitle" :src="infoList.url">{{infoList.title}}</a>
                        <nut-icon type="right" color="#666" size="0.4rem"></nut-icon>
                    </li>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
        getMorepage
    } from "../../../services/center.js"
    export default {
        name: "morelist",
        data(){
            return{
                content:'',
                thisId:this.$route.query.id,
                position:this.$route.query.position,
                list: false,
            }
        },
        mounted() {
            this.info();
        },
        methods:{
            info(){
                let data = {
                    id: parseInt(this.thisId),
                    position: parseInt(this.position)
                };
                getMorepage(data).then(res => {
                    if (res.success) {
                        this.list = true;
                        this.content = res.data;
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
.aboutbox {
    .skeleton{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: $default-color;
    }
    margin-top: $tenrem*2;
    background-color: $default-color;
    border-top: $onerem solid $border-color;
    border-bottom: $onerem solid $border-color;
    ul{
        padding-left: $fourtrem/2;
        li{
            position: relative;
            height: $fourtrem;
            line-height: $fourtrem;
            font-size: 0.373rem;
            color: $text-color;
            border-bottom: $onerem solid $border-color;
            a{
                display: block;
            }
            /deep/ .nut-icon{
                position: absolute;
                top: 0;
                right: 0.2rem;
                margin: 0.08rem;
            }
        }
        div:last-child{
            li{
                border: 0;
            }
        }
    }
    .noData{
        margin: 1rem auto;
        p{
            font-size: 0.4rem;
            text-align: center;
        }
    }
}
</style>
