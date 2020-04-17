// baoA/pages/Ishuxinggl/Ishuxinggl.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  toadd(){
    wx.showLoading({
      title: "加载中",
    })
    wx.navigateTo({
      url: '../Isuxingadd/Isuxingadd',
    })
    wx.hideLoading()
  },
  //获取属性列表
  getlist(){
    var _this= this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      method:"POST",
      data:{
        cmd:"getGoodsTypes",
	      shopId:wx.getStorageSync('shopId')             //店铺编号
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync('token')
      },
      success(res){
        console.log(res)
        _this.setData({
          list:res.data.goodsTypes
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
    this.getlist()
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