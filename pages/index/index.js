
const app = getApp()
Page({

  data: {
    result: '',
    homeObj:''
  },
  // 扫码
  getScancode: function() {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        console.log(res.result)
        _this.setData({
          result: result,

        })
      }
    })
 
  },
  
  // to收益
  toshouyi() {
    wx.showLoading({
      title: "加载中",
    })
    wx.navigateTo({
      url: '../../baoA/pages/Ishouyi/Ishouyi',
    })
    wx.hideLoading()
  },
  //to账户余额提现
  totixian() {
    wx.showLoading({
      title: "加载中",
    })
    wx.navigateTo({
      url: '../../baoA/pages/Iyue/Iyue',
    })
    wx.hideLoading()
  },
  //to图库
  totuku(){
    wx.showLoading({
      title: "加载中",
    })
    wx.navigateTo({
      url: '../../baoA/pages/Ituku/Ituku',
    })
    wx.hideLoading()
  },
  //to推荐好店
  totuijshop(){
    wx.showLoading({
      title: "加载中",
    })
    wx.navigateTo({
      url: '../../baoA/pages/Ituijshop/Ituijshop',
    })
    wx.hideLoading()
  },
  toputong(){
    wx.showLoading({
      title: "加载中",
    })
    wx.navigateTo({
      url: '../../baoA/pages/goodsGuanli/putong/putong',
    })
    wx.hideLoading()
  },

  //获取首页数据
  getHomedata(){
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      method:'post',
      data:{
        cmd:"homePageData",
        userId:wx.getStorageSync('userId') ,
        //shopId:wx.getStorageSync('shopId') 
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res){
        console.log(res)
        var homeData = res.data
        _this.setData({
          homeObj:res.data
        })
        wx.setStorageSync('homeData', homeData)
        wx.hideLoading()
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomedata()
    

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
    this.getHomedata()
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