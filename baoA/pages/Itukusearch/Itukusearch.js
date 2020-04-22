// baoA/pages/Itukusearch/Itukusearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsname:'',
    list:'',
    zanshiname:''
  },
  //获取输入的名称
  goodsname(e){
    var _this = this
    _this.setData({
      goodsname:e.detail.value,
    })
   
  },
  toSearch(){
    var _this = this
    console.log(_this.data.goodsname)
    if(_this.data.goodsname == ''){
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if(!wx.getStorageSync('lishiList')){
      var arr = []
      arr.push(_this.data.goodsname)
      wx.setStorageSync('lishiList', arr);
    }else{
      var arr = wx.getStorageSync('lishiList');
      var type = false
      for(var i in arr){
        type = true
      }
      if(type == false){
        arr.push(_this.data.goodsname)
      }
      wx.setStorageSync('lishiList', arr)
    }
    wx.navigateTo({
      url: '../Itukulist/Itukulist?name=' + _this.data.goodsname,
    })
  },

  //点击历史
  lishisearch(e){
    var _this = this
    var index = e.currentTarget.dataset.index
    var list = _this.data.list
    wx.navigateTo({
      url: '../Itukulist/Itukulist?name=' + list[index],
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