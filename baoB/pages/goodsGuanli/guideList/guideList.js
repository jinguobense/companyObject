// pages/mine/guideList/guideList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		guideList:[
			{
				type:'title',
				imgUrl:'/baoB/images/icon/dpu.png',
				text:'店铺管理'
			},
			{
				type:'content',
				imgUrl:'/baoB/images/icon/right.png',
				text:'1. 店铺信息设置'
			},
			{
				type:'content',
				imgUrl:'/baoB/images/icon/right.png',
				text:'2. 店铺广告设置'
			},
			{
				type:'content',
				imgUrl:'/baoB/images/icon/right.png',
				text:'3. 推荐好店设置'
			},
			{
				type:'content',
				imgUrl:'/baoB/images/icon/right.png',
				text:'4. 店铺配送设置'
			},
			{
				type:'title',
				imgUrl:'/baoB/images/icon/goods.png',
				text:'商品管理'
			},
			{
				type:'content',
				imgUrl:'/baoB/images/icon/right.png',
				text:'5. 商品发布管理'
			},
			{
				type:'content',
				imgUrl:'/baoB/images/icon/right.png',
				text:'6. 图库上架商品'
			},
			{
				type:'title',
				imgUrl:'/baoB/images/icon/dingdan.png',
				text:'订单管理'
			}, 
			{
				type:'content',
				imgUrl:'/baoB/images/icon/right.png',
				text:'7. 首页扫码取货'
			},
			{
				type:'content',
				imgUrl:'/baoB/images/icon/right.png',
				text:'8. 订单列表查看及操作'
			},
			{
				type:'title',
				imgUrl:'/baoB/images/icon/caiwu.png',
				text:'财务管理'
			},
			{
				type:'content',
				imgUrl:'/baoB/images/icon/right.png',
				text:'9. 收益明细'
			},
			{
				type:'content',
				imgUrl:'/baoB/images/icon/right.png',
				text:'10. 提现申请及提现记录'
			},
			{
				type:'content',
				imgUrl:'/baoB/images/icon/right.png',
				text:'11. 销售报表'
			},
		]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
	// 跳转指导详情
	goGuide:function(e){
		console.log(e.currentTarget.dataset.index);
		let index=e.currentTarget.dataset.index;
		wx.navigateTo({
			url:"../guide/guide?index="+index
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