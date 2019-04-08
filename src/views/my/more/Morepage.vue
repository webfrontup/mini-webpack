<template>
    <div class="aboutbox">
         <nut-navbar class="pk-title" :rightShow="false"
        @on-click-back="$router.go(-1)">
            {{mapinfo.title}}
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
            <!-- <div class="aboutus-pic">
                <img :src="content.logo" alt="">
            </div> -->
            <div class="aboutus">
                <div class="aboutus-title">
                    {{mapinfo.title}}
                </div>
                <p>{{mapinfo.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getMorearticle
    } from "../../../services/center.js"
    export default {
        name: "morepage",
        data(){
            return{
                title:'标题',
                content:'',
                thisId:this.$route.query.id,
                position:this.$route.query.position,
                list: false,
                mapinfo: {},
            }
        },
        mounted() {
            this.info();
        },
        methods:{
            info(){
                let data = {
                    id:this.thisId*1,
                    position:this.position*1
                }
                getMorearticle(data).then(res => {
                    if (res.success) {
                        this.list = true;
                        this.loading = false;
                        this.mapinfo = res.data;
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
    .aboutus-pic {
        img {
            margin: 0.27rem 0;
            width: 100%;
            height: 4rem;
        }
    }
    .aboutus {
        background-color: $default-color;
        .aboutus-title {
            padding: 0 0.4rem;
            height: 1rem;
            line-height: 1rem;
            font-size: 0.37rem;
            border-bottom: $onerem solid $border-color;            
            color: $text-color;
        }
        p {
            padding: 0.1rem 0.4rem;
            line-height: 0.6rem;
            font-size: 0.37rem;
            color: $tip-color;
            word-wrap:break-word;
            overflow:hidden;
        }
    }
    .pk-1px-b:after {
        left: 0.4rem;
        border-color: $border-color;
    }
}
</style>
