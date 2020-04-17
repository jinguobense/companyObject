// pages/mine/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		isShow:false,
		modelText:"",
		modelType:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
	// 跳转账户管理
	goAccount:function(){
		wx.navigateTo({
			url:'/baoA/pages/mine/account/account'
		})
	},
	// 退出登录
	showModel:function(e){
		let type=e.currentTarget.dataset.type;
		if(type==1){
			this.setData({
				modelText:"确定要清除缓存吗？"
			})
		}else if(type==2){
			this.setData({
				modelText:"确定要退出登录吗？"
			})
		}
		console.log(e.currentTarget.dataset.type);
		this.setData({
			isShow:true,
			modelType:type
		})
	},
	
	// 取消
	cancel:function(){
		this.setData({
			isShow:false
		})
	},
	// 确定
	sure:function(){
		this.setData({
			isShow:false
    })
    let that = this
    wx.clearStorageSync()
    wx.redirectTo({
      url: '/pages/login/login',
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