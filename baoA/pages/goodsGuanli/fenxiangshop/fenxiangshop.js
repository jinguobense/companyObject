// baoA/pages/goodsGuanli/fenxiangshop/fenxiangshop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
   imgUrl:'',
  },
  //获取二维码
  getImg(){
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      method:'post',
      data:{
        cmd:"getShopQR",
        userId:wx.getStorageSync('userId'),   //普通用户ID 
        shopId:wx.getStorageSync('shopId'), //店铺ID    
      },
      success(res){
        console.log(res)
        if(res.data.result == 0 ){
          _this.setData({
            imgUrl:res.data.img
          })
          setTimeout(function(){
            wx.showToast({
              title: res.data.resultNote,
              icon:'none',
              duration:1500
            })
          },1500)
        }else{
          setTimeout(function(){
            wx.showToast({
              title: res.data.resultNote,
              icon:'none',
              duration:1500
            })
          },1500)
        }
      }
    })

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
    this.getImg()
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