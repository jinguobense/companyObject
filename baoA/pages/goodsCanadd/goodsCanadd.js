// baoA/pages/add/add.js
const app = getApp();
Page({

  /**good
   * 页面的初始数据
   */
  data: {
    fenleiIndex:0,
    imgURL: '',//规格封面图
    guigelist:[],
    guigeName:'',//规格名称
    kucunNum: '',// 库存数量
    yuanjiaprice:'',//原价
    huodongprice: '',//活动价
    dijiaprice:'',//底价
    danjiaprice: '',// 单价
    lingshouprice: '',//零售价
    pintuanprice:'', //拼团价
    listitem:'',//修改的下标
    goodSkunameid:'',//修改的规格ID

  },
  // 获得规格值
  getguigeN(e){
    let that = this
    that.setData({
      guigeName: e.detail.value
    })
  },
  // 获得库存
  kucunN(e) {
    let that = this
    that.setData({
      kucunNum: e.detail.value
    })
  },
  // 单价
  danjiaP(e) {
    let that = this
    that.setData({
      danjiaprice: e.detail.value
    })
  },
  danjiaShijiao(e) {
    let that = this
    let values = e.detail.value
    if (values.indexOf('.') != -1) {
      values = (values * 1).toFixed(2)
    }
    if (values == 'NaN') {
      wx.showToast({
        title: '请输入正确的单价',
        icon: 'none'
      })
      values = ''
    }
    that.setData({
      danjiaprice: Number(values)
    })
  },
  //底价
  dijiaP(e) {
    let that = this
    that.setData({
      dijiaprice: e.detail.value
    })
  },
  dijiaShijiao(e) {
    let that = this
    let values = e.detail.value
    if (values.indexOf('.') != -1) {
      values = (values * 1).toFixed(2)
    }
    if (values == 'NaN') {
      wx.showToast({
        title: '请输入正确的底价',
        icon: 'none'
      })
      values = ''
    }
    that.setData({
      dijiaprice: values
    })
  },
  //零售价
  lingshouP(e) {
    let that = this
    that.setData({
      lingshouprice: e.detail.value
    })
  },
  lingshouShijiao(e) {
    let that = this
    let values = e.detail.value
    if (values.indexOf('.') != -1) {
      values = (values * 1).toFixed(2)
    }
    if (values == 'NaN') {
      wx.showToast({
        title: '请输入正确的零售价',
        icon: 'none'
      })
      values = ''
    }
    that.setData({
      lingshouprice: values
    })
  },
  // 原价
  yuanjiaP(e) {
    let that = this
    that.setData({
      yuanjiaprice: e.detail.value
    })
  },
  yuanjiaShijiao(e) {
    let that = this
    let values = e.detail.value
    if (values.indexOf('.') != -1) {
      values = (values * 1).toFixed(2)
    }
    if (values == 'NaN') {
      wx.showToast({
        title: '请输入正确的原价',
        icon: 'none'
      })
      values = ''
    }
    that.setData({
      yuanjiaprice: values
    })
  },
  // 活动价
  huodongP(e) {
    let that = this
    that.setData({
      huodongprice: e.detail.value
    })
  },
  huodongShijiao(e) {
    let that = this
    let values = e.detail.value
    if (values.indexOf('.') != -1) {
      values = (values * 1).toFixed(2)
    }
    if (values == 'NaN') {
      wx.showToast({
        title: '请输入正确的活动价',
        icon: 'none'
      })
      values = ''
    }
    that.setData({
      huodongprice: values
    })
  },
  //拼团价
  pintuanP(e){
    let that = this
    that.setData({
      pintuanprice: e.detail.value
    })
  },
  pintuanShijiao(e){
    let that = this
    let values = e.detail.value
    if (values.indexOf('.') != -1) {
      values = (values * 1).toFixed(2)
    }
    if (values == 'NaN') {
      wx.showToast({
        title: '请输入正确的活动价',
        icon: 'none'
      })
      values = ''
    }
    that.setData({
      pintuanprice: values
    })
  },
  // 点击确定添加
  quedingAdd(){
    let that = this
    let guigelist = that.data.guigelist
    let obj
    if(!that.data.guigeName){
      wx.showToast({
        title: '请输入规格名称',
        icon:'none'
      })
      return
    }
    if (!that.data.kucunNum) {
      wx.showToast({
        title: '请输入库存数量',
        icon: 'none'
      })
      return
    }
    if(that.data.fenleiIndex==0){ //普通
      obj = {
        goodSkuvalue1: that.data.guigeName,
        goodSkuimgFile: that.data.imgURL,
        goodSkunum: parseInt(that.data.kucunNum),
        curprice:that.data.danjiaprice
        
      }
    } else if (that.data.fenleiIndex == 1) { //拼团
      if (!that.data.yuanjiaprice) {
        wx.showToast({
          title: '请输入商品原价',
          icon: 'none'
        })
        return
      }
      if (!that.data.huodongprice) {
        wx.showToast({
          title: '请输入商品活动价',
          icon: 'none'
        })
        return
      }
      obj = {
        goodSkunameid: that.data.goodSkunameid,
        goodSkuvalue1: that.data.guigeName,
        goodSkuimgFile: that.data.imgURL,
        goodSkunum: parseInt(that.data.kucunNum),
        curprice: that.data.huodongprice,
        origprice: that.data.yuanjiaprice
      }
    } else if (that.data.fenleiIndex == 2) {
      if (!that.data.danjiaprice) {
        wx.showToast({
          title: '请输入商品单价',
          icon: 'none'
        })
        return
      }
      obj = {
        goodSkunameid: that.data.goodSkunameid,
        goodSkuvalue1: that.data.guigeName,
        goodSkuimgFile: that.data.imgURL,
        goodSkunum: parseInt(that.data.kucunNum),
        curprice: that.data.danjiaprice
      }
    } else if (that.data.fenleiIndex == 3) {
      if (!that.data.danjiaprice) {
        wx.showToast({
          title: '请输入商品单价',
          icon: 'none'
        })
        return
      }
     
      obj = {
        goodSkunameid: that.data.goodSkunameid,
        goodSkuvalue1: that.data.guigeName,
        goodSkuimgFile: that.data.imgURL,
        goodSkunum: parseInt(that.data.kucunNum),
        curprice: that.data.huodongprice,
        origprice: that.data.danjiaprice,
      }
    } else if (that.data.fenleiIndex == 4) {

    } else if (that.data.fenleiIndex == 5) {
      if (!that.data.dijiaprice) {
        wx.showToast({
          title: '请输入商品底价',
          icon: 'none'
        })
        return
      }
      if (!that.data.lingshouprice) {
        wx.showToast({
          title: '请输入商品零售价',
          icon: 'none'
        })
        return
      }
      obj = {
        goodSkunameid: that.data.goodSkunameid,
        goodSkuvalue1: that.data.guigeName,
        goodSkuimgFile: that.data.imgURL,
        goodSkunum: parseInt(that.data.kucunNum),
        curprice: that.data.lingshouprice,
        costprice: that.data.dijiaprice
      }
    }
    if (that.data.listitem){
      guigelist[that.data.listitem] = obj
    }else{
      guigelist.push(obj)
    }
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];     //获取上一个页面
    prevPage.setData({                                      //修改上一个页面的变量
      guigelist: guigelist
    })
    wx.navigateBack({
      delta: -1
    })
  },
  // 上传封面图
  upGoodsimg(){
    let that = this
    wx.navigateTo({
      url: '../goodsFabu/cropper/cropper',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    if (options.guigelist){
      that.setData({
        fenleiIndex: options.index,
        guigelist: JSON.parse(options.guigelist)
      })
    }else{
      that.setData({
        fenleiIndex: options.index
      })
    }
    if (options.listitem){
      if (that.data.fenleiIndex == 3){
        that.setData({
          listitem: options.listitem,
          guigeName: JSON.parse(options.guigelist)[options.listitem].goodSkuvalue1,
          kucunNum: JSON.parse(options.guigelist)[options.listitem].goodSkunum,
          imgURL: JSON.parse(options.guigelist)[options.listitem].goodSkuimgFile,
          goodSkunameid: JSON.parse(options.guigelist)[options.listitem].goodSkunameid,
          huodongprice: JSON.parse(options.guigelist)[options.listitem].curprice,
          danjiaprice: JSON.parse(options.guigelist)[options.listitem].origprice,
        })
      }else{
        that.setData({
          listitem: options.listitem,
          guigeName: JSON.parse(options.guigelist)[options.listitem].goodSkuvalue1,
          kucunNum: JSON.parse(options.guigelist)[options.listitem].goodSkunum,
          imgURL: JSON.parse(options.guigelist)[options.listitem].goodSkuimgFile,
          //goodSkunameid: JSON.parse(options.guigelist)[options.listitem].goodSkunameid,
          dijiaprice: JSON.parse(options.guigelist)[options.listitem].costprice,
          lingshouprice: JSON.parse(options.guigelist)[options.listitem].curprice,
          yuanjiaprice: JSON.parse(options.guigelist)[options.listitem].origprice,
          huodongprice: JSON.parse(options.guigelist)[options.listitem].curprice,
          danjiaprice: JSON.parse(options.guigelist)[options.listitem].curprice,
        })
      }

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