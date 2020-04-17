// baoA/pages/ItukulistXq/ItukulistXq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tjboxtype:false,   //下面box是否固定
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 监听页面滑动
  onPageScroll: function (e) {
    var _this = this;
    const query = wx.createSelectorQuery().in(this)
    query.selectAll('#tuijiancon').boundingClientRect()
    query.exec(function (ress) {
      console.log(ress[0])
      if (ress[0][0].top > 100) {
        _this.setData({
          tjboxtype: false,
          // uptype: true,
        })
      }else{
        _this.setData({
          tjboxtype: true,
          // uptype: true,
        })
      }
      
    })
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