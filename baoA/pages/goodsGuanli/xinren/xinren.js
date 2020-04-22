const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    rightlist: '',
    page: 1,
    totalPage: '',
  },
  
  toGooodsinfo(e) {
    wx.navigateTo({
      url: '/baoA/pages/goodsGuanli/putongGoods/putongGoods?type=3' + '&goodsid=' + e.currentTarget.dataset.goodsid
    })
  },
  changesL(e) {
    console.log(e.currentTarget.dataset.typeid)
    this.setData({
      leftindex: e.currentTarget.dataset.index,
      typeId: e.currentTarget.dataset.typeid,
      page: 1,
    })
    this.getgoodsListdata()

  },
 
  //获取商品数据
  getgoodsListdata() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      data: {
        cmd: "comNewcomersList",
        nowPage: _this.data.page,
        shopId: wx.getStorageSync('shopId'), //进入首页获取的店铺id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log(res, 333333333)
        if (_this.data.page == 1) {
          _this.setData({
            rightlist: res.data.goodsList,
            totalPage: res.data.totalPage
          })
        } else {
          var rightlist = _this.data.rightlist;
          for (var i in res.data.goodsList) {
            rightlist.push(res.data.goodsList[i])
          }
          _this.setData({
            rightlist: rightlist,
            totalPage: res.data.totalPage,
          })
        }
        wx.hideLoading();

      }



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
    this.getgoodsListdata()
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
    var _this = this
    console.log(111)
    console.log(this.data.page)
    if(this.data.page >= this.data.totalPage){
      wx.showToast({
        title: '已经到底啦',
        icon:'none',
        duration:1000
      })
      return false;
    }else{
      wx.showLoading({
        title: '加载中',
      })
      this.data.page = this.data.page+1
      setTimeout(function(){
        _this.getgoodsListdata()
      },0)
      setTimeout(function(){
        wx.hideLoading()
      },500)
      
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})