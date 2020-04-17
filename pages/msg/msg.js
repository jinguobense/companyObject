const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1
  },
  tokefu(){
    wx.navigateTo({
      url: '/baoB/pages/msg/chat/chat'
    })
  },
  totongzhi(){
    wx.navigateTo({
      url: '/baoB/pages/msg/inform/inform'
    })
  },
  // getmsg(){
  //   var _this = this
  //   wx.request({
  //     url: app.globalData.myurl,
  //     data:{
  //       cmd:"notifyList",
  //       userId:wx.getStorageSync('userId') ,        //平台通知针对的是各级管理员，如店铺管理员，区域管理员等
	//       nowPage:_this.data.page          //当前页数
  //     },
  //     header:{
  //       "content-type": "application/x-www-form-urlencoded",
  //     },
  //     success(res){
  //       console.log(res)
  //     }
  //   })
  // },
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
    this.getmsg()
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