// pages/baobiao/baobiao.js
// 图表
import * as echarts from '../../ec-canvas/echarts';

const app = getApp()
const date = new Date()
const years = []
const months = []
const days = []


for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    index: 0, //头部切换
    years: years, //日期初始化
    year: '',
    year1: '',
    year2: '',
    year3: '',
    months: months,
    month: '',
    month1: '',
    month2: '',
    month3: '',
    days: days,
    day: '',
    day1: '',
    day2: '',
    day3: '',
    dingdanTimes1: "", //选择后的订单日期
    dingdanTimes2: '', //选择和的商品统计日期
    dingdanTimes3: "",
    value: [], //选择时间的值【年月日】
    value1: [], //选择时间的值【年月日】开始
    value2: [], //选择时间的值【年月日】 结束
    showAnceng: false, //暗层
    goodsModalone: false, //商品统计选择开始时间弹窗
    goodsModaltwo: false, //商品统计选择结束时间弹窗
    tongjitype: 1, //1商品统计 2 财务统计
    zanshistartTime: '', //点击下一步时暂时存储的时间
    orShow: false, //未来请求切换页面请求数据，先是不显示，因为一直显示不能再次请求数据
    goodsnowpage: 1,
    goodstongjiList: [],
    caiwunowpage: 1,
    caiwutotalpage: 1,
    caiwutongjiInfo: '',
    refunorderinfo: '',
    orderobj: '',
    showflag: false

  },
  // 切换统计表
  changes(e) {
    setTimeout(function () {
      wx.showLoading({
        title: '加载中',
      })
    }, 0)
    // console.log(e)2
    let that = this
    let indexs = e.currentTarget.dataset.index
    that.setData({
      index: indexs,
      goodsnowpage: 1,
      caiwunowpage: 1,
      caiwutotalpage: 1
    })
    if (indexs == 0) {
      that.getorderinfo()
    } else if (indexs == 1) {
      that.setData({
        showflag: false
      })
      that.getgoodstongji()
    } else if (indexs == 2) {
      that.setData({
        showflag: false
      })
      that.getcaiwutongji()
    }


  },
  // 订单日期弹窗弹窗
  dingdanTime: function (e) {
    let value = this.data.value
    value[0] = e.currentTarget.dataset.year * 1 - 1990
    value[1] = e.currentTarget.dataset.month * 1 - 1
    console.log(value)
    this.setData({
      dingdanModal: true,
      showAnceng: true,
      filter: true,
      year: e.currentTarget.dataset.year * 1,
      month: e.currentTarget.dataset.month * 1,
      value: value,
    })
  },
  // 关闭订单日期弹窗
  close_dingdanTime: function () {
    this.setData({
      dingdanModal: false, //订单的时间弹窗
      showAnceng: false, //暗层的显示
      filter: false, //图表的显示
      goodsModalone: false, //商品统计选择开始时间弹窗
      goodsModaltwo: false, //商品统计选择结束时间弹窗
    })
  },
  //确定订单日期弹窗
  queding_dingdanTime:function(){
    let that = this
    let dingdanTimes1 = {}
    dingdanTimes1.year = that.data.year1
    if (that.data.month1 * 1 < 10) {
      dingdanTimes1.month = '0' + that.data.month1
    } else {
      dingdanTimes1.month = that.data.month1
    }
    this.setData({
      dingdanModal: false,
      showAnceng: false,
      filter: false,
      dingdanTimes1: dingdanTimes1
    })
    that.getorderinfo()
  },
  //订单日期切换
  dingdanChange: function(e) {
    const val = e.detail.value
    this.setData({
      year1: this.data.years[val[0]],
      month1: this.data.months[val[1]]
    })
  },
  //商品统计统计开始
  tongJiStart1(e) {
    let that = this
    let value1 = that.data.value1
    let value2 = that.data.value2
    value1[0] = e.currentTarget.dataset.timeobj.yearstar * 1 - 1990
    value1[1] = e.currentTarget.dataset.timeobj.monthstar * 1 - 1
    value1[2] = e.currentTarget.dataset.timeobj.daystar * 1 - 1
    value2[0] = e.currentTarget.dataset.timeobj.yearend * 1 - 1990
    value2[1] = e.currentTarget.dataset.timeobj.monthend * 1 - 1
    value2[2] = e.currentTarget.dataset.timeobj.dayend * 1 - 1
    that.setData({
      goodsModalone: true,
      showAnceng: true,
      zanshistartTime: '',
      tongjitype: 1,
      value1: value1,
      value2: value2,
      year2: e.currentTarget.dataset.timeobj.yearstar,
      year3: e.currentTarget.dataset.timeobj.yearend,
      month2: e.currentTarget.dataset.timeobj.monthstar,
      month3: e.currentTarget.dataset.timeobj.monthend,
      day2: e.currentTarget.dataset.timeobj.daystar,
      day3: e.currentTarget.dataset.timeobj.dayend,
    })
  },
  //财务统计统计开始
  tongJiStart2(e) {
    let that = this
    let value1 = that.data.value1
    let value2 = that.data.value2
    value1[0] = e.currentTarget.dataset.timeobj.yearstar * 1 - 1990
    value1[1] = e.currentTarget.dataset.timeobj.monthstar * 1 - 1
    value1[2] = e.currentTarget.dataset.timeobj.daystar * 1 - 1
    value2[0] = e.currentTarget.dataset.timeobj.yearend * 1 - 1990
    value2[1] = e.currentTarget.dataset.timeobj.monthend * 1 - 1
    value2[2] = e.currentTarget.dataset.timeobj.dayend * 1 - 1
    that.setData({
      goodsModalone: true,
      showAnceng: true,
      zanshistartTime: '',
      tongjitype: 2,
      value1: value1,
      value2: value2,
      year2: e.currentTarget.dataset.timeobj.yearstar,
      year3: e.currentTarget.dataset.timeobj.yearend,
      month2: e.currentTarget.dataset.timeobj.monthstar,
      month3: e.currentTarget.dataset.timeobj.monthend,
      day2: e.currentTarget.dataset.timeobj.daystar,
      day3: e.currentTarget.dataset.timeobj.dayend,
    })
  },
  // 订单日期切换
  dingdanChange2: function(e) {
    const val = e.detail.value
    this.setData({
      year2: this.data.years[val[0]],
      month2: this.data.months[val[1]],
      day2: this.data.days[val[2]]
    })
  },
  // 订单日期切换
  dingdanChange3: function(e) {
    const val = e.detail.value
    this.setData({
      year3: this.data.years[val[0]],
      month3: this.data.months[val[1]],
      day3: this.data.days[val[2]]
    })
  },
  // 统计下一步时间
  xiayiBu: function() {
    let that = this
    let times = {}
    times.year = that.data.year2
    if (that.data.month2 * 1 < 10) {
      times.month = '0' + that.data.month2 * 1
    } else {
      times.month = that.data.month2
    }
    if (that.data.day2 * 1 < 10) {
      times.day = '0' + that.data.day2 * 1
    } else {
      times.day = that.data.day2
    }
    this.setData({
      goodsModalone: false,
      goodsModaltwo: true,
      zanshistartTime: times
    })
  },
  // 统计确定时间
  quedingEnd: function() {
    setTimeout(function() {
      wx.showLoading({
        title: '加载中',
      })
    }, 0)
    let that = this
    let times = {}
    let zanshistartTime = that.data.zanshistartTime
    let dingdanTimes2 = that.data.dingdanTimes2
    let dingdanTimes3 = that.data.dingdanTimes3
    times.year = that.data.year3
    if (that.data.month3 * 1 < 10) {
      times.month = '0' + that.data.month3 * 1
    } else {
      times.month = that.data.month3 * 1
    }
    if (that.data.day3 * 1 < 10) {
      times.day = '0' + that.data.day3 * 1
    } else {
      times.day = that.data.day3 * 1
    }
    if (that.data.tongjitype == 1) {
      dingdanTimes2.yearstar = zanshistartTime.year
      dingdanTimes2.monthstar = zanshistartTime.month
      dingdanTimes2.daystar = zanshistartTime.day
      dingdanTimes2.yearend = times.year
      dingdanTimes2.monthend = times.month
      dingdanTimes2.dayend = times.day
    } else if (that.data.tongjitype == 2) {
      dingdanTimes3.yearstar = zanshistartTime.year
      dingdanTimes3.monthstar = zanshistartTime.month
      dingdanTimes3.daystar = zanshistartTime.day
      dingdanTimes3.yearend = times.year
      dingdanTimes3.monthend = times.month
      dingdanTimes3.dayend = times.day
    }
    this.setData({
      showAnceng: false,
      goodsModaltwo: false,
      dingdanTimes2: dingdanTimes2,
      dingdanTimes3: dingdanTimes3,
      goodsnowpage: 1,
      caiwunowpage: 1,
      caiwutotalpage: 1,
      showflag: false
    })
    if (that.data.tongjitype == 1) {
      that.setData({
        goodsnowpage: 1
      })
      that.getgoodstongji()
    } else if (that.data.tongjitype == 2) {
      that.getcaiwutongji()
    }
  },
  //获取商品统计
  getgoodstongji() {
    let that = this
    let dingdanTimes2 = that.data.dingdanTimes2
    let ster = dingdanTimes2.yearstar + '-' + dingdanTimes2.monthstar + '-' + dingdanTimes2.daystar
    let end = dingdanTimes2.yearend + '-' + dingdanTimes2.monthend + '-' + dingdanTimes2.dayend
    wx.request({
      url: app.globalData.myurl,
      data: {
        cmd: "goodsStat",
        nowPage: that.data.goodsnowpage,
        shopId: wx.getStorageSync('shopId'),
        begintime: ster,
        endtime: end
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.zjstate == 1) {
          setTimeout(function() {
            wx.hideLoading()
            wx.stopPullDownRefresh() //停止下拉刷新
          }, 0)
          setTimeout(function() {
            wx.showModal({
              title: '您的账号已在其他设备登录，请重新登录！',
              showCancel: false, //是否显示取消按钮false去掉取消按钮
              success: function(res) {
                if (res.confirm) {
                  wx.clearStorageSync()
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
                }else{
                  wx.clearStorageSync()
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
                }
              }
            })
          }, 0)
          return
        }
        console.log(res)
        that.setData({
          showflag: true
        })
        if (res.data.result == 1) {
          setTimeout(function() {
            wx.hideLoading()
          }, 0)
          setTimeout(function() {
            wx.showToast({
              title: res.data.resultNote,
              icon: 'none',
              duration: 1500
            })
          }, 0)
        } else {
          // if (that.data.nowpage == 1) {
          that.setData({
            goodstongjiList: res.data.goodsStataList,
            
            // totalpage: res.data.totalPage
          })
          // } else {
          //   var list = that.data.goodsList;
          //   for (var i in res.data.goodsStataList) {
          //     list.push(res.data.goodsStataList[i])
          //   }
          //   that.setData({
          //     goodsList: list,
          //     // totalpage: res.data.totalPage
          //   })
          // }
          setTimeout(function() {
            wx.hideLoading()
          }, 0)
        }
      }
    });
  },
  //获取财务统计
  getcaiwutongji() {
    let that = this
    let dingdanTimes2 = that.data.dingdanTimes3
    let ster = dingdanTimes2.yearstar + '-' + dingdanTimes2.monthstar + '-' + dingdanTimes2.daystar
    let end = dingdanTimes2.yearend + '-' + dingdanTimes2.monthend + '-' + dingdanTimes2.dayend + ' 23:59:59'
    wx.request({
      url: app.globalData.myurl,
      data: {
        cmd: "acctDetailList",
        nowPage: that.data.caiwunowpage,
        shopId: wx.getStorageSync('shopId'),
        userId: wx.getStorageSync('userId'),
        type: '',
        startTime: ster,
        endTime: end
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
       // "token": wx.getStorageSync('token')
      },
      success(res) {
        
        console.log(res)
        that.setData({
          showflag:true
        })
        if (res.data.result == 1) {
          setTimeout(function() {
            wx.hideLoading()
          }, 0)
          setTimeout(function() {
            wx.showToast({
              title: res.data.resultNote,
              icon: 'none',
              duration: 1500
            })
          }, 0)
        } else {
          let acclist = res.data.accDetailList
          for (var i in acclist) {
            acclist[i].timeheader = acclist[i].orderTime.substring(0, 10)
            acclist[i].timefooter = acclist[i].orderTime.substring(10)
          }
          if (that.data.caiwunowpage == 1) {
            that.setData({
              caiwutongjiList: acclist,
              caiwutotalpage: res.data.totalPage,
              caiwutongjiInfo: res.data
            })
          } else {
            var list = that.data.caiwutongjiList;
            for (var i in res.data.accDetailList) {
              acclist[i].timeheader = acclist[i].orderTime.substring(0, 10)
              acclist[i].timefooter = acclist[i].orderTime.substring(10)
              list.push(res.data.accDetailList[i])
            }
            that.setData({
              caiwutongjiList: list,
              caiwutotalpage: res.data.totalPage,
              caiwutongjiInfo: res.data
            })
          }
          setTimeout(function() {
            wx.hideLoading()
          }, 0)
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dates = new Date()
    let month, day
    if (dates.getMonth() + 1 < 10) {
      month = '0' + (dates.getMonth() + 1)
    } else {
      month = dates.getMonth() + 1
    }
    if (dates.getDate() < 10) {
      day = '0' + dates.getDate()
    } else {
      day = dates.getDate()
    }
    this.setData({
      year: dates.getFullYear(),
      month: month,
      day: day,
      dingdanTimes1: {
        year: dates.getFullYear(),
        month: month
      }, //选择后的订单日期
      dingdanTimes2: {
        yearstar: dates.getFullYear(),
        monthstar: month,
        daystar: '01',
        yearend: dates.getFullYear(),
        monthend: month,
        dayend: day,
      }, //选择后的商品统计日期
      dingdanTimes3: {
        yearstar: dates.getFullYear(),
        monthstar: month,
        daystar: '01',
        yearend: dates.getFullYear(),
        monthend: month,
        dayend: day,
      }, //选择后的财务统计日期
    })
  },
  getorderinfo() {
    let that = this
    let dingdanTimes1  = that.data.dingdanTimes1;
    let times = dingdanTimes1.year + '-' + dingdanTimes1.month
    let obj = {
      "tuilist": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "wanchlist": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    wx.request({
      url: app.globalData.myurl,
      data: {
        cmd: "orderStat",
        shopId: wx.getStorageSync('shopId'), //店铺id
        userId: wx.getStorageSync('userId') ,//用户ID
        month: times, //月份（String类型）
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        //"token": wx.getStorageSync('token')
      },
      success(res){
        console.log(res)
        for(let i in res.data.dosList){
          obj.wanchlist[(res.data.dosList[i].day)*1 - 1] = res.data.dosList[i].count
        }
        for(let j in res.data.dosList1){
          obj.tuilist[(res.data.dosList1[j].day) * 1 - 1] = res.data.dosList1[j].count
        }
        that.setData({
          finishorderinfo: res.data.mos,
          refundorderinfo: res.data.ros,
          orderobj: obj
        })
        that.echartsComponnet = that.selectComponent('#mychart');
        that.init_echarts()
      }

    })
  },
  //初始化图表
  init_echarts: function() {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等

      wx.hideLoading()
      return Chart;

    });
  },
  //获取数据
  getOption:function(){
    let that = this
    let obj = that.data.orderobj
    let option = {
      tooltip: {
        trigger: 'axis',
        position: function(point, params, dom, rect, size) {
          return ['50%', point[1]];
        }
      },
      legend: {
        y: 6,
        data: ['已完成数量', '已退款数量']
      },
      grid: {
        left: '10%',
        right: '6%',
        bottom: '10%',
        // containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 11
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '单位：单',
        minInterval: 1,//整数
        nameTextStyle: {
          fontSize: 10
        },
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 11
          }
        }
      },
      series: [{
          name: '已完成数量',
          type: 'line',
          data: obj.wanchlist
        },
        {
          name: '已退款数量',
          type: 'line',
          data: obj.tuilist
        }
      ]
    };

    return option


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
    let that = this
    setTimeout(function() {
      wx.showLoading({
        title: '加载中',
      })
    }, 0)
    that.setData({
      goodsnowpage: 1,
      caiwunowpage: 1,
      caiwutotalpage: 1,
    })

    if (that.data.index == 0) {
      that.getorderinfo()
    } else if (that.data.index == 1) {
      that.getgoodstongji()
    } else if (that.data.index == 2) {
      that.getcaiwutongji()
    }
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
  addxiayiye() {
    let that = this
    setTimeout(function() {
      wx.showLoading({
        title: '加载中',
      })
    }, 0)
    that.setData({
      caiwunowpage: that.data.caiwunowpage + 1
    })
    that.getcaiwutongji()
  },
  chudi() {
    let that = this
    let caiwunowpage = that.data.caiwunowpage
    caiwunowpage = caiwunowpage + 1
    let caiwutotalpage = that.data.caiwutotalpage
    if (caiwunowpage <= caiwutotalpage) {
      setTimeout(function() {
        wx.showLoading({
          title: '加载中',
        })
      }, 0)
      that.setData({
        caiwunowpage: caiwunowpage
      })
      that.getcaiwutongji()
    } else {
      wx.showToast({
        title: '已经到底了',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})