const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenleiIndex:"",
    page:1,
    list:''
  },

  // 跳转到添加活动
  toactiveAdd(){
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '../setactiveAdd/setactiveAdd?fenleiIndex=' + this.data.fenleiIndex ,
    })
    wx.hideLoading()
  },
  //跳转修改
  toactiveXiu(){
    if(this.data.fenleiIndex == 0){
      wx.navigateTo({
        url: '../setactiveXiu/setactiveXiu?fenleiIndex=' + 0 ,
      })
    }else{
      wx.navigateTo({
        url: '../setactiveXiu/setactiveXiu?fenleiIndex=' + 1  ,
      })
    }
  },
  //获取优惠券列表
  getList(){
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      data:{
        cmd:"goodCouponList",
        shopId:wx.getStorageSync('shopId')  ,           //进入首页获取的店铺id
        state:'',                //0 可用 1 停用 不传输此字段获取所有优惠券
        nowPage:_this.data.page,             //当前页数
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync('token')
      },
      success(res){
        console.log(res)
        _this.setData({
          list:res.data.freeCouponList
        })
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.index
    console.log(index)
    this.setData({
      fenleiIndex:index
    })
    if(index == 0){
      wx.setNavigationBarTitle({title:'满减活动设置'})
    }else{
      wx.setNavigationBarTitle({title:'优惠券设置'})
    }
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
    this.getList()
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