import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index/Index.vue";
import Games from "./views/index/Games.vue";

Vue.use(Router);

export default new Router({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			redirect: {
				name: "index"
			}
		},
		//首页
		{
			path: "/index",
			name: "index",
			component: Index
		},
		{
			path: "/games",
			name: "games",
			component: Games
		}
		// {
		// 	path: "/settings",
		// 	name: "settings",
		// 	component: require(/* webpackChunkName: "index" */ "./views/index/Settings.vue")
		// },
		// //登录
		// {
		// 	path: "/login",
		// 	name: "login",
		// 	component: require("./views/auth/Login.vue")
		// },
		// {
		// 	path: "/register",
		// 	name: "register",
		// 	component: require("./views/auth/Register.vue")
		// },

		// //活动
		// {
		// 	path: "/activity",
		// 	name: "activity",
		// 	component: require(/* webpackChunkName: "activity" */ "./views/activity/Activity.vue")
		// },
		// //活动详情
		// {
		// 	path: "/actDetail",
		// 	name: "actDetail",
		// 	component: require(/* webpackChunkName: "activity" */ "./views/activity/ActDetail.vue")
		// },
		// //幸运大转盘
		// {
		// 	path: "/luckdraw",
		// 	name: "luckdraw",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "activity" */ "./views/activity/Luckdraw.vue")
		// },
		// //钱包
		// {
		// 	path: "/purse",
		// 	name: "purse",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "purse" */ "./views/purse/Purse.vue")
		// },
		// //钱包-稽核查询
		// {
		// 	path: "/auditQuery",
		// 	name: "auditQuery",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "auditQuery" */ "./views/purse/auditQuery/AuditQuery.vue")
		// },
		// //钱包余额
		// {
		// 	path: "/purseDeposit",
		// 	name: "purseDeposit",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "purseDeposit" */ "./views/purse/PurseDeposit.vue")
		// },
		// //存款
		// {
		// 	path: "/deposit",
		// 	name: "deposit",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "deposit" */ "./views/purse/deposit/Deposit.vue")
		// },
		// //存款-线上入款-支付宝/微信
		// {
		// 	path: "/online/alipay",
		// 	name: "onlineAlipay",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "onlineAlipay" */ "./views/purse/deposit/DepositOnlineAlipay.vue")
		// },
		// //存款-线上入款-网银
		// {
		// 	path: "/online/ebank",
		// 	name: "onlineEBank",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "onlineEBank" */ "./views/purse/deposit/DepositOnlineEBank.vue")
		// },
		// //存款-线上入款-点卡
		// {
		// 	path: "/online/timeCard",
		// 	name: "timeCard",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "timeCard" */ "./views/purse/deposit/DepositOnlineTimeCard.vue")
		// },
		// //存款-线上入款/公司存款-支付返回结果页
		// {
		// 	path: "/payResult",
		// 	name: "payResult",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "payResult" */ "./views/purse/deposit/DepositPayResult.vue")
		// },
		// //存款-线上入款/公司存款-支付成功页
		// {
		// 	path: "/paySuccess",
		// 	name: "paySuccess",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "paySuccess" */ "./views/purse/deposit/DepositPaySuccess.vue")
		// },
		// //存款-公司存款-支付宝/微信
		// {
		// 	path: "/company/alipay",
		// 	name: "companyAlipay",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "companyAlipay" */ "./views/purse/deposit/DepositCompanyAlipay.vue")
		// },
		// //存款-公司存款-银行卡
		// {
		// 	path: "/company/ebank",
		// 	name: "companyEBank",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "companyEBank" */ "./views/purse/deposit/DepositCompanyEBank.vue")
		// },

		// //存款-线上存款/公司存款-记录
		// {
		// 	path: "/deposit/record",
		// 	name: "depositRecord",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "depositRecord" */ "./views/purse/deposit/DepositRecord.vue")
		// },

		// //取款
		// {
		// 	path: "/withdraw",
		// 	name: "withdraw",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "withdraw" */ "./views/purse/withdraw/Withdraw.vue")
		// },
		// //取款-稽核
		// {
		// 	path: "/withdraw/audit",
		// 	name: "withdrawAudit",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "withdrawAudit" */ "./views/purse/withdraw/WithdrawAudit.vue")
		// },
		// //取款-成功
		// {
		// 	path: "/withdraw/success",
		// 	name: "withdrawSuccess",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "withdrawSuccess" */ "./views/purse/withdraw/WithdrawSuccess.vue")
		// },
		// //额度转换
		// {
		// 	path: "/transfer",
		// 	name: "transfer",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "transfer" */ "./views/purse/transfer/Transfer.vue")
		// },
		// //自助返水
		// {
		// 	path: "/backwater",
		// 	name: "backwater",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "backwater" */ "./views/purse/backwater/Backwater.vue")
		// },
		// //会员返佣
		// {
		// 	path: "/backCommission",
		// 	name: "backCommission",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "backCommission" */ "./views/purse/backCommission/BackCommission.vue")
		// },
		// //现金流水
		// {
		// 	path: "/moneyWater",
		// 	name: "moneyWater",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "moneyWater" */ "./views/purse/moneyWater/MoneyWater.vue")
		// },
		// //订单
		// {
		// 	path: "/order",
		// 	name: "order",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "order" */ "./views/order/Order.vue"),
		// 	children: [
		// 		//彩票
		// 		{
		// 			path: "lottery",
		// 			name: "lottery",
		// 			component: require(/* webpackChunkName: "order" */ "./views/order/Lottery.vue")
		// 		},
		// 		//棋牌
		// 		{
		// 			path: "chess",
		// 			name: "chess",
		// 			component: require(/* webpackChunkName: "order" */ "./views/order/Chess.vue")
		// 		},
		// 		//视讯
		// 		{
		// 			path: "directvideo",
		// 			name: "directvideo",
		// 			component: require(/* webpackChunkName: "order" */ "./views/order/Directvideo.vue")
		// 		},
		// 		//电子
		// 		{
		// 			path: "tvgame",
		// 			name: "tvgame",
		// 			component: require(/* webpackChunkName: "order" */ "./views/order/Tvgame.vue")
		// 		},
		// 		//体育
		// 		{
		// 			path: "sports",
		// 			name: "sports",
		// 			component: require(/* webpackChunkName: "order" */ "./views/order/Sports.vue")
		// 		}
		// 	]
		// },
		// //报表
		// {
		// 	path: "/reportform",
		// 	name: "reportform",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "order" */ "./views/order/Reportform.vue")
		// },
		// //我的
		// {
		// 	path: "/my",
		// 	name: "my",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/My.vue")
		// },
		// {
		// 	path: "/about",
		// 	name: "about",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/about/About.vue")
		// },
		// {
		// 	path: "/bankCard",
		// 	name: "bankCard",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/bankCard/BankCard.vue"),
		// 	children: []
		// },
		// {
		// 	path: "/bankCardadd",
		// 	name: "bankCardadd",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/bankCard/AddBankCard.vue")
		// },
		// //密码管理
		// {
		// 	path: "/password",
		// 	name: "password",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/password/Password.vue")
		// },
		// //消息中心
		// {
		// 	path: "/msgcenter",
		// 	name: "msgcenter",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/msgCenter/MsgCenter.vue")
		// },
		// {
		// 	path: "/msgcenters",
		// 	name: "msgcenters",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/msgCenter/MsgCenters.vue")
		// },
		// //代理账号
		// {
		// 	path: "/agencyappli",
		// 	name: "agencyappli",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/agencyApplication/Agencyapplication.vue")
		// },
		// //我要推广
		// {
		// 	path: "/spread",
		// 	name: "spread",
		// 	meta: { auth: true },
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/Spread.vue")
		// },
		// //联系我们
		// {
		// 	path: "/contactus",
		// 	name: "contactus",
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/Contactus.vue")
		// },
		// //更多
		// {
		// 	path: "/more",
		// 	name: "more",
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/more/More.vue")
		// },
		// //关于我们
		// {
		// 	path: "/morepage",
		// 	name: "morepage",
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/more/Morepage.vue")
		// },
		// {
		// 	path: "/selfHelp",
		// 	name: "selfHelp",
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/selfHelp/SelfHelp.vue")
		// },
		// {
		// 	path: "/selfDetail",
		// 	name: "selfDetail",
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/selfHelp/SelfHelpDetail.vue")
		// },
		// {
		// 	path: "/apply",
		// 	name: "apply",
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/selfHelp/Apply.vue")
		// },
		// {
		// 	path: "/selfmore",
		// 	name: "selfmore",
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/selfHelp/Selfmore.vue")
		// },
		// {
		// 	path: "/agencyaccount",
		// 	name: "agencyaccount",
		// 	component: require(/* webpackChunkName: "my" */ "./views/my/agencyappliction/Agencyaccount.vue")
		// },

		// //维护
		// {
		// 	path: "/maintainweb",
		// 	name: "maintainweb",
		// 	component: require(/* webpackChunkName: "my" */ "./views/Maintainweb.vue")
		// },
		// {
		// 	path: "/maintaingame",
		// 	name: "maintaingame",
		// 	component: require(/* webpackChunkName: "my" */ "./views/MaintainGame.vue")
		// }
	]
});
