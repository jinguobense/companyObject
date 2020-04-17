const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    tel:''
  },
  getshopInfo(){
    var _this = this
    _this.setData({
      userName:wx.getStorageSync('userName'),
      tel:wx.getStorageSync('phone')
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getshopInfo()
  },
	// 跳转重置密码
	goReset:function(e){
    var _this = this
		console.log(e.currentTarget.dataset.type);
		let type=e.currentTarget.dataset.type;   //1.重置交易密码  2.重置登录密码
		wx.navigateTo({
			url:'/baoA/pages/mine/reset/reset?type='+type + "&tel=" + _this.data.tel + '&userName=' + _this.data.userName
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