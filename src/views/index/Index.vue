<template>
    <div class="pk-index">
        <header class="index-header">
            <div class="logo-menu">
                <i class="iconfont icon-sy_menu" @click="showMenu = true"></i>
                <img src="../../assets/img/app_logo_532.png" alt="">
            </div>
            <div class="userinfo">
                <div class="un-login" v-if="!isLogin">
                    <button class="userinfo-login-btn"><router-link :to="{ name: 'login'}">登录</router-link></button>
                    <button class="userinfo-register-btn"><router-link :to="{ name: 'register'}">注册</router-link></button>
                </div>
                <div class="login" v-if="isLogin" @click="showChangeMoney = true">
                    <p>{{userinfo.account}}</p>
                    <p><img src="../../assets/img/icon/icon_account@2x.png" alt="">￥{{userinfo.balance}}</p>
                    <i class="iconfont icon-bank-normal more"></i>
                </div>
            </div>
        </header>
    
        <div class="skeleton vue-skeleton-loading" v-show="showLoading">
            <div class="skeleton-bac-animation"></div>
            <div class="skeleton-bac-content">
                <row style="width:100%">
                    <skeleton-square style="width:100%;height:3.7333rem"></skeleton-square>
                </row>
                <row padding="0.2rem 0 0 0 " style="width:100%">
                    <skeleton-square style="width:100%;height:0.5333rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 ">
                    <skeleton-square width="1.3333rem" style="height:1.3333rem" margin="0 0 0 0.2853rem"></skeleton-square>
                    <skeleton-square width="1.3333rem" style="height:1.3333rem" margin="0 0 0 0.2853rem"></skeleton-square>
                    <skeleton-square width="1.3333rem" style="height:1.3333rem" margin="0 0 0 0.2853rem"></skeleton-square>
                    <skeleton-square width="1.3333rem" style="height:1.3333rem" margin="0 0 0 0.2853rem"></skeleton-square>
                    <skeleton-square width="1.3333rem" style="height:1.3333rem" margin="0 0 0 0.2853rem"></skeleton-square>
                    <skeleton-square width="1.3333rem" style="height:1.3333rem" margin="0 0 0 0.2853rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 ">
                    <skeleton-square width="2.1667rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="2.1667rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="2.1667rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="2.1667rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 ">
                    <skeleton-square width="2.9777rem" style="height:2.9777rem" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="2.9777rem" style="height:2.9777rem" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="2.9777rem" style="height:2.9777rem" margin="0 0 0 0.2667rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0.2rem 0 ">
                    <skeleton-square width="2.9777rem" style="height:2.9777rem" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="2.9777rem" style="height:2.9777rem" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="2.9777rem" style="height:2.9777rem" margin="0 0 0 0.2667rem"></skeleton-square>
                </row>
            </div>
    
        </div>
        <!-- <nut-scroller :is-un-more="isUnMore" :is-loading="isLoading" :type="'vertical'" @pulldown="loadMoreVert">-->
        <!-- <div class=" nut-hor-list-item" slot="list"> -->
        <div class="index-cent" v-show="!showLoading">
            <div class="domain">
                主页域名：<span>{{domain}}</span>
            </div>
            <div class="banner">
                <div v-if="showBanner && bannerImg.length > 0 ">
                    <swiper>
                        <swiper-slide v-for="(item,index) in bannerImg" :key="index">
                            <img :src="item.imgUrl" />
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="banner-download" v-if="hideDownload">
                    <i class="iconfont icon-input-close" @click="hideDownload = false"></i>
                    <span>更多精彩游戏，请下载手机app!</span>
                    <button>立即下载</button>
                </div>
            </div>
            <div class="noticebar" v-if="announcement.length > 0">
                <div class="noticebar-label">
                    <button>公告</button>
                </div>
                <marquee direction="left" align="bottom" height="25" width="100%" onmouseout="this.start()" onmouseover="this.stop()" scrollamount="4" scrolldelay="1">
                    <div class="noticeText" v-for="(noticeDatas,index) in announcement" :key="index">
                        {{noticeDatas.content}}
                    </div>
                </marquee>
            </div>
            <div class="all-game" v-if="gameList.length > 0">
                <!-- swiper nav -->
                <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                    <swiper-slide :class="'slide-'+type.apiType" v-for="(type, index) in gameList" :key="index">
                        <div v-if="type.apiType ==5 ">
                            <img src="../../assets/img/icon/tiyu@2x.png" alt="">
                            <p>体育</p>
                        </div>
                        <div v-if="type.apiType ==2">
                            <img src="../../assets/img/icon/dianzi@2x.png" alt="">
                            <p>电子</p>
                        </div>
                        <div v-if="type.apiType ==3">
                            <img src="../../assets/img/icon/zhenren@2x.png" alt="">
                            <p>真人</p>
                        </div>
                        <div v-if="type.apiType ==1">
                            <img src="../../assets/img/icon/caipiao@2x.png" alt="">
                            <p>彩票</p>
                        </div>
                        <div v-if="type.apiType ==4">
                            <img src="../../assets/img/icon/qipai@2x.png" alt="">
                            <p>棋牌</p>
                        </div>
                        <div v-if="type.apiType ==6">
                            <img src="../../assets/img/icon/buyu@2x.png" alt="">
                            <p>捕鱼</p>
                        </div>
    
                    </swiper-slide>
                </swiper>
                <!-- swiper data -->
                <div>
                    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop" @slideChange="pageChange()">
                        <swiper-slide class="game-type-list" v-for="(type, index) in gameList" :key="index" :class="'slide-'+type.apiType">
                            <div class="game-item" v-for="(game,idx) in type.siteApis" :key="idx" @click="toList(type,game)" v-if="type.apiType == 3 || type.apiType == 5 || type.apiType == 2 || type.apiType == 6">
                                <img src="../../assets/img/paly.png" alt="" class="play-icon" v-if="game.swHref &&  game.whStatus == 1 && type.apiType != 6 && !isLogin">
                                <img v-lazy="gameImgUrl+'/'+game.apiPlatform+'/'+game.apiPlatform+'.png'" alt="">
                                <p>{{game.name}}</p>
                                <div class="wh-mask" v-if=" game.whStatus == 2">游戏维护中...</div>
                            </div>
                            <div v-if="type.apiType == 1  || type.apiType == 4">
                                <div class="game-type-nav">
                                    <swiper :options="swiperOptionv">
                                        <swiper-slide v-for="(game,idx) in type.siteApis" :key="idx" class="game-type-nav-item" :class="{'game-type-active':gameTypeActive == idx}">
                                            <div @click="selectGameType(idx,game)">
                                                <img v-lazy="gameImgUrl+'/'+game.apiPlatform+'/'+game.apiPlatform+'.png'" alt="">
                                                <span>{{game.name}}</span>
                                            </div>
                                        </swiper-slide>
                                    </swiper>
                                </div>
    
                                <div v-for="(gameChild,idx) in gameTypeActiveList.gameList" :key="idx" class="game-item" @click="toPlay(gameTypeActiveList)">
                                    <!-- <span>{{gameChild}}</span> -->
                                    <img src="../../assets/img/paly.png" alt="" class="play-icon" v-if="gameTypeActiveList.swHref &&  gameTypeActiveList.whStatus == 1 && !isLogin">
                                    <img v-lazy="gameImgUrl+'/'+gameTypeActiveList.apiPlatform+'/'+gameChild.fcType+'.png'" alt="" v-if="gameTypeActiveList.apiTypeId == 1">
                                    <img v-lazy="gameImgUrl+'/'+gameTypeActiveList.apiPlatform+'q/'+gameChild.image" alt="" v-if="gameTypeActiveList.apiTypeId == 4">
                                    <p>{{gameChild.aspiName}}</p>
                                    <div class="wh-mask" v-if=" gameTypeActiveList.whStatus == 2">游戏维护中...</div>
                                </div>
    
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
        <!--  </div> -->
        <!-- </nut-scroller> -->
    
        <!-- 左侧菜单 -->
        <div class="left-menu" :class="{'show-menu':showMenu}">
            <div class="menu-mask" @click="showMenu = false"></div>
            <div class="menu-info">
                <i class="iconfont icon-sykszz-close menu-close" @click="showMenu = false"></i>
                <div class="user-info">
                    <div class="un-login" v-if="!isLogin">
                        <p>欢迎光临，请先登录</p>
                        <router-link :to="{ name: 'login'}" tag="button">用户登录</router-link>
                    </div>
                    <div class="login" v-if="isLogin">
                        <i class="iconfont icon-tab-mine"></i>
                        <p>{{userinfo.username}}</p>
                        <router-link :to="{ name: 'my'}" tag="button">个人中心</router-link>
                    </div>
                </div>
                <div class="menu-list">
                    <ul>
                        <router-link class="active" :to="{ name: 'index'}" tag="li"><i class="iconfont icon-nav-home"></i>首页</router-link>
                        <router-link :to="{ name: 'activity'}" tag="li"><i class="iconfont icon-nav-home"></i>活动中心</router-link>
                        <router-link :to="{ name: 'betRecord'}" tag="li"><i class="iconfont icon-nav-home"></i>投注记录</router-link>
                        <router-link :to="{ name: 'msgCenter'}" tag="li"><i class="iconfont icon-fanshui-yiwen"></i>通知消息</router-link>
                        <router-link :to="{ name: 'spread'}" tag="li"><i class="iconfont icon-sanfang-wx"></i>分享返佣</router-link>
                        <router-link :to="{ name: 'my'}" tag="li"><i class="iconfont icon-sanfang-wx"></i>联系客服</router-link>
                        <li>
                            首页广告
                            <nut-switch :active.sync="showBanner">
                            </nut-switch>
                        </li>
                        <li>
                            浮动红包
                            <nut-switch :active.sync="shwoRed">
                            </nut-switch>
                        </li>
    
                    </ul>
                    <button @click="logout" v-if="isLogin">退出登录</button>
    
                </div>
            </div>
        </div>
        <!-- 快捷额度转换 -->
        <div class="change-money" :class="{'show-changeMoney':showChangeMoney}">
            <div class="changeMoney-mask" @click="showChangeMoney = false"></div>
            <div class="change-money-box">
                <ul>
                    <li>
                        <label>总资产</label>
                        <p>{{userinfo.totalBalance}}￥</p>
                    </li>
                    <li>
                        <label>钱包</label>
                        <p>{{userinfo.balance}}￥</p>
                    </li>
    
                </ul>
                <div class="game-list">
                    <ul>
                        <li v-for="game in userinfo.apis" :key="game.apiId">
                            <label>{{game.apiName}}</label>
                            <p>{{game.balance}}￥</p>
                        </li>
                    </ul>
                    <div class="btn-group">
                        <button @click="recoveryFunc">一键回收</button>
                        <router-link :to="{ name: 'deposit'}" tag="button">存款</router-link>
                    </div>
                </div>
            </div>
        </div>
        <!--通知消息 登录-->
        <div v-if="isLoginPopNotice" class="twoBtnPop">
            <div class="btnpopBox">
                <div class="btnpopContent">
                    <div class="tit">{{loginPopNotice.title}}</div>
                    <img v-if="loginPopNotice.wapImg" :src="loginPopNotice.wapImg" class="noticePic">
                    <div class="content">
                        {{loginPopNotice.content}}
                        <div class="time">{{loginPopNotice.createTime | filterTimeType('YYYYMMDD')}}</div>
                    </div>
                    <div @click="getPopMsgFunc()" class="halfBtn next" v-if="loginPopNotice.count && loginPopNotice.count > 0">下一条</div>
                    <div @click="isLoginPopNotice=false" class="halfBtn close" v-if="!loginPopNotice.count">关闭</div>
                </div>
                <div @click="isLoginPopNotice=false" class="halfBtn cancel" v-if="loginPopNotice.count && loginPopNotice.count > 0">取消</div>
            </div>
            <div class="box-mask"></div>
        </div>
        <!-- 红包 -->
        <Redbag v-show="shwoRed"></Redbag>
        <!-- 弹窗公告 未登录-->
        <div v-if="fullwindow">
            <ball-notice :popNotice="popNotice"></ball-notice>
        </div>
        <!--全屏动画 登录或未登录-->
        <animation v-if="fullScreen" :fullScreen="fullScreen" :cdnUrl='gameImgUrl' v-on:close="closeAnimation"></animation>
        <!-- 快捷额度转换 -->
        <Gamepop :allmoney="userinfo.totalBalance" :state="toast_control" :platformId="platformId"  :gameName="productName"  :balances="balance" @returnState="returnState">
        </Gamepop>
        <!-- 底部导航 -->
        <nut-tabbar @tab-switch="tabSwitch3" :tabbarList="tabList3" :bottom="true"></nut-tabbar>
    </div>
