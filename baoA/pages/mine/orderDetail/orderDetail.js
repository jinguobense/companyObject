const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'', ////订单状态（0-待付款 1-拼团中 2-待取货 3-待发货 4-待收货 5-已完成 6-已退款）
    orderno:'',
    id:'' ,
    obj:''
  },
  //获取订单详情
  getOrderDetail(){
    var _this = this
    wx.request({
      url:app.globalData.myurl,
      data:{
        cmd:"getOrderDetails",
        shopId:wx.getStorageSync('shopId') ,             //店铺id
        userId:wx.getStorageSync('userId') ,             //管理员编号
        id:_this.data.id   ,               //订单id
        orderno: _this.data.orderno
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res.data)
        _this.setData({
          obj:res.data.orderBean,
          type:res.data.orderBean.state,
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options);
		this.setData({
      type:options.type,
      orderno:options.orderno,
      id:options.id
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
    this.getOrderDetail()
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