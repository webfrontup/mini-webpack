<template>
    <div class="dz-game-list pk-index">
        <nut-navbar class="pk-title" @on-click-back="back" @on-click-more="isShowSearchBox = true">
            游戏大厅
        </nut-navbar>
    
        <div class="all-game" v-if="classArr.siteApis.length > 0">
            <!-- swiper nav -->
            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                <swiper-slide :class="'slide-'+type.apiId" v-for="(type, index) in classArr.siteApis" :key="index">
                    <span>{{type.name}}</span>
                </swiper-slide>
            </swiper>
            <!-- swiper data -->
            <div>
                <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop" @slideChange="pageChange()" @slideChangeTransitionStart="pageChangeStart()">
                    <swiper-slide class="game-type-list" v-for="(type, index) in classArr.siteApis" :key="index" :class="'slide-'+type.apiId">
                        <div class="game-type-nav">
                            <swiper :options="swiperOptionv">
                                <swiper-slide v-for="(gameType,idx) in gameTypeArr" :key="idx" class="game-type-nav-item" :class="{'game-type-active':gameTypeActive == idx}">
                                    <div @click="selectGameType(idx,gameType)">
                                        <span>{{gameType.value}}</span>
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <div v-for="(gameChild,idx) in gameList" :key="idx" class="game-item">
                            <img src="../../assets/img/paly.png" alt="" class="play-icon" v-if="gameTypeActiveObj.swHref &&  game.whStatus == 1">
                            <img v-lazy="gameImgUrl+'/'+gameTypeActiveObj.apiPlatform+'/'+gameChild.image" alt="" v-if="gameClassId != 217">
                            <img v-lazy="gameChild.image" alt="" v-if="gameClassId == 217">
                            <p>{{gameChild.name}}</p>
                            <div class="wh-mask" v-if="gameTypeActiveObj.whStatus == 2">游戏维护中...</div>
                        </div>
                        <div v-show="gameList<=0 && !showLoading" class="no-data">
                            <div class="no-data-box">
                                <i class="iconfont icon-list-zanwusj"></i>
                                <p>暂无数据哦~~</p>
                            </div>
                        </div>
                        <div class="skeleton vue-skeleton-loading" v-if="showLoading && gameList<=0">
                            <div class="skeleton-bac-animation"></div>
                            <div class="skeleton-bac-content" v-for="idx in skeletonLen" :key="idx">
                                <row padding="0.2rem  0 0 0 ">
                                    <skeleton-square width="2.9777rem" style="height:2.9777rem" margin="0 0 0 0.2667rem"></skeleton-square>
                                    <skeleton-square width="2.9777rem" style="height:2.9777rem" margin="0 0 0 0.2667rem"></skeleton-square>
                                    <skeleton-square width="2.9777rem" style="height:2.9777rem" margin="0 0 0 0.2667rem"></skeleton-square>
                                </row>
                            </div>
    
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="search-box" v-if="isShowSearchBox">
            <div class="search-box-mask" @click="isShowSearchBox = false;searchGameName = ''"></div>
            <div class="search-box-cent">
                <input type="text" v-model="searchGameName">
                <button @click="searchGameNameFunc">搜索</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getImgUrl,
        getGameType,
        getDzGameList
    } from "../../services/index.js";
    export default {
        data() {
            return {
                showLoading: true,
                skeletonLen: 4,
                gameClassId: "",
                classArr: {
                    siteApis: []
                },
                swiperOptionTop: {
                    spaceBetween: 0,
                    loop: true,
                    loopedSlides: 6, //looped slides should be the same
                    autoHeight: true //enable auto height
                },
                swiperOptionThumbs: {
                    spaceBetween: 0,
                    slidesPerView: 4,
                    touchRatio: 0.2,
                    loop: true,
                    loopedSlides: 6, //looped slides should be the same
                    slideToClickedSlide: true,
                    width: undefined //enable auto height
                },
                swiperOptionv: {
                    slidesPerView: 4,
                    freeMode: true
                },
                gameList: [],
                gameListAll: [],
                gameListOldSearch: [],
                gameImgUrl: "",
                gameTypeActiveObj: {},
                gameTypeActive: 0,
                gameTypeActiveId: 0,
                gameTypeActiveList: {},
                gameTypeArr: [],
                isShowSearchBox: false,
                searchGameName: ""
            };
        },
        created() {
            this.gameClassId = this.$route.query.gameClassId * 1;
        },
        mounted() {
            this.classArr = JSON.parse(sessionStorage.getItem("dzClass"));
            this.getImgUrlFunc();
            this.getGameTypeFunc();
            this.getGameListFunc();
        },
        watch: {
            // gameClassId(){
            // }
        },
        methods: {
            selectGameType(index, gameType) {
                this.gameTypeActive = index;
                this.gameTypeActiveId = gameType.key;
                this.showLoading = true;
                let arr = [];
                this.gameList = [];
                if (this.gameTypeActiveId) {
                    this.gameListAll.map(game => {
                        if (game.topId == gameType.key) {
                            arr.push(game);
                        }
                    })
                    // this.getGameListFunc();
                } else {
                    arr = this.gameListAll;
                    // setTimeout(() => {
                    //     this.gameList = arr;
                    //     this.gameListOldSearch = this.gameList;
                    //     this.showLoading = false;
                    // }, 10);
                }
                setTimeout(() => {
                    this.gameList = arr;
                    this.gameListOldSearch = this.gameList;
                    this.showLoading = false;
                }, 10);
            },
            pageChangeStart() {
                this.showLoading = true;
            },
            pageChange() {
                const idx = this.$refs.swiperTop.swiper.realIndex;
                this.gameTypeActive = 0;
                this.gameTypeActiveId = 0;
                this.gameList = [];
                setTimeout(() => {
                    this.gameClassId = this.classArr.siteApis[idx].apiId;
                    this.gameTypeActiveObj = this.classArr.siteApis[idx];
                    this.getGameListFunc();
                }, 10);
            },
            getGameListFunc() {
                this.showLoading = true;
                let data = {
                    productId: this.gameClassId
                };
                if (this.gameTypeActiveId) {
                    data.typeId = this.gameTypeActiveId * 1;
                }
                getDzGameList(data).then(res => {
                    if (res.success) {
                        this.gameList = res.data.casinoGames || [];
                        this.gameListAll = this.gameList || [];
                        this.gameListOldSearch = this.gameList;
                        this.showLoading = false;
                        console.log(this.gameList, this.gameTypeActiveObj);
                        setTimeout(() => {
                            const swiperTop = this.$refs.swiperTop.swiper;
                            const swiperThumbs = this.$refs.swiperThumbs.swiper;
                            swiperTop.controller.control = swiperThumbs;
                            swiperThumbs.controller.control = swiperTop;
                        }, 100);
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            getGameTypeFunc() {
                getGameType().then(res => {
                    if (res.success) {
                        this.gameTypeArr = res.data;
                        this.gameTypeArr.unshift({
                            key: 0,
                            value: "全部",
                            sort: 0
                        });
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
    
            getImgUrlFunc() {
                getImgUrl().then(res => {
                    if (res.success) {
                        this.gameImgUrl = res.data;
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            searchGameNameFunc() {
                this.isShowSearchBox = false;
                this.showLoading = true;
                let arr = this.gameListOldSearch,
                    searchArr = [];
                this.gameList = [];
                if (!this.searchGameName) {
                    searchArr = arr;
                } else {
                    arr.map(game => {
                        if (game.name.indexOf(this.searchGameName) > -1) {
                            searchArr.push(game);
                        }
                    });
                }
    
                setTimeout(() => {
                    this.gameList = searchArr;
                    this.showLoading = false;
                    this.searchGameName = "";
                }, 10);
            },
            back() {
                this.$router.go(-1);
    
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>
