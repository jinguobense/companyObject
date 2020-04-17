// baoA/pages/Ipsonggl/Ipsonggl.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    psong:true,
    psType1:false, 
    psType2:true, 
    psState:'', //店铺配送状态（0-配送；1-不配送）（必填）

    dpType:false, 
    ptType:true , 
    pstype:'', //店铺配送方案（0-服务商配送，1-店铺自配送）（必填）
    
    value:'10'

  },
  //配送状态
  psbtn(e){
    console.log(e)
    var _this = this
    var dataType = e.currentTarget.dataset.type //0配送 1不配送
    if(dataType == 1){
      _this.setData({
        psType1:true,
        psType2:false,
        psState:dataType
      })

    }
    if(dataType == 0){
      _this.setData({
        psType2:true,
        psType1:false,
        psState:dataType
      })

    }

  },
  //配送方案
  psTypebtn(e){
    console.log(e)
    var _this = this
    var dataType = e.currentTarget.dataset.type //0配送 1不配送
    if(dataType == 1){
      _this.setData({
        dpType:true,
        ptType:false,
        pstype:dataType
      })

    }
    if(dataType == 0){
      _this.setData({
        ptType:true,
        dpType:false,
        pstype:dataType
      })

    }

  },
  //监听配送金额
  inpsPrice(e){
    var _this = this
    var price = e.detail.value
    if(price < 10){
      wx.showToast({
        title: "起送金额不能低于10元",
        icon:'none',
        duration:1500
      })
    }else{
      _this.setData({
        value:price
      })
    }
  },
  //配送管理
  sure(){
    var _this = this;
    wx.request({
      url: app.globalData.myurl,
      data:{
        cmd:"upShopDistance",
        shopId:wx.getStorageSync('shopId') ,            //店铺编号
        disstate:_this.data.psState,      //店铺配送状态（0-配送；1-不配送）（必填）
        distributions:_this.data.pstype,   //店铺配送方案（0-服务商配送，1-店铺自配送）（必填）
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res,66666666)
        wx.showToast({
          title: res.data.resultNote,
          icon:'none',
          duration:1500
        })
      }
    })
  },
  //获取配送信息
  getpsInfo(){
    wx.request({
      url: app.globalData.myurl,
      data:{
        cmd:"getShopDistance",
	      shopId:wx.getStorageSync('shopId')             //店铺编号
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getpsInfo()
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