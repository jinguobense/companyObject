// baoA/pages/goodsGuanli/setactiveXiu/setactiveXiu.js

const app = getApp();
const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const minutes = []
const seconds = []

for (let i = 1990; i <= date.getFullYear() + 1; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

for (let i = 0; i <= 23; i++) {
  hours.push(i)
}
for (let i = 0; i <= 59; i++) {
  minutes.push(i)
  seconds.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feileiIndex:"",
    zanshiName: '', //暂时
    anshiId: '', //暂时
    showAnceng1: false, //暗层
    years: years, //日期初始化
    year: '',
    year1: '',
    months: months,
    month: '',
    month1: '',
    days: days,
    day: '',
    day1: '',
    hours: hours,
    hour: '',
    hour1: '',
    minutes: minutes,
    minute: '',
    minute1: '',
    seconds: seconds,
    second: '',
    second1: '',
    valueRiqi: '',
    valueShijian: '',
    showAnceng: false, //暗层
    goodsModalone: false, //商品开始时间年月日弹窗
    goodsModaltwo: false, //商品开始时间时分秒弹窗
    zanshistartTime: '', //点击下一步时暂时年月日时间
    goodsstartTimes: '', //选择后的开始时间订单日期
    startTimestr: '', //开始时间订单日期字符串
    goodssendTimes: '', //选择后的结束时间订单日期
    endTimestr: '', //结束时间订单日期字符串
    startorend: true, //ture是开始时间，flase结束时间


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.fenleiIndex
    this.setData({
      feileiIndex:index
    })
    if(index == 0){
      wx.setNavigationBarTitle({title:'满减活动设置'})
    }else if(index == 1){
      wx.setNavigationBarTitle({title:'优惠券设置'})
    }
  },

  // 时间
  close_dingdanTime() {
    let that = this
    that.setData({
      showAnceng: false, //暗层
      goodsModalone: false, //商品开始时间年月日弹窗
      goodsModaltwo: false, //商品开始时间时分秒弹窗
    })
  },
  //关闭弹窗
  close_dingdanTime1: function () {
    this.setData({
      shopfenlModal: false, //店铺分类
      showAnceng1: false, //暗层的显示
      yijiModel: false,
      erjiModel: false,
      danweiModel: false,
      addshopfenlModal: false
    })
  },
  


  // 日期切换
  riqiChange: function (e) {
    let that = this
    const val = e.detail.value
    if (that.data.startorend) {
      this.setData({
        year: this.data.years[val[0]],
        month: this.data.months[val[1]],
        day: this.data.days[val[2]]
      })
    } else {
      this.setData({
        year1: this.data.years[val[0]],
        month1: this.data.months[val[1]],
        day1: this.data.days[val[2]]
      })
    }

  },
  // 时间切换
  shijianChange: function (e) {
    const val = e.detail.value
    let that = this
    if (that.data.startorend) {
      this.setData({
        hour: this.data.hours[val[0]],
        minute: this.data.minutes[val[1]],
        // second: this.data.seconds[val[2]]
      })
    } else {
      this.setData({
        hour1: this.data.hours[val[0]],
        minute1: this.data.minutes[val[1]],
        // second1: this.data.seconds[val[2]]
      })
    }

  },
  // 统计开始时间
  tongJiStart(e) {
    let that = this
    let dates = new Date()
    that.setData({
      year: dates.getFullYear(),
      year1: dates.getFullYear(),
      month: dates.getMonth() + 1,
      month1: dates.getMonth() + 1,
      day: dates.getDate(),
      day1: dates.getDate(),
      hour: dates.getHours(),
      hour1: dates.getHours(),
      minute: dates.getMinutes(),
      minute1: dates.getMinutes(),
      second: '',
      second1: '',
      valueRiqi: [dates.getFullYear() - 1990, dates.getMonth(), dates.getDate() - 1],
      valueShijian: [dates.getHours(), dates.getMinutes(), dates.getSeconds()],
    })
    console.log(e.currentTarget.dataset.startorend)
    let startorend
    let valueRiqi, valueShijian
    if (e.currentTarget.dataset.startorend == 1) {
      startorend = true
      valueRiqi = [(that.data.year - 1990), that.data.month - 1, that.data.day - 1]
      valueShijian = [that.data.hour, that.data.minute, that.data.second]
    } else {
      startorend = false
      valueRiqi = [(that.data.year1 - 1990), that.data.month1 - 1, that.data.day1 - 1]
      valueShijian = [that.data.hour1, that.data.minute1, that.data.second1]
    }
    this.setData({
      goodsModalone: true,
      showAnceng: true,
      startorend: startorend,
      valueRiqi: valueRiqi,
      valueShijian: valueShijian,
      // year: e.currentTarget.dataset.year * 1,
      // month: e.currentTarget.dataset.month * 1,
    })
  },
  // 统计下一步时间
  xiayiBu: function () {
    console.log('开始')
    let that = this
    let times = {}
    if (that.data.startorend) {
      times.year = that.data.year
      if (that.data.month * 1 < 10) {
        times.month = '0' + that.data.month
      } else {
        times.month = that.data.month
      }
      if (that.data.day * 1 < 10) {
        times.day = '0' + that.data.day
      } else {
        times.day = that.data.day
      }
    } else {
      times.year = that.data.year1
      if (that.data.month1 * 1 < 10) {
        times.month = '0' + that.data.month1
      } else {
        times.month = that.data.month1
      }
      if (that.data.day1 * 1 < 10) {
        times.day = '0' + that.data.day1
      } else {
        times.day = that.data.day1
      }
    }
    this.setData({
      goodsModalone: false,
      goodsModaltwo: true,
      zanshistartTime: times
    })
  },
  // 统计确定时间
  quedingEnd: function () {
    let that = this
    let times = that.data.zanshistartTime
    if (that.data.startorend) {
      if (that.data.hour * 1 < 10) {
        times.hour = '0' + that.data.hour
      } else {
        times.hour = that.data.hour
      }
      if (that.data.minute * 1 < 10) {
        times.minute = '0' + that.data.minute
      } else {
        times.minute = that.data.minute
      }
      // if (that.data.second * 1 < 10) {
      //   times.second = '0' + that.data.second
      // } else {
      //   times.second = that.data.second
      // }
    } else {
      if (that.data.hour1 * 1 < 10) {
        times.hour = '0' + that.data.hour1
      } else {
        times.hour = that.data.hour1
      }
      if (that.data.minute1 * 1 < 10) {
        times.minute = '0' + that.data.minute1
      } else {
        times.minute = that.data.minute1
      }
      // if (that.data.second1 * 1 < 10) {
      //   times.second = '0' + that.data.second1
      // } else {
      //   times.second = that.data.second1
      // }
    }

    let timestr = times.year + '-' + times.month + '-' + times.day + ' ' + times.hour + ':' + times.minute + ':00'
    if (that.data.startorend) {
      this.setData({
        showAnceng: false,
        goodsModaltwo: false,
        goodsstartTimes: times,
        startTimestr: timestr
      })
    } else {
      this.setData({
        showAnceng: false,
        goodsModaltwo: false,
        goodssendTimes: times,
        endTimestr: timestr
      })
    }
  },
 
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})