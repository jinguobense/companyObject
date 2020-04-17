// baoA/pages/Isuxingadd/Isuxingadd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodel: 1, //0隐藏 1 显示
    showindex: 0, //0显示 1不显示
    value: "",
    shuXname:'',
    num:''
  },
  openmodel() {
    var _this = this;
    if (this.data.showmodel == 0) {
      _this.setData({
        showmodel: 1
      })
    } else {
      _this.setData({
        showmodel: 0
      })
    }
    console.log(this.data.showmodel)
  },
  // 选择显示
  xuanze(e) {
    var _this = this
    var show = e.currentTarget.dataset.show
    console.log(e)
    _this.setData({
      showindex: show
    })
    if (this.data.showindex == 0) {
      _this.setData({
        value: "显示",
      })
      this.openmodel()

    } else {
      _this.setData({
        value: "不显示",
      })
      this.openmodel()
    }
  },
  shuXname(e){
    var shuXname = e.detail.value
    this.setData({
      shuXname:shuXname
    })
  },
  //监听序号
  inputNum(e){
    var num = e.detail.value
    this.setData({
      num:num
    })
  },
  //属性操作
  getshuXing() {
    var _this = this
    wx.showLoading({
      title: '操作中',
    })
    wx.request({
      url: app.globalData.myurl,
      method: 'POST',
      data: {
        cmd: "upGoodsTypes",
        shopId: wx.getStorageSync('shopId'), //店铺编号
        name: _this.data.shuXname, // 分类名称
        seq: _this.data.num, // 序号
        state: _this.data.showindex, // 状态（0显示、1不显示）
        type: 1, // 1-新增；2-修改；3-删除
        id: '' //属性id（只有新增数据时不需要）
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync('token')
      },
      success(res){
        console.log(res,666666666666)
        
        wx.showToast({
          title: res.data.resultNote,
          icon:'none',
          duration:1500
        })
        var pages = getCurrentPages(); //当前页面
        var beforePage = pages[pages.length - 2]; //前一页
        wx.navigateBack({
          success: function () {
            beforePage.onLoad(); // 执行前一个页面的onLoad方法
          }
        });
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