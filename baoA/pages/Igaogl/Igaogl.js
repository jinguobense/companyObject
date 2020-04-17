// baoA/pages/Igaogl/Igaogl.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[]
  },
  //to设置广告
  toadd(e){
    var _this = this
    var type = e.currentTarget.dataset.type
    var imgId = e.currentTarget.dataset.imgId
    wx.navigateTo({
      url: "../Igaogadd/Igaogdd?type=" + type + '&imgid=' + imgId
    })
  
  },
  //获取广告数据
  getInfo(){
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      method:'POST',
      data:{
        cmd:"getShopImg",
	      shopId:wx.getStorageSync('shopId')             //店铺编号
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync('token')
      },
      success(res){
        console.log(res)
        _this.setData({
          shopList:res.data.shopList
        })
        
        wx.hideLoading()
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
    this. getInfo()
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