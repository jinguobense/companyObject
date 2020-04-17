const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    page:1,
    maxpage:'',
  },

  //获取店内商品
  getgoodslist() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myurl,
      data: {
        cmd: "comGoodListData",
        nowPage: _this.data.page,
        shopId: wx.getStorageSync('shopId'), //进入首页获取的店铺id
        type: "", //商品种类标签 0普通零售商品 1零售团购商品 3零售满减商品 4零售限时商品 5零售商品发起拼团
        state: "", //0-审核中 1-已上架 2-已下架 3-审核未通过 4-已删除

        goodsTypeId: "", //店内商品分类id 不传默认全部
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success(res) {
        console.log(res,3333)
        if(_this.data.page == 1){
          _this.setData({
            goodsList:res.data.goodsList,
            maxpage:res.data.totalPage
          })
        }else{
          var goodsList =  _this.data.goodsList
          for (var i in res.data.goodsList) {
            goodsList.push(res.data.orderBeans[i])
          }
          _this.setData({
            goodsList:goodsList,
            maxpage:res.data.totalPage
          })
        }
        wx.hideLoading()
      }
    })
  },
  //点击选用商品
  xuanSure(e){
    var goodsid = e.currentTarget.dataset.goodsid
    var goodsname = e.currentTarget.dataset.goodsname
    var goodsimg =  e.currentTarget.dataset.goodsimg
    var obj={
      goodsName:goodsname,
      img:goodsimg,
    }
    var pages = getCurrentPages(); 
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];     //获取上一个页面
    prevPage.setData({                                      //修改上一个页面的变量
      goodsid: goodsid,
      obj:obj
    })
    wx.navigateBack({
      delta: -1
    })
    
  },
  /**
   * 生命周期函数--监听页面加载i
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
    this.getgoodslist()
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
    wx.showNavigationBarLoading();
    this.setData({
      page:1
    })
    _this.getgoodslist();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this;
    if (_this.data.goodsList.length != 0 ){
      if (_this.data.page == _this.data.maxpage) {
        wx.showToast({
          title: '已经到底啦',
          icon: 'none',
          duration: 1000
        })
      } else {
        _this.setData({
          page: _this.data.page + 1
        })
        wx.showLoading({
          title: '加载中',
        })
        _this.getgoodslist();
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})