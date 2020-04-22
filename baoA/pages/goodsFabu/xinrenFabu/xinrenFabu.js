// baoA/pages/goodsFabu/manjianFabu/manjianFabu.js

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
  
  data: {
    zanshiName: '', //暂时
    anshiId: '', //暂时
    showAnceng1: false, //暗层
    shopfenlModal: false, //店铺分类
    yijiModel: false, //一级分类
    erjiModel: false, //二级分类
    danweiModel: false, //单位
    addshopfenlModal: false,
    headIndex: 0,

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

    array: [], //商品单位
    shuxingFenleiarray: [], //商品属性分类列表
    yijiFenlei: '', //一级分类ID
    erjiFenlei: '', //二级分类ID
    danweis: '', //单位ID
    shuxing: '', //属性ID
    index: '', //商品单位下标
    sumfenlei: '', //一级二级总分类
    yijiindex: '', //一级分类下标
    erjiindex: '', //二级分类下标
    shuxingindex: '', //属性分类下标
    goodsValName: '', //商品名称

    imgURL: '', //信息封面图
    guigelist: [], //规格列表
    imglistobg: '', //上传的单个商品主图
    goodsZhutu: [], //商品主图列表
    xiangQingimg: '',

    hiddenmodalput: true, //新建商品属性显示
    name: "", //新添加的分类
    goodsId: '', //修改必填
    goId: '', //修改必填

  },
   //点击店铺分类弹窗
   showshoplist() {
    let _this = this
    if (!_this.data.shuxingFenleiarray.length) {
      _this.setData({
        showAnceng: true,
        shopfenlModal: true,
        zanshiName: '',
        anshiId: ''
      })
    } else {
      _this.setData({
        showAnceng: true,
        shopfenlModal: true,
        zanshiName: 0,
        anshiId: _this.data.shuxingFenleiarray[0].goodsTypeId
      })
    }
  },
  //店铺暂时存储
  changeshuxingVal(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let _this = this
    _this.setData({
      zanshiName: e.detail.value[0],
      anshiId: _this.data.shuxingFenleiarray[e.detail.value[0]].goodsTypeId
    })
  },
  //点击一级分类弹窗*********************************
  showyijilist() {
    let _this = this
    _this.setData({
      showAnceng: true,
      yijiModel: true,
      zanshiName: 0,
      anshiId: _this.data.sumfenlei[0].pfgTypeId1
    })
  },
  //一级暂时存储
  changeyijiVal(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let _this = this
    _this.setData({
      zanshiName: e.detail.value[0],
      anshiId: _this.data.sumfenlei[e.detail.value[0]].pfgTypeId1
    })
  },
  //确定1级分类
  yijiChange: function () {
    let _this = this
    this.setData({
      yijiindex: _this.data.zanshiName,
      yijiFenlei: _this.data.anshiId,
      showAnceng: false, //暗层的显示
      yijiModel: false,
      erjiindex: '',
      erjiFenlei: ''
    })
  },
  //未选一级，选二级*********************
  yesorno() {
    setTimeout(function () {
      wx.showToast({
        title: '请先选择一级分类',
        icon: 'none',
        duration: 1500
      })
    }, 0)
  },
  //点击二级分类弹窗****************
  showerjilist() {
    let _this = this
    _this.setData({
      showAnceng: true,
      erjiModel: true,
      zanshiName: 0,
      anshiId: _this.data.sumfenlei[_this.data.yijiindex].subTypeList[0].pfgTypeId2
    })
  },
  //二级暂时存储
  changeerjiVal(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let _this = this
    _this.setData({
      zanshiName: e.detail.value[0],
      anshiId: _this.data.sumfenlei[_this.data.yijiindex].subTypeList[e.detail.value[0]].pfgTypeId2
    })
  },
  //确定二级分类
  erjiChange: function (e) {
    let _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      erjiindex: _this.data.zanshiName,
      erjiFenlei: _this.data.anshiId,
      showAnceng: false,
      erjiModel: false,
    })
  },

  //点击单位弹窗*******************
  showdanweilist() {
    let _this = this
    _this.setData({
      showAnceng: true,
      danweiModel: true,
      zanshiName: 0,
      anshiId: _this.data.array[0].unitNo
    })
  },
  //单位暂时存储
  changedanweiVal(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let _this = this
    _this.setData({
      zanshiName: e.detail.value[0],
      anshiId: _this.data.array[e.detail.value[0]].unitNo
    })
  },
  //确定单位
  danweiChange: function (e) {
    let _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      index: _this.data.zanshiName,
      danweis: _this.data.anshiId,
      showAnceng: false,
      danweiModel: false,
    })
  },

  //获取平台分类
  getgoodstypelist() {
    let _this = this
    wx.request({
      url: app.globalData.myurl,
      method: 'POST',
      data: {
        cmd: "getPlatGoodType"
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        _this.setData({
          sumfenlei: res.data.pfgType
        })
        
      }
    })
  },

  //获取平台属性列表
  getshoptypelist() {
    let _this = this
    wx.request({
      url: app.globalData.myurl,
      method: 'POST',
      data: {
        cmd: "getGoodsTypes",
        shopId: wx.getStorageSync('shopId')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res, 333333)
        _this.setData({
          shuxingFenleiarray:res.data.goodsType
        })
      }
    })
  },

  //获取单位
  getdanwei() {
    let _this = this
    wx.request({
      url: app.globalData.myurl,
      method: 'post',
      data: {
        cmd: "getGoodUnitData"
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log(res)
        _this.setData({
          array: res.data.unitList
        })
      }
    })
  },

  //上传封面图
  addFengmian() {
    let _this = this
    wx.navigateTo({
      url: '../cropper/cropper',
    })
  },
  //上传主图
  addzhutuImg(){
    let _this = this
    _this.setData({
      imglistobg: ''
    })
    wx.navigateTo({
      url: '../cropper/cropper?type=zhu',
    })
  },
  //删除主图
  shanchuzhutu(e) {
    let indexs = e.currentTarget.dataset.index
    let tupianList = this.data.goodsZhutu
    tupianList.splice(indexs, 1)
    this.setData({
      goodsZhutu: tupianList
    })
  },

  //上传详情
  xiangqTu(){
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res){
        console.log(res)
        const tempFilePaths = res.tempFilePaths[0]
        if (res.tempFiles[0].size > 1000000) {
          wx.showToast({
            title: '图片大于1M，请重新选择！',
            icon: 'none'
          })
          return
        } else {
          setTimeout(function () {
            wx.showLoading({
              title: '上传中',
            })
          }, 0)
          wx.request({
            url: app.globalData.myurl,
            method:'POST',
            data:{
              cmd: "uploadImg",
              imgFile: wx.getFileSystemManager().readFileSync(tempFilePaths, "base64"),
            },
            header:{
              "content-type": "application/x-www-form-urlencoded",
              "token": wx.getStorageSync('token')
            },
            success(res){
              _this.setData({
                xiangQingimg: res.data.imgUrl
              })
              setTimeout(function () {
                wx.hideLoading()
              }, 0)
              setTimeout(function () {
                wx.showToast({
                  title: res.data.resultNote,
                  icon: 'none',
                  duration: 1500
                })
              }, 0)
            }
          })
        }
      }
    })


  },



  //选择照片
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        $digest(this)
      }
    })
  },

  // 跳转添加页面
  toAdd() {
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '/baoA/pages/goodsCanadd/goodsCanadd?index=5&guigelist=' + JSON.stringify(this.data.guigelist)
    })
    wx.hideLoading()
  },
  // 头部切换
  changeIndex(e) {
    let _this = this
    console.log(e.currentTarget.dataset.index)
    _this.setData({
      headIndex: e.currentTarget.dataset.index
    })
  },
  // 商品名称
  goodsVal(e) {
    console.log(e)
    this.setData({
      goodsValName: e.detail.value
    })
  },

  //上传普通零售
  tiJiaoInfo() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      method: 'POST',
      data: {
        cmd: "addCsGood",

        goodsCheckImgUrl: "", //商品外观图URL
        goodsUnitNo: "", //商品销售计量单位编号
        goodsImgUrl: ["", ""], //商品图片-多张轮播 URL
        shopId: "", //店铺Id
        userId: "", //用户Id
        goodsId: "", //商品ID（非必填）
        url: "", //商品描述url
        deadline: '', //取货截止时间					
        goodsName: "", //商品名称
        shopGoodTypeId: "", //店内商品分类  
        pfgtypeid2Id: "", //商品二级分类   
        dedustate: "", //是否参与积分换购 0 不参与积分; 1 参与积分; 2发起拼团
        deduratio: "", //允许积分换购的比例  0.01
        pnum: '', //拼团人数     （2发起拼团）

        actime: '', //拼团活动时间    （2发起拼团）
        skunameid: "", //规格名称Id  
        goodSkuList: [{
          goodSkunameid: "", //规格名称Id   
          goodSkuvalue1: "", //规格值1
          goodSkuvalue2: "", //规格值2
          goodSkunum: "", //对应规格的库存
          curprice: "", //对应规格的商品现价
          limitprice: '', //拼团优惠价格
          goodSkuimgFile: "", //对应规格的图片文件
        }]
      },
      success(res){
        console.log(res,8888888888888)
        _this.setData({
          
        })
        wx.hideLoading()
      }
    })

  },







  // 时间
  // close_dingdanTime() {
  //   let _this = this
  //   _this.setData({
  //     showAnceng: false, //暗层
  //     goodsModalone: false, //商品开始时间年月日弹窗
  //     goodsModaltwo: false, //商品开始时间时分秒弹窗
  //   })
  // },
  // //关闭弹窗
  // close_dingdanTime1: function () {
  //   this.setData({
  //     shopfenlModal: false, //店铺分类
  //     showAnceng1: false, //暗层的显示
  //     yijiModel: false,
  //     erjiModel: false,
  //     danweiModel: false,
  //     addshopfenlModal: false
  //   })
  // },
  


  // // 日期切换
  // riqiChange: function (e) {
  //   let _this = this
  //   const val = e.detail.value
  //   if (_this.data.startorend) {
  //     this.setData({
  //       year: this.data.years[val[0]],
  //       month: this.data.months[val[1]],
  //       day: this.data.days[val[2]]
  //     })
  //   } else {
  //     this.setData({
  //       year1: this.data.years[val[0]],
  //       month1: this.data.months[val[1]],
  //       day1: this.data.days[val[2]]
  //     })
  //   }

  // },
  // // 时间切换
  // shijianChange: function (e) {
  //   const val = e.detail.value
  //   let _this = this
  //   if (_this.data.startorend) {
  //     this.setData({
  //       hour: this.data.hours[val[0]],
  //       minute: this.data.minutes[val[1]],
  //       // second: this.data.seconds[val[2]]
  //     })
  //   } else {
  //     this.setData({
  //       hour1: this.data.hours[val[0]],
  //       minute1: this.data.minutes[val[1]],
  //       // second1: this.data.seconds[val[2]]
  //     })
  //   }

  // },
  // // 统计开始时间
  // tongJiStart(e) {
  //   let _this = this
  //   let dates = new Date()
  //   _this.setData({
  //     year: dates.getFullYear(),
  //     year1: dates.getFullYear(),
  //     month: dates.getMonth() + 1,
  //     month1: dates.getMonth() + 1,
  //     day: dates.getDate(),
  //     day1: dates.getDate(),
  //     hour: dates.getHours(),
  //     hour1: dates.getHours(),
  //     minute: dates.getMinutes(),
  //     minute1: dates.getMinutes(),
  //     second: '',
  //     second1: '',
  //     valueRiqi: [dates.getFullYear() - 1990, dates.getMonth(), dates.getDate() - 1],
  //     valueShijian: [dates.getHours(), dates.getMinutes(), dates.getSeconds()],
  //   })
  //   console.log(e.currentTarget.dataset.startorend)
  //   let startorend
  //   let valueRiqi, valueShijian
  //   if (e.currentTarget.dataset.startorend == 1) {
  //     startorend = true
  //     valueRiqi = [(_this.data.year - 1990), _this.data.month - 1, _this.data.day - 1]
  //     valueShijian = [_this.data.hour, _this.data.minute, _this.data.second]
  //   } else {
  //     startorend = false
  //     valueRiqi = [(_this.data.year1 - 1990), _this.data.month1 - 1, _this.data.day1 - 1]
  //     valueShijian = [_this.data.hour1, _this.data.minute1, _this.data.second1]
  //   }
  //   this.setData({
  //     goodsModalone: true,
  //     showAnceng: true,
  //     startorend: startorend,
  //     valueRiqi: valueRiqi,
  //     valueShijian: valueShijian,
  //     // year: e.currentTarget.dataset.year * 1,
  //     // month: e.currentTarget.dataset.month * 1,
  //   })
  // },
  // // 统计下一步时间
  // xiayiBu: function () {
  //   console.log('开始')
  //   let _this = this
  //   let times = {}
  //   if (_this.data.startorend) {
  //     times.year = _this.data.year
  //     if (_this.data.month * 1 < 10) {
  //       times.month = '0' + _this.data.month
  //     } else {
  //       times.month = _this.data.month
  //     }
  //     if (_this.data.day * 1 < 10) {
  //       times.day = '0' + _this.data.day
  //     } else {
  //       times.day = _this.data.day
  //     }
  //   } else {
  //     times.year = _this.data.year1
  //     if (_this.data.month1 * 1 < 10) {
  //       times.month = '0' + _this.data.month1
  //     } else {
  //       times.month = _this.data.month1
  //     }
  //     if (_this.data.day1 * 1 < 10) {
  //       times.day = '0' + _this.data.day1
  //     } else {
  //       times.day = _this.data.day1
  //     }
  //   }
  //   this.setData({
  //     goodsModalone: false,
  //     goodsModaltwo: true,
  //     zanshistartTime: times
  //   })
  // },
  // // 统计确定时间
  // quedingEnd: function () {
  //   let _this = this
  //   let times = _this.data.zanshistartTime
  //   if (_this.data.startorend) {
  //     if (_this.data.hour * 1 < 10) {
  //       times.hour = '0' + _this.data.hour
  //     } else {
  //       times.hour = _this.data.hour
  //     }
  //     if (_this.data.minute * 1 < 10) {
  //       times.minute = '0' + _this.data.minute
  //     } else {
  //       times.minute = _this.data.minute
  //     }
  //     // if (_this.data.second * 1 < 10) {
  //     //   times.second = '0' + _this.data.second
  //     // } else {
  //     //   times.second = _this.data.second
  //     // }
  //   } else {
  //     if (_this.data.hour1 * 1 < 10) {
  //       times.hour = '0' + _this.data.hour1
  //     } else {
  //       times.hour = _this.data.hour1
  //     }
  //     if (_this.data.minute1 * 1 < 10) {
  //       times.minute = '0' + _this.data.minute1
  //     } else {
  //       times.minute = _this.data.minute1
  //     }
  //     // if (_this.data.second1 * 1 < 10) {
  //     //   times.second = '0' + _this.data.second1
  //     // } else {
  //     //   times.second = _this.data.second1
  //     // }
  //   }

  //   let timestr = times.year + '-' + times.month + '-' + times.day + ' ' + times.hour + ':' + times.minute + ':00'
  //   if (_this.data.startorend) {
  //     this.setData({
  //       showAnceng: false,
  //       goodsModaltwo: false,
  //       goodsstartTimes: times,
  //       startTimestr: timestr
  //     })
  //   } else {
  //     this.setData({
  //       showAnceng: false,
  //       goodsModaltwo: false,
  //       goodssendTimes: times,
  //       endTimestr: timestr
  //     })
  //   }
  // },
 
 

 






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let _this = this
    if (options.goodsId) {
      _this.setData({
        goodsId: options.goodsId
      })
    }else{
      _this.setData({
        goodsId: options.goodsId,
        goodsZhutu:JSON.parse(options.lunboimg),
        xiangQingimg:options.xqimg
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
    let _this = this
    let goodsZhutu = _this.data.goodsZhutu
    console.log(goodsZhutu)
    if (_this.data.imglistobg) {
      goodsZhutu.push(_this.data.imglistobg)
    }
    _this.setData({
      goodsZhutu: goodsZhutu
    })
    _this.getdanwei()
    _this.getshoptypelist()
    _this.getgoodstypelist()
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