// baoA/pages/goodsGuanli/putong/putong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0
  },
  changes(e){
    this.setData({
      index: e.currentTarget.dataset.index
    })
  },
  toGooodsinfo(e){
    wx.navigateTo({
      url:'/baoA/pages/goodsGuanli/xinrenGoods/xinrenGoods?tabindex='+e.currentTarget.dataset.type
    })
},
  // 跳转发布页面
  fabugoods() {
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '/baoA/pages/goodsFabu/xinrenFabu/xinrenFabu'
    })
    wx.hideLoading()
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