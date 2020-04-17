// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl2:'', //头像
    shopBean:'',
    userinfo:"",
    shopState:"", //店铺状态
  },
  //获取店铺信息
  getShopInfo(){
   
    let _this = this
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"getShop",
        shopId:wx.getStorageSync('shopId') ,           //根据店铺id，获取时提供返回值
        userId: wx.getStorageSync('userId'),
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        console.log(res.data.shopBean.smallLogoUrl)
        var imgurl = res.data.shopBean.smallLogoUrl
        _this.setData({
          userinfo:res.data,
          shopBean:res.data.shopBean,
          shopState:res.data.shopBean.shopState,
          imgUrl2:imgurl
        })
        if(res.data.result == 1){
          return
        }else{
          wx.setStorageSync("shopPhone", _this.data.shopBean.denglphone);
          wx.setStorageSync("balance", _this.data.shopBean.balance);
          wx.setStorageSync("shopInfo", _this.data.shopBean);
        }
        


      }
    })
  },
  tomydd(e){
    var index = e.currentTarget.dataset.index;
   
    if(index){
      wx.navigateTo({
        url:'/baoA/pages/mine/order/order?index='+index
      })
    }else{
      wx.navigateTo({
        url: '/baoA/pages/mine/order/order',
      })
    }
    // wx.hideLoading()
  },
	// 跳转店铺信息
	goStore:function(){
		console.log(12345);
		wx.navigateTo({
      url:'/baoA/pages/mine/storeInfo/storeInfo'
		})
  },
  //跳转设置
  toSetting(){
    wx.navigateTo({
      url:'/baoA/pages/mine/setting/setting'
		})
  },
  //跳转提现
  totixian(){
    wx.navigateTo({
      url:'/baoA/pages/Iyue/Iyue'
		})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopInfo()
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
    this.getShopInfo()
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