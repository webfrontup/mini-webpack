<template>
	<div id="more">
        <div v-show="loading" class="skeleton">
            <column>
                <skeleton-square 
                    width="9rem" 
                    height="1rem"
                    :count="9" 
                    margin="0.2rem 0.5rem"
                ></skeleton-square>
            </column>
        </div>
        <nut-navbar class="pk-title" :rightShow="false"
        @on-click-back="$router.go(-1)">
            更多
        </nut-navbar>
        <div v-show="!loading" class="morebox">
            <img :src="list.logo" alt="">
        </div>
        <div v-show="!loading" class="moreBody">
            <ul>
                <div v-for="(infoList,index) in list.iword" :key="index">
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
        getMorelists
    } from "../../../services/center.js"
    export default {
        name: "more",
        data () {
            return {
                loading: true,
                list:'',
			}
        },
        mounted () {
            this.getlists();
        },
        methods: {
            getlists(){
                getMorelists().then(res => {
                    if (res.success) {
                        this.loading = false;
                        this.list = res.data;
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

<style scoped lang="scss">
#more{
    .skeleton{
        background-color: $default-color;
    }
    .morebox {
        img {
            margin: 0.27rem 0 0;
            width: 100%;
            height: 4rem;
        }
    }
    .moreBody{
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
    }
}

</style>