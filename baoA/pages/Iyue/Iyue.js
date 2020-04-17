// baoA/pages/Iyue/Iyue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0, //头部切换
    showhide: false, // 蒙版弹窗显示
    showdian: false, //黑点显示
    focus: false,
    value: ""
  },
  changes(e) {
    // console.log(e)
    let that = this
    let indexs = e.currentTarget.dataset.index
    that.setData({
      index: indexs
    })
  },
  //点击弹出密码
  tixian() {
    var _this = this
    _this.setData({
      showhide: true,
      focus: true
    })

  },
  //关闭弹窗
  showhideTap() {
    var _this = this
    _this.setData({
      showhide: false,
      value: ""
    })
  },
  //跳转账户
  touserzhanghu() {
    var tabIndex = this.data.index
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '/baoA/pages/Iyuezhanghu/Iyuezhanghu?index=' + tabIndex,
    })
    wx.hideLoading()
  },
  getvalue(e) {
    console.log(e)
    var _this = this
    var value = e.detail.value
    _this.setData({
      value: value
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