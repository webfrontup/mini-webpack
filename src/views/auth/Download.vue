<template>
    <div class="download">
        <div class="top-right">
            <img src="../../assets/img/download/element02.png" alt="">
        </div>
        <div class="title">
            <div class="title-img">
                <img src="../../assets/img/download/title.png" alt="">
            </div>
            <div class="title-left-img">
                <img src="../../assets/img/download/element03.png" alt="">
            </div>

        </div>
        <div class="desc">
            <p>通过自主研发原生 App , 省掉传统 Wap 新开页面</p>
            <p>加载时的等待时间, 做到不同页面, 无缝切换,</p>
            <p>随心畅玩, 给你不一样的极致体验</p>
        </div>
        <div class="pk-img">
            <img src="../../assets/img/download/element04.png" alt="">
        </div>
        <div class="bottom">
            <div class="bottom-img">
                <img src="../../assets/img/download/element.png" alt="">
            </div>
            <div class="download-btn">
                <a class="ios" href="#" target="_blank"></a>
                <a class="android" href="#" target="_blank"></a>
            </div>
            <h2><a href="https://pk1359.com/index.php/webcenter/Ios_view" target="_blank">查看IOS安装信任教程</a></h2>
        </div>
    </div>
</template>
<script>

</script>
<style lang="scss" scoped>
  
    .download{
        position:absolute;
        top:0;
        background: url('../../assets/img/download/bg.png') center center no-repeat;
        background-size:cover;
        width: 100%;
        height: 100%;
        .top-right{
            display: flex;
            justify-content:flex-end;
            img{
                width: 1.63rem;
                height: 1.63rem;
                display: block;
            }
        }
        .title{
            margin-top: 0.33rem;
            position: relative;
            .title-img{
                display: flex;
                justify-content:center;
                img{
                    width: 7.60rem;
                    height: 1.73rem;
                    display: block;
                }
            }
            .title-left-img{
                position: absolute;
                bottom: -0.80rem;
                img{
                    width: 1.60rem;
                    height: 1.60rem;
                    display: block;
                }
            }

        }
        .desc{
            margin-top: 0.51rem;
            p{
                text-align: center;
                font-size: 0.37rem;
                color:#fff;

            }
        }
        .pk-img{
            margin-top: 0.8rem;
            display: flex;
            justify-content: flex-end;
            padding-right: 0.83rem;
            img{
                width: 1.92rem;
                height: 1.92rem;
                display: block;
            }
        }
        .bottom{
            position: absolute;
            bottom: 0;
            height: 3.47rem;
            width: 100%;
            background: url('../../assets/img/download/bottom.png') center center no-repeat;
            background-size:cover;
            .bottom-img{
                position: absolute;
                top: -1.47rem;
                right: 0;
                img{
                    width: 2.40rem;
                    height: 2.88rem;
                    display: block;
                }
            }
            .download-btn{
                display: flex;
                justify-content: space-between;
                padding: 1.03rem 0.67rem 0.2rem;
                a{
                    width: 4.12rem;
                    height: 1.47rem;
                    background-image: linear-gradient(-56deg,
                            #2663da 0%,
                            #2531ba 100%),
                    linear-gradient(
                                    #000000,
                                    #000000);
                    background-blend-mode: normal,
                    normal;
                    border-radius: 0.13rem;
                }
                .ios{
                    background: url('../../assets/img/download/ios_button.png') center center no-repeat;
                    background-size: cover;
                }
                .android{
                    background: url('../../assets/img/download/android_button.png') center center no-repeat;
                    background-size: cover;
                }
            }
            h2{

                font-weight: normal;
                text-align: center;
                a{
                    text-align: center;
                    text-decoration: underline;
                    color: #111111;
                    font-size: 0.40rem;
                }
            }

        }
    }
</style>