</template>

<script>
    import "swiper/dist/css/swiper.css";
    import Redbag from "../../components/RedBag";
    import BallNotice from "../../components/BallNotice";
    import Animation from "../../components/FullAnimation";
    import ScrollNotice from "../../components/ScrollNotice";
    import Gamepop from "../../components//Gamepop";
    import {
        getInfo,
        logout
    } from "../../services/auth.js";
    import {
        getCarouse,
        getAnnouncement,
        getGameList,
        getImgUrl,
        getAnimation,
        recovery,
        getPopMsg
    } from "../../services/index.js";
    export default {
        components: {
            Redbag,
            BallNotice,
            Animation,
            ScrollNotice,
            Gamepop
        },
        data() {
            return {
                shwoRed: true,
                showBanner: true,
                isUnMore: false,
                isLoading: false,
                fullwindow: false,
                isLoginPopNotice: false,
                tabList3: [{
                        tabTitle: "主页",
                        curr: true,
                        icon: "http://img13.360buyimg.com/uba/jfs/t1/29316/38/1115/3203/5c0f3d61E35d0c7da/9e557f2cb5c9dab6.jpg",
                        activeIcon: "http://img20.360buyimg.com/uba/jfs/t1/9996/36/8646/4833/5c0f3d61E7c1b7e0f/c98ad61124172e93.jpg"
                    },
                    {
                        tabTitle: "存款",
                        curr: false,
                        icon: "http://img12.360buyimg.com/uba/jfs/t1/25443/23/1062/4600/5c0f3d61E2e9f1360/c9b3421fe18614e2.jpg",
                        activeIcon: "http://img20.360buyimg.com/uba/jfs/t1/19241/12/1048/8309/5c0f3d61E17ed5a56/c3af0964cade47f8.jpg"
                    },
                    {
                        tabTitle: "优惠",
                        curr: false,
                        icon: "http://img13.360buyimg.com/uba/jfs/t1/10361/35/4713/4643/5c0f3d62E437a3c94/273fd0fb90798f03.jpg",
                        activeIcon: "http://img14.360buyimg.com/uba/jfs/t1/26604/35/1073/7896/5c0f3d61Eb9f5f184/5f01c938abe4216d.jpg"
                    },
                    {
                        tabTitle: "客服",
                        curr: false,
                        icon: "http://img11.360buyimg.com/uba/jfs/t1/14848/18/1066/3723/5c0f41bdE9f2a38fe/e6ed6768717297fb.jpg",
                        activeIcon: "http://img30.360buyimg.com/uba/jfs/t1/17538/16/1070/6214/5c0f41bdE4bc9a1db/74cf978e5015454b.jpg"
                    },
                    {
                        tabTitle: "我的",
                        curr: false,
                        icon: "http://img20.360buyimg.com/uba/jfs/t1/20004/20/1045/3620/5c0f3d61Eaaec1670/9e59db63983b7b9f.jpg",
                        activeIcon: "http://img14.360buyimg.com/uba/jfs/t1/23967/14/1072/6714/5c0f3d61E0ad8991e/8f741953f6e38f15.jpg"
                    }
                ],
                showLoading: false,
                domain: location.host,
                bannerImg: [],
                popNotice: [],
                announcement: [],
                gameList: [],
                hideDownload: true,
                fullScreen: [],
                //------info
                isLogin: sessionStorage.getItem("token"),
                showMenu: false,
                showChangeMoney: false,
                userinfo: {},
                money:{},
                swiperOptionTop: {
                    spaceBetween: 0,
                    loop: true,
                    loopedSlides: 6, //looped slides should be the same
                    autoHeight: true //enable auto height
                },
                swiperOptionThumbs: {
                    spaceBetween: 0,
                    slidesPerView: 6,
                    touchRatio: 0.2,
                    loop: true,
                    loopedSlides: 6, //looped slides should be the same
                    slideToClickedSlide: true
                },
                swiperOptionv: {
                    slidesPerView: 4,
                    freeMode: true
                },
                gameImgUrl: "",
                gameTypeActive: 0,
                gameTypeActiveList: {},
                loginPopNotice: {},
                //---额度转换
                platformId: "",
                productName: "",
                gameType: 0,
                balance: 0,
                toast_control: false
            };
        },
        mounted() {
            this.shwoRed = sessionStorage.getItem("shwoRed") ?
                sessionStorage.getItem("shwoRed") == 1 || false :
                true;
            this.showBanner = sessionStorage.getItem("showBanner") ?
                sessionStorage.getItem("showBanner") == 1 || false :
                true;
    
            this.showLoading = false;
            if (this.isLogin) {
                this.getInfoFunc();
                this.getPopMsgFunc();
            }
            this.getCarouseFunc();
            this.getAnnouncementFunc();
            this.getGameListFunc();
            this.getImgUrlFunc();
            this.getAnimationFunc();
        },
        watch: {
            shwoRed: function() {
                let status = this.shwoRed ? 1 : 2;
                sessionStorage.setItem("shwoRed", status);
            },
            showBanner: function() {
                let status = this.showBanner ? 1 : 2;
                sessionStorage.setItem("showBanner", status);
            }
        },
        methods: {
            getInfoFunc() {
                getInfo().then(res => {
                    if (res.success) {
                        this.userinfo = res.data.user;
                        this.money = res.data.switch;
                        localStorage.setItem("name", this.userinfo.account);
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            getCarouseFunc() {
                getCarouse().then(res => {
                    if (res.success) {
                        this.bannerImg = res.data.banner;
                        this.popNotice = res.data.phoneDialog;
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            getAnnouncementFunc() {
                getAnnouncement(-1).then(res => {
                    if (res.success) {
                        this.announcement = res.data.announcement;
                        console.log(213123123);
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            getGameListFunc() {
                this.showLoading = true;
                getGameList().then(res => {
                    if (res.success) {
                        this.showLoading = false;
                        this.gameList = res.data;
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
            getAnimationFunc() {
                getAnimation().then(res => {
                    if (res.success) {
                        this.fullScreen = res.data;
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            getPopMsgFunc() {
                getPopMsg().then(res => {
                    if (res.success) {
                        if (res.data) {
                            this.isLoginPopNotice = true;
                            this.loginPopNotice = res.data;
                        }
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            selectGameType(index, game) {
                console.log(1111);
                this.gameTypeActive = index;
                setTimeout(() => {
                    this.gameTypeActiveList = game;
                }, 10);
                console.log(game);
            },
            pageChange() {
                const idx = this.$refs.swiperTop.swiper.realIndex;
                if (
                    this.gameList[idx].apiType == 1 ||
                    this.gameList[idx].apiType == 4 ||
                    this.gameList[idx].apiType == 6
                ) {
                    this.gameTypeActive = 0;
                    this.gameTypeActiveList = "";
                    setTimeout(() => {
                        this.gameTypeActiveList = this.gameList[idx].siteApis[0];
                        console.log(this.gameTypeActiveList);
                    }, 10);
                }
            },
            toList(type, game) {
                console.log(type);
                if (type.apiType == 6) {
                    sessionStorage.setItem("dzClass", JSON.stringify(type));
                    this.$router.push({
                        name: "gameList",
                        query: {
                            gameClassId: game.apiId
                        }
                    });
                } else {
                    if (!this.isLogin && game.swHref && game.whStatus == 1) {
                        if (game.swHref.indexOf("://") != -1) {
                            window.open(
                                game.swHref,
                                "_blank",
                                "toolbar=yes, width=1300, height=900"
                            );
                        } else {
                            window.open(
                                "http://" + game.swHref,
                                "_blank",
                                "toolbar=yes, width=1300, height=900"
                            );
                        }
                    } else {
                        if (this.isLogin) {
                            this.userinfo.apis.map(gameApi => {
                                if (game.apiPlatformId == gameApi.apiId) {
                                    this.balance = gameApi.balance;
                                    this.platformId = game.apiPlatform;
                                    this.productName = game.name;
                                    if (game.isChange == 1) {
                                        this.toast_control = true;
                                    }
                                }
                            });
                        } else {
                            this.$router.push({
                                name: "login"
                            });
                        }
                    }
                }
            },
            toPlay(game) {
                if (game.swHref && game.whStatus == 1) {
                    if (game.swHref.indexOf("://") != -1) {
                        window.open(
                            game.swHref,
                            "_blank",
                            "toolbar=yes, width=1300, height=900"
                        );
                    } else {
                        window.open(
                            "http://" + game.swHref,
                            "_blank",
                            "toolbar=yes, width=1300, height=900"
                        );
                    }
                } else {
                    if (this.isLogin) {} else {
                        this.$router.push({
                            name: "login"
                        });
                    }
                }
            },
            returnScrollNoticeStatus(status) {
                // this.announcement = status;
            },
            closeAnimation() {
                console.log(111);
                if (!this.isLogin) {
                    this.fullwindow = true;
                }
            },
            tabSwitch3: function(value, index) {
                console.log(index);
            },
            logout() {
                logout().then(res => {
                    if (res.success) {
                        sessionStorage.setItem("token", "");
                        this.$router.push("/login");
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            recoveryFunc() {
                recovery().then(res => {
                    if (res.success) {
                        this.$toast.success("正在回收所有api资金，请稍后...", {
                            cover: true,
                            duration: 1500
                        });
                        this.getInfoFunc();
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            //---
            returnState(state) {
                this.toast_control = state;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>
