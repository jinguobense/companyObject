// baoA/pages/Ituku/Ituku.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabindex:0,
    typeList:'' ,//分类内容
    typeId:'',
    name:'',
    typeList2:'' //右边内容显示
  },
  //切换
  changes(e){
    var _this = this
    var index =e.currentTarget.dataset.current;
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    var typeList2 = e.currentTarget.dataset.typelist2
    console.log(e)
    console.log(typeList2)
    _this.setData({
      tabindex:index,
      typeId:id,
      name:name,
      typeList2:typeList2
    })
    
  },
  //跳转到搜索页面
  tosearch(){
    wx.navigateTo({
      url: '../Itukusearch/Itukusearch',
    })
  },
  //跳转到图库列表
  totukulist(e){
    var parentid = e.currentTarget.dataset.prid;
    var goodsid = e.currentTarget.dataset.goodsid
    var name = e.currentTarget.dataset.name
    
    wx.navigateTo({
      url: '/baoA/pages/Itukulist/Itukulist?goodsid='  + goodsid +"&typeid=" + parentid,
    })
   
  },
  //获取图库分类
  getlistInfo(){
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      data:{
        cmd:"getGoodsMapType",
	      shopId:wx.getStorageSync('shopId') //店铺ID
      },
      header:{
        "content-type": "application/x-www-form-urlencoded",
      },
    success(res){
      console.log(res.data)
      _this.setData({
        typeList:res.data.typeLists,
        typeList2:res.data.typeLists[0].typeList2
      })
      wx.hideLoading()
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
    this. getlistInfo()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    this.changes()
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