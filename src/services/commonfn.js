import moment from 'moment'
// 今日
export function today() {
    var today = moment().subtract('days', 0).format('YYYY-MM-DD')
    return {
        startDate: Date.parse(today + ' 00:00:00') / 1000,
        endDate: Date.parse(today + ' 23:59:59') / 1000
    }
}
// 最近2小时
export function nearTwohours() {
    return{
        startDate: Date.parse(moment().subtract('h', 2).format('YYYY-MM-DD HH:mm:ss')) / 1000,
        endDate: Date.parse(moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')) / 1000
    }
}
// 本周
export function week() {
    let weekOfday = parseInt(moment().format('d')) // 计算今天是这周第几天 周日为一周中的第一天
    let start = moment().subtract(weekOfday - 1, 'days').format('YYYY-MM-DD') // 周一日期
    let end = moment().add(6 - weekOfday + 1, 'days').format('YYYY-MM-DD') // 周日日期
    return {
        startDate: Date.parse(start + ' 00:00:00') / 1000,
        endDate: Date.parse(end + ' 23:59:59') / 1000
    }
}
// 本月
export function month() {
    const startDate = moment().subtract('month', 0).format('YYYY-MM') + '-01'
    const endDate = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
    return{
        startDate: Date.parse(startDate + ' 00:00:00') / 1000,
        endDate: Date.parse(endDate) / 1000
    }
}
// 上月
export function lastmonth() {
    var start = moment().subtract('month', 1).format('YYYY-MM') + '-01'
    var end = moment(start).subtract('month', -1).add('days', -1).format('YYYY-MM-DD')
    return {
        startDate: Date.parse(start + ' 00:00:00') / 1000,
        endDate: Date.parse(end + ' 23:59:59') / 1000
    }
}

console.log(nearTwohours());

export const timeItems = [
    {
        'name': '最近两小时',
        'value': 0
    },
    {
        'name': '今天',
        'value': 1
    },
    {
        'name': '本周',
        'value': 2
    },
    {
        'name': '本月',
        'value': 3
    },
    {
        'name': '上月',
        'value': 4
    }
]

export const timeStamp = [
    {
        'name': '最近两小时',
        'value': nearTwohours()
    },
    {
        'name': '今天',
        'value': today()
    },
    {
        'name': '本周',
        'value': week()
    },
    {
        'name': '本月',
        'value': month()
    },
    {
        'name': '上月',
        'value': lastmonth()
    }
]