// pages/mine/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		index:0,
		storeInfoImg:['/baoB/images/icon/1-1.png','/baoB/images/icon/1-2.png'],
		storeAdvImg:['/baoB/images/icon/2-1.png','/baoB/images/icon/2-2.png'],
		storeRecImg:['/baoB/images/icon/3-1.png','/baoB/images/icon/3-2.png'],
		storeDisImg:['/baoB/images/icon/4.png'],
		shopPubImg:['/baoB/images/icon/5-1.png','/baoB/images/icon/5-2.png','/baoB/images/icon/5-3.png'],
		shopPutImg:['/baoB/images/icon/6-1.png','/baoB/images/icon/6-2.png','/baoB/images/icon/6-3.png','/baoB/images/icon/6-4.png'],
		orderScanImg:['/baoB/images/icon/7-1.png','/baoB/images/icon/7-2.png','/baoB/images/icon/7-3.png'],
		orderListImg:['/baoB/images/icon/8.png'],
		earningsImg:['/baoB/images/icon/9-1.png','/baoB/images/icon/9-2.png'],
		withdrawImg:['/baoB/images/icon/10-1.png','/baoB/images/icon/10-2.png'],
		withdrawRecordImg:['/baoB/images/icon/10-3.png','/baoB/images/icon/10-4.png'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options);
		let index=options.index
		this.setData({
			index:index
		})
		if(index==1){
			wx.setNavigationBarTitle({title:'店铺信息设置'})
		}
		if(index==2){
			wx.setNavigationBarTitle({title:'店铺广告设置'})
		}
		if(index==3){
			wx.setNavigationBarTitle({title:'推荐好店设置'})
		}
		if(index==4){
			wx.setNavigationBarTitle({title:'店铺配送设置'})
		}
		if(index==6){
			wx.setNavigationBarTitle({title:'商品发布管理'})
		}
		if(index==7){
			wx.setNavigationBarTitle({title:'图库上架商品'})
		}
		if(index==9){
			wx.setNavigationBarTitle({title:'首页扫码取货'})
		}
		if(index==10){
			wx.setNavigationBarTitle({title:'订单列表管理'})
		}
		if(index==12){
			wx.setNavigationBarTitle({title:'收益明细'})
		}
		if(index==13){
			wx.setNavigationBarTitle({title:'提现申请及提现记录'})
		}
		if(index==14){
			wx.setNavigationBarTitle({title:'销售报表'})
		}
  },
	// 图片预览
	imgPreview:function(e){
		let imgList=[];
		let type=e.currentTarget.dataset.type;
		let imgUrl=e.currentTarget.dataset.imgurl;
		console.log(imgUrl)
		console.log(e);
		if(type==1){
			imgList=this.data.storeInfoImg;
		}
		wx.previewImage({
			 current:imgUrl, // 当前显示图片的http链接
			  urls: imgList ,// 需要预览的图片http链接列表
				success:(res)=>{
					console.log("成功");
					console.log(res);
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