export default {
    //v2接口地址
    CAPTCHA_CODE: "/captcha/code", //数字验证码
    CAPTCHA_IMG: "/captcha/pmregister", //拼图验证码
    LOGIN: "/login",
    LOGIN_OUT: "/logout", //登出
    REGISTER: "/regSave",
    REGISTER_SET: "/getRegisterInfo", //获取登陆注册设定
    REGISTER_TERMS: "/terms", //获取注册协议
    REGISTER_AGENT: "/getDefaultAgent", //获取默认推荐人
    //-首页
    USER_INFO: "/getUserInfo", //个人信息
    BANNER: "/getCarouse", //弹窗广告/banner图
    ANNOUNCEMENT: "/getAnnouncement", //获取公告 
    INDEX_GAME_LIST: "/getSiteGames", //游戏列表
    INDEX_GAME_IMG_URL: "/getCdnUrl", //图片地址
    INDEX_GAME_TYPE: "/getGameTag", //电子游戏分类
    INDEX_DZ_GAME_LIST: "/getCasinoGame", //电子游戏列表
    INDEX_ANIMATION: "/fullScreenAnimation", //全屏动画
    INDEX_POP_MSG: "/getPopupMessage", //通知消息弹窗的接口  
    USER_REFRESH: "/refresh", //用户资产信息
    INDEX_RECOVERY: "/recovery", //一键归户
    INDEX_GET_RED_STYLE: "/countDrawTimes", //获取红包样式
    INDEX_OPEN_RED: "/getPacket", //打开红包
    INDEX_OPEN_GAME: "/getAPILink", //游戏链接
    //额度转换
    TRANSFER_GET_NO_AUTO_TRANSFER_INFO: "/getNoAutoTransferInfo",
    //more
    MORELIST: "/contact/more",
    MORELISTINFO: "/contact/more/list",
    MOREARTICLE: "/contact/more/article",
    MORECONTACTUS: "/websiteContact",
    //自助优惠申请
    SELFHELPLIST: "/promotion",
    SELFHELPINFO: "/promotionRecord",
    SELFHELPAPPLY: "/promotionApply",
    TRANSFER_RECOVERY_BY_ID: "/recoveryById", //一键回归
    TRANSFER_REFRESH_API: "/refreshApi", //单个刷新
    TRANSFER_MONEY: "/transfersMoney", //提交额度转换-转入转出
    TRANSFER_MODE_CHANGE: "/freeWalletSwitch", //多钱包和免转钱包模式切换
    SPREAD_LIST: "/member/promotionList", //获取推广链接列表
    SPREAD_GAME_TYPE: "/member/promotionGameType", //获取添加链接需要的彩种数据
    SPREAD_ADD: "/member/promotionAdd", //生成链接
    SPREAD_DELETE: "/member/promotionDelete", //删除链接
    SPREAD_MEMBER: "/member/promotionMember", //获取会员管理列表
    SPREAD_STATIS_LIST: "/member/promotionCount", //获取推广统计列表
    SPREAD_SUBORDINATE_LIST: "/member/promotionReport", //获取下级报表列表

    PURSE_ONLINE_COMPANY_LIST: "/disportCode", //获取公司入款和线上入款列表
    PURSE_ONLINE_INFO: "/online/info", //线上入款-获取入款信息
    PURSE_ONLINE_ADD: "/onlinePay", //线上入款-提交
    PURSE_ONLINE_THREE: "/online/buy", //线上入款-去第三方
    PURSE_ONLINE_BANK: "/online/bank", //线上入款-获取银行卡列表

    PURSE_COMPANY_INFO: "/company/info", //公司入款-获取入款信息
    PURSE_COMPANY_ADD: "/companyPay", //公司入款-提交
    PURSE_ORDER_INFO: "/income/info", //公司入款-获取订单详情

    PURSE_AUDIT: "/withdrawFee", //及时稽核查询
    PROXY_PROXYINFO: "/proxyInfo", //获取代理注册-后台配置信息
    PROXY_ADD: '/proxyAdd', //代理注册-提交


    //活动
    ACTIVITYLIST: "/getActivityTypeList",
    ACTIVITYRECEIVE: "/activityReceive",
    ACTIVITYINFO: "/getMyPromo",
    TURNTABLE: "/turntable",
    TURNTABLEINFO: "/turntableIfo",
    TURNTABLERECEIVE: "/turntableReceive",
    TURNTABLELUCKDRAW: "/turntableLuckdraw",
    TURNTABLEHISTORY: "/turntableRecording",

    PURSE_WITHDRAW_INFO: "/getWithDraw", //取款-详情
    PURSE_WITHDRAW_OUT: "/submitWithdraw", //取款-提交
    PURSE_WITHDRAW_CONTINUE: "/continueWithdraw", //取款-继续取款

    GET_GAME_NOTICE: "/getGameNotice", //获取游戏公告
    GET_GAME_TYPE: "/getGameType", //获取游戏公告下拉框
    GET_GAMENOTICE_DETAIL: "/getGameNoticeDetail", //获取游戏公告详情
    GET_SYS_NOTICE: "/getSysNotice", //系统公告
    GET_SYS_NOTICE_DETAIL: "/getSysNoticeDetail", //系统公告
    //资金记录
    TRANSACTION_TYPE: "getTransactionType", //资金记录类型获取
    TRANSACTION: "/getFundRecord",
    CONVERSIONS: "/member/conversions", //额度转换记录
    WITHDRAWLIST: "/withdrawals", //取款记录
    DEPOSITS: "/deposits", //存款记录
    //自助返水
    BACKWATERINFO: "/backwaterInfo", //自助反水查询
    BACKWATERRECEIVE: "/backwaterReceive", //自助反水查询
    BACKWATERLIST: "/backwater", //自助反水查询
    GET_USER_INFO: "/getUserInfo", //获取用户资料
    UPD_USERINFO: "/updateUserInfo", //用户资料修改

	//投注记录
	GET_GAMETAG: "/getGameTag", //电子游戏分类
	SITE_GAMES: "/getSiteGames", //投注记录大分类
	BETRECORD_CONDITION: "/betRecord/condition", //投注记录三级筛选
	BETRECORD_THIRD: "/betRecord/third", //彩票种类获取
    GET_BETTING: "/getBettingList", //投注记录 资金记录
    BET_RECORD_REPORT:"/betRecord/report",//我的报表

    //安全中心
    MODIFY_LOGINPWD: "/modifyLoginPassword", //修改登陆密码
    UPD_WITHDRAWLPWD: "/updateWithdrawalPassword", //修改取款密码
    MEM_BANK_LIST: "/member/bank/list", //会员银行卡列表
    SUB_BANKCARD: "/submitBankCard", //添加银行卡
    //------问卷
    INCESTIGATION_MESSAGE_LIST: "message/investigation/list",
    INCESTIGATION_MESSAGE_INFO: "/message/investigation/info",
    INCESTIGATION_MESSAGE_SEND: "/message/investigation/submit",
    INCESTIGATION_MESSAGE_ANSWER_INFO: "/message/investigation/query",
    //------收件箱
    INBOX_NUM:"/getUnReadCount",//获取site消息的未读数量
    INBOX_SYS_LIST:"/getSiteSysNotice",//系统消息列表
    INBOX_SYS_INFO:"/getSiteSysNoticeDetail",//获取系统消息详情
    INBOX_SYS_STATUS:"/setSiteSysNoticeStatus",//系统消息标记已读
    INBOX_SYS_DEL:"/deleteSiteSysNotice",//系统消息删除
    INBOX_MY_LIST:"/getSiteMyNotice",//获取我的消息列表
    INBOX_MY_INFO:"/advisoryMessageDetail",//获取我的消息详情
    INBOX_MY_STATUS:"/setSelectAdvisoryMessageIds",//我的消息标记已读
    INBOX_MY_DEL:"/deleteSiteMyNotice",//我的消息删除


    MEM_IS_SET_PWD:"/member/withdrawal/issetup",//是否设置过取款密码
    MEM_REALNAME:"/member/realName", //查询会员真实姓名
    BANK_LIST: "/bank/list", //银行卡下拉框
    MEM_BANK_ADD: "/member/bank/add", //添加银行卡
};
