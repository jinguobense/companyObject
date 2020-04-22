const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0, // 0普通 1大众 2限时 3满减 4小众 5新人
    index: 0,
    psong: 0,
    goodsid: '',
    goodsInfo: '',
  },
  changes(e) {
    this.setData({
      index: e.currentTarget.dataset.index
    })
  },
  toxiuInfo() {
    wx.showLoading({
      title: "加载中",
    })
    wx.navigateTo({
      url: '/baoA/pages/goodsGuanli/canshuXiu/canshuXiu',
    })
    wx.hideLoading()
  },
  //获取普通商品详情
  getputong() {
    var _this = this
    wx.request({
      url: app.globalData.myurl,
      data: {
        cmd: "csGoodData",
        goodsId: _this.data.goodsid //商品id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log(res)
        if (res.data.result == 0) {
          _this.setData({
            goodsInfo: res.data
          })
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 0)
        } else {
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 0)
        }
        wx.hideLoading()
      }

    })
  },
  //限时商品详情
  getxianshi() {
    var _this = this
    wx.request({
      url: app.globalData.myurl,
      data: {
        cmd: "limitGoodData",
        goodsId: _this.data.goodsid //商品id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log(res)
        if (res.data.result == 0) {
          _this.setData({
            goodsInfo: res.data
          })
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 0)
        } else {
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 0)
        }

        wx.hideLoading()

      }

    })

  },
  //团购商品详情
  gettuan(){
    var _this = this
    wx.request({
      url: app.globalData.myurl,
      data:{
        cmd:"groGoodData",
	      goodsId:_this.data.goodsid             //商品id
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res)
        if (res.data.result == 0) {
          _this.setData({
            goodsInfo: res.data
          })
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 0)
        } else {
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 0)
        }
        wx.hideLoading()
      }
    })
  },
  //满减商品详情
  getmanjian(){
    var _this = this
    wx.request({
      url: app.globalData.myurl,
      data:{
        cmd:"fullRedGoodData",
	      goodsId:_this.data.goodsid             //商品id
      },
       header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res)
        if (res.data.result == 0) {
          _this.setData({
            goodsInfo: res.data
          })
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 0)
        } else {
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 0)
        }
        wx.hideLoading()
      }
    })
  },
  //新人专享详情
  getnew(){
    var _this = this
    wx.request({
      url: app.globalData.myurl,
      data:{
        cmd:"getNewcomersData",
	      goodsId:_this.data.goodsid             //商品id
      },
       header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res)
        if (res.data.result == 0) {
          _this.setData({
            goodsInfo: res.data
          })
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 0)
        } else {
          setTimeout(function () {
            wx.showToast({
              title: res.data.resultNote,
              icon: "none",
              duration: 1500
            })
          }, 0)
        }
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    console.log(options)
    if (options.type) {
      _this.setData({
        type: options.type,
        goodsid: options.goodsid
      })
    }
    if(options.type == 0){
      _this.getputong()
    }
    if(options.type == 1){
      _this.gettuan()
    }
    if(options.type == 2){
      _this.getxianshi()
    }
    if(options.type == 3){
      _this.getmanjian()
    }
    if(options.type == 4){
      _this.gettuan()
    }
    if(options.type == 5){
      _this.getnew()
